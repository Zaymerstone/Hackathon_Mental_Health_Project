import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useStudentProfile } from "./useStudentProfile";
import { XP_VALUES } from "./useXpAwarder";
import { toast } from "sonner";

export interface Reflection {
  id: string;
  student_id: string;
  conversation_id: string | null;
  content: string;
  what_learned: string | null;
  challenges: string | null;
  created_at: string;
}

export const useStudentReflections = () => {
  const { profile, updateProfile } = useStudentProfile();
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReflections = async () => {
      if (!profile) {
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from("reflections")
          .select("*")
          .eq("student_id", profile.id)
          .order("created_at", { ascending: false });

        if (fetchError) {
          setError(fetchError.message);
        } else {
          setReflections(data || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch reflections");
      } finally {
        setLoading(false);
      }
    };

    fetchReflections();
  }, [profile]);

  const addReflection = async (reflection: {
    content: string;
    what_learned?: string;
    challenges?: string;
    conversation_id?: string;
  }) => {
    if (!profile) return { error: new Error("No profile found"), data: null };

    const { data, error: insertError } = await supabase
      .from("reflections")
      .insert({
        student_id: profile.id,
        content: reflection.content,
        what_learned: reflection.what_learned || null,
        challenges: reflection.challenges || null,
        conversation_id: reflection.conversation_id || null,
      })
      .select()
      .single();

    if (!insertError && data) {
      setReflections([data as Reflection, ...reflections]);
      
      // Award XP for writing a reflection
      const newXp = (profile.xp || 0) + XP_VALUES.WRITE_REFLECTION;
      await updateProfile({ xp: newXp });
      toast.success(`+${XP_VALUES.WRITE_REFLECTION} XP for writing a reflection!`);
    }

    return { error: insertError, data: data as Reflection | null };
  };

  const updateReflection = async (
    id: string,
    updates: Partial<Omit<Reflection, "id" | "student_id" | "created_at">>
  ) => {
    const { error: updateError } = await supabase
      .from("reflections")
      .update(updates)
      .eq("id", id);

    if (!updateError) {
      setReflections(
        reflections.map((r) => (r.id === id ? { ...r, ...updates } : r))
      );
    }

    return { error: updateError };
  };

  const deleteReflection = async (id: string) => {
    const { error: deleteError } = await supabase
      .from("reflections")
      .delete()
      .eq("id", id);

    if (!deleteError) {
      setReflections(reflections.filter((r) => r.id !== id));
    }

    return { error: deleteError };
  };

  return { reflections, loading, error, addReflection, updateReflection, deleteReflection };
};
