import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useStudentProfile } from "./useStudentProfile";

export interface Milestone {
  id: string;
  name: string;
  description: string | null;
  required_xp: number;
  created_at: string;
}

export interface AchievedMilestone extends Milestone {
  achieved_at: string;
  achieved: true;
}

export interface LockedMilestone extends Milestone {
  achieved: false;
}

export type MilestoneWithStatus = AchievedMilestone | LockedMilestone;

export const useStudentMilestones = () => {
  const { profile } = useStudentProfile();
  const [milestones, setMilestones] = useState<MilestoneWithStatus[]>([]);
  const [achievedMilestones, setAchievedMilestones] = useState<AchievedMilestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMilestones = async () => {
      if (!profile) {
        setLoading(false);
        return;
      }

      try {
        // Fetch all available milestones
        const { data: allMilestones, error: milestonesError } = await supabase
          .from("milestones")
          .select("*")
          .order("required_xp", { ascending: true });

        if (milestonesError) {
          setError(milestonesError.message);
          setLoading(false);
          return;
        }

        // Fetch student's achieved milestones
        const { data: studentMilestones, error: studentMilestonesError } = await supabase
          .from("student_milestones")
          .select("milestone_id, achieved_at")
          .eq("student_id", profile.id);

        if (studentMilestonesError) {
          setError(studentMilestonesError.message);
          setLoading(false);
          return;
        }

        const achievedMilestoneIds = new Set(
          studentMilestones?.map((sm) => sm.milestone_id) || []
        );
        const achievedAtMap = new Map(
          studentMilestones?.map((sm) => [sm.milestone_id, sm.achieved_at]) || []
        );

        const milestonesWithStatus: MilestoneWithStatus[] = (allMilestones || []).map(
          (milestone) => {
            if (achievedMilestoneIds.has(milestone.id)) {
              return {
                ...milestone,
                achieved_at: achievedAtMap.get(milestone.id) || new Date().toISOString(),
                achieved: true as const,
              };
            }
            return { ...milestone, achieved: false as const };
          }
        );

        const achieved = milestonesWithStatus.filter(
          (m): m is AchievedMilestone => m.achieved
        );

        setMilestones(milestonesWithStatus);
        setAchievedMilestones(achieved);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch milestones");
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, [profile]);

  return { milestones, achievedMilestones, loading, error };
};
