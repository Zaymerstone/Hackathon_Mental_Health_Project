import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useStudentProfile } from "./useStudentProfile";
import { XP_VALUES } from "./useXpAwarder";
import { toast } from "sonner";

export interface TrainingModule {
  id: string;
  name: string;
  description: string | null;
  content_url: string | null;
  required: boolean | null;
  created_at: string;
}

export interface CompletedTraining extends TrainingModule {
  completed_at: string;
  score: number | null;
  completed: true;
}

export interface IncompleteTraining extends TrainingModule {
  completed: false;
}

export type TrainingWithStatus = CompletedTraining | IncompleteTraining;

export const useStudentTrainings = () => {
  const { profile, updateProfile } = useStudentProfile();
  const [trainings, setTrainings] = useState<TrainingWithStatus[]>([]);
  const [completedTrainings, setCompletedTrainings] = useState<CompletedTraining[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      if (!profile) {
        setLoading(false);
        return;
      }

      try {
        // Fetch all training modules
        const { data: allModules, error: modulesError } = await supabase
          .from("training_modules")
          .select("*")
          .order("created_at", { ascending: true });

        if (modulesError) {
          setError(modulesError.message);
          setLoading(false);
          return;
        }

        // Fetch student's training progress
        const { data: studentTrainings, error: studentTrainingsError } = await supabase
          .from("student_trainings")
          .select("module_id, completed_at, score")
          .eq("student_id", profile.id);

        if (studentTrainingsError) {
          setError(studentTrainingsError.message);
          setLoading(false);
          return;
        }

        const completedModuleIds = new Set(
          studentTrainings
            ?.filter((st) => st.completed_at !== null)
            .map((st) => st.module_id) || []
        );
        const trainingDataMap = new Map(
          studentTrainings?.map((st) => [
            st.module_id,
            { completed_at: st.completed_at, score: st.score },
          ]) || []
        );

        const trainingsWithStatus: TrainingWithStatus[] = (allModules || []).map(
          (module) => {
            const trainingData = trainingDataMap.get(module.id);
            if (completedModuleIds.has(module.id) && trainingData?.completed_at) {
              return {
                ...module,
                completed_at: trainingData.completed_at,
                score: trainingData.score,
                completed: true as const,
              };
            }
            return { ...module, completed: false as const };
          }
        );

        const completed = trainingsWithStatus.filter(
          (t): t is CompletedTraining => t.completed
        );

        setTrainings(trainingsWithStatus);
        setCompletedTrainings(completed);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch trainings");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, [profile]);

  const completeTraining = async (moduleId: string, score?: number) => {
    if (!profile) return { error: new Error("No profile found") };

    // Check if already completed to avoid duplicate XP
    const alreadyCompleted = completedTrainings.some(t => t.id === moduleId);

    const { error: insertError } = await supabase.from("student_trainings").upsert(
      {
        student_id: profile.id,
        module_id: moduleId,
        completed_at: new Date().toISOString(),
        score: score || null,
      },
      { onConflict: "student_id,module_id" }
    );

    // Award XP only if this is a new completion
    if (!insertError && !alreadyCompleted) {
      const newXp = (profile.xp || 0) + XP_VALUES.COMPLETE_LECTURE;
      await updateProfile({ xp: newXp });
      toast.success(`+${XP_VALUES.COMPLETE_LECTURE} XP for completing a training module!`);
    }

    return { error: insertError };
  };

  return { trainings, completedTrainings, loading, error, completeTraining };
};
