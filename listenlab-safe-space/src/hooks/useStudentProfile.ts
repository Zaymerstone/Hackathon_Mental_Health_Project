import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface StudentProfile {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  student_id: string | null;
  xp: number;
  current_level: number;
  is_certified: boolean;
  availability_status: boolean;
  daily_session_limit: number;
  weekly_session_count: number;
  last_session_date: string | null;
  preferred_language: string | null;
  cultural_background: string | null;
  university_name: string | null;
  professor_name: string | null;
  created_at: string;
  updated_at: string;
}

export const useStudentProfile = () => {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from("students")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (fetchError) {
          setError(fetchError.message);
        } else {
          setProfile(data as StudentProfile | null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, isAuthenticated]);

  const updateProfile = async (updates: Partial<StudentProfile>) => {
    if (!profile) return { error: new Error("No profile found") };

    const { error: updateError } = await supabase
      .from("students")
      .update(updates)
      .eq("id", profile.id);

    if (!updateError) {
      setProfile({ ...profile, ...updates });
    }

    return { error: updateError };
  };

  return { profile, loading, error, updateProfile };
};
