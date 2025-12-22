import { useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "@/contexts/StudentContext";

const UPDATE_INTERVAL_MS = 60000; // Update every 60 seconds (1 minute)

export const useOnlineTimeTracker = () => {
  const { profile, updateProfile } = useStudent();
  const lastUpdateRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateOnlineTime = useCallback(async () => {
    if (!profile?.id) return;

    const now = Date.now();
    const elapsedMinutes = Math.floor((now - lastUpdateRef.current) / 60000);
    
    if (elapsedMinutes >= 1) {
      // Update the database with accumulated minutes
      const newTotal = (profile.total_minutes_online ?? 0) + elapsedMinutes;
      
      await supabase
        .from("students")
        .update({ total_minutes_online: newTotal })
        .eq("id", profile.id);
      
      lastUpdateRef.current = now;
    }
  }, [profile?.id, profile?.total_minutes_online]);

  useEffect(() => {
    if (!profile?.id) return;

    // Reset the timer when component mounts
    lastUpdateRef.current = Date.now();

    // Set up interval to update every minute
    intervalRef.current = setInterval(updateOnlineTime, UPDATE_INTERVAL_MS);

    // Also update on visibility change (when user returns to tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        lastUpdateRef.current = Date.now();
      } else {
        // Save time when leaving
        updateOnlineTime();
      }
    };

    // Save time before unload
    const handleBeforeUnload = () => {
      updateOnlineTime();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      
      // Final update on cleanup
      updateOnlineTime();
    };
  }, [profile?.id, updateOnlineTime]);

  // Convert minutes to hours
  const hoursOnline = Math.floor((profile?.total_minutes_online ?? 0) / 60);

  return { hoursOnline, totalMinutes: profile?.total_minutes_online ?? 0 };
};
