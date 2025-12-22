import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useStudentProfile } from "./useStudentProfile";
import { toast } from "sonner";

// XP values for different actions
export const XP_VALUES = {
  WRITE_COMMENT: 10,
  WRITE_REFLECTION: 30,
  HELP_VIA_CHAT: 50,
  COMPLETE_LECTURE: 20,
} as const;

export const useXpAwarder = () => {
  const { profile, updateProfile } = useStudentProfile();

  const awardXp = useCallback(async (action: keyof typeof XP_VALUES, customMessage?: string) => {
    if (!profile) return { error: new Error("No profile found") };

    const xpAmount = XP_VALUES[action];
    const newXp = (profile.xp || 0) + xpAmount;

    const { error } = await updateProfile({ xp: newXp });

    if (!error) {
      toast.success(customMessage || `+${xpAmount} XP earned!`);
    }

    return { error };
  }, [profile, updateProfile]);

  const awardCustomXp = useCallback(async (amount: number, message?: string) => {
    if (!profile) return { error: new Error("No profile found") };

    const newXp = (profile.xp || 0) + amount;

    const { error } = await updateProfile({ xp: newXp });

    if (!error && message) {
      toast.success(message);
    }

    return { error };
  }, [profile, updateProfile]);

  return {
    awardXp,
    awardCustomXp,
    XP_VALUES,
  };
};
