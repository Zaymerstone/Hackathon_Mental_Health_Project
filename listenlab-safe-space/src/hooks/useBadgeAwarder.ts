import { useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "@/contexts/StudentContext";
import { toast } from "sonner";

interface BadgeCondition {
  badgeName: string;
  check: (data: {
    completedTrainingsCount: number;
    reflectionsCount: number;
    forumCommentsCount: number;
  }) => boolean;
}

const BADGE_CONDITIONS: BadgeCondition[] = [
  {
    badgeName: "First Listen",
    check: ({ completedTrainingsCount }) => completedTrainingsCount >= 1,
  },
  {
    badgeName: "Empathy Pro",
    check: () => false, // Logic to be defined later
  },
  {
    badgeName: "Night Owl",
    check: ({ reflectionsCount }) => reflectionsCount >= 5,
  },
  {
    badgeName: "Streak Master",
    check: ({ forumCommentsCount }) => forumCommentsCount >= 5,
  },
];

export const useBadgeAwarder = () => {
  const { profile, badges, completedTrainings, reflections, refetch } = useStudent();
  const lastCheckRef = useRef<string>("");

  const checkAndAwardBadges = useCallback(async () => {
    if (!profile?.id || badges.length === 0) return;

    // Create a unique key for current state to avoid duplicate checks
    const stateKey = `${completedTrainings.length}-${reflections.length}`;
    if (lastCheckRef.current === stateKey) return;
    lastCheckRef.current = stateKey;

    // Get forum comments count
    const { count: forumCommentsCount } = await supabase
      .from("forum_comments")
      .select("*", { count: "exact", head: true })
      .eq("student_id", profile.id);

    const data = {
      completedTrainingsCount: completedTrainings.length,
      reflectionsCount: reflections.length,
      forumCommentsCount: forumCommentsCount || 0,
    };

    // Get already earned badge names
    const earnedBadgeNames = new Set(
      badges.filter((b) => b.earned).map((b) => b.name)
    );

    let badgesAwarded = false;

    // Check each badge condition
    for (const condition of BADGE_CONDITIONS) {
      // Skip if already earned
      if (earnedBadgeNames.has(condition.badgeName)) continue;

      // Check if condition is met
      if (condition.check(data)) {
        // Find the badge
        const badge = badges.find((b) => b.name === condition.badgeName);
        if (!badge) continue;

        // Award the badge
        const { error } = await supabase.from("student_badges").insert({
          student_id: profile.id,
          badge_id: badge.id,
        });

        if (!error) {
          badgesAwarded = true;
          toast.success(`🏆 Badge unlocked: ${condition.badgeName}!`);
        }
      }
    }

    // Refetch to update the UI only if badges were awarded
    if (badgesAwarded) {
      refetch();
    }
  }, [profile?.id, badges, completedTrainings.length, reflections.length, refetch]);

  // Run check whenever dependencies change
  useEffect(() => {
    checkAndAwardBadges();
  }, [checkAndAwardBadges]);

  return { checkAndAwardBadges };
};
