import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useStudentProfile } from "./useStudentProfile";

export interface Badge {
  id: string;
  name: string;
  description: string | null;
  required_xp: number | null;
  icon_url: string | null;
  created_at: string;
}

export interface EarnedBadge extends Badge {
  awarded_at: string;
  earned: true;
}

export interface LockedBadge extends Badge {
  earned: false;
}

export type BadgeWithStatus = EarnedBadge | LockedBadge;

export const useStudentBadges = () => {
  const { profile } = useStudentProfile();
  const [badges, setBadges] = useState<BadgeWithStatus[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<EarnedBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBadges = async () => {
      if (!profile) {
        setLoading(false);
        return;
      }

      try {
        // Fetch all available badges
        const { data: allBadges, error: badgesError } = await supabase
          .from("badges")
          .select("*")
          .order("required_xp", { ascending: true });

        if (badgesError) {
          setError(badgesError.message);
          setLoading(false);
          return;
        }

        // Fetch student's earned badges
        const { data: studentBadges, error: studentBadgesError } = await supabase
          .from("student_badges")
          .select("badge_id, awarded_at")
          .eq("student_id", profile.id);

        if (studentBadgesError) {
          setError(studentBadgesError.message);
          setLoading(false);
          return;
        }

        const earnedBadgeIds = new Set(studentBadges?.map((sb) => sb.badge_id) || []);
        const awardedAtMap = new Map(
          studentBadges?.map((sb) => [sb.badge_id, sb.awarded_at]) || []
        );

        const badgesWithStatus: BadgeWithStatus[] = (allBadges || []).map((badge) => {
          if (earnedBadgeIds.has(badge.id)) {
            return {
              ...badge,
              awarded_at: awardedAtMap.get(badge.id) || new Date().toISOString(),
              earned: true as const,
            };
          }
          return { ...badge, earned: false as const };
        });

        const earned = badgesWithStatus.filter((b): b is EarnedBadge => b.earned);

        setBadges(badgesWithStatus);
        setEarnedBadges(earned);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch badges");
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [profile]);

  return { badges, earnedBadges, loading, error };
};
