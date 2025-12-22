import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

// XP values for different actions
const XP_VALUES = {
  WRITE_COMMENT: 10,
  WRITE_REFLECTION: 30,
  HELP_VIA_CHAT: 50,
  COMPLETE_LECTURE: 20,
} as const;
// Types
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
  total_minutes_online: number;
  created_at: string;
  updated_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string | null;
  required_xp: number | null;
  icon_url: string | null;
  created_at: string;
  earned: boolean;
  awarded_at?: string;
}

export interface Milestone {
  id: string;
  name: string;
  description: string | null;
  required_xp: number;
  created_at: string;
  achieved: boolean;
  achieved_at?: string;
}

export interface TrainingModule {
  id: string;
  name: string;
  description: string | null;
  content_url: string | null;
  required: boolean | null;
  created_at: string;
  completed: boolean;
  completed_at?: string;
  score?: number | null;
  video_url?: string | null;
  reading_content?: string | null;
  duration_minutes?: number | null;
  video_completed?: boolean;
  reading_completed?: boolean;
}

export interface Reflection {
  id: string;
  student_id: string;
  conversation_id: string | null;
  content: string;
  what_learned: string | null;
  challenges: string | null;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  created_at: string;
  unlocked: boolean;
  unlocked_at?: string;
}

interface StudentContextType {
  // Profile
  profile: StudentProfile | null;
  profileLoading: boolean;
  updateProfile: (updates: Partial<StudentProfile>) => Promise<{ error: Error | null }>;
  
  // Badges
  badges: Badge[];
  earnedBadges: Badge[];
  badgesLoading: boolean;
  
  // Milestones
  milestones: Milestone[];
  achievedMilestones: Milestone[];
  milestonesLoading: boolean;
  
  // Trainings
  trainings: TrainingModule[];
  completedTrainings: TrainingModule[];
  trainingsLoading: boolean;
  completeTraining: (moduleId: string, score?: number) => Promise<{ error: Error | null }>;
  
  // Reflections
  reflections: Reflection[];
  reflectionsLoading: boolean;
  addReflection: (reflection: { content: string; what_learned?: string; challenges?: string; conversation_id?: string }) => Promise<{ error: Error | null; data: Reflection | null }>;
  updateReflection: (id: string, updates: Partial<Omit<Reflection, "id" | "student_id" | "created_at">>) => Promise<{ error: Error | null }>;
  deleteReflection: (id: string) => Promise<{ error: Error | null }>;
  
  // Skills
  skills: Skill[];
  unlockedSkills: Skill[];
  skillsLoading: boolean;
  
  // Forum comments count
  forumCommentsCount: number;
  
  // General
  isLoading: boolean;
  refetch: () => void;
}

const StudentContext = createContext<StudentContextType | null>(null);

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
};

interface StudentProviderProps {
  children: ReactNode;
}

export const StudentProvider: React.FC<StudentProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  // Profile state
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  
  // Badges state
  const [badges, setBadges] = useState<Badge[]>([]);
  const [badgesLoading, setBadgesLoading] = useState(true);
  
  // Milestones state
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [milestonesLoading, setMilestonesLoading] = useState(true);
  
  // Trainings state
  const [trainings, setTrainings] = useState<TrainingModule[]>([]);
  const [trainingsLoading, setTrainingsLoading] = useState(true);
  
  // Reflections state
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [reflectionsLoading, setReflectionsLoading] = useState(true);
  
  // Skills state
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  
  // Forum comments count
  const [forumCommentsCount, setForumCommentsCount] = useState(0);

  // Fetch all data
  const fetchAllData = async () => {
    if (!isAuthenticated || !user) {
      setProfileLoading(false);
      setBadgesLoading(false);
      setMilestonesLoading(false);
      setTrainingsLoading(false);
      setReflectionsLoading(false);
      setSkillsLoading(false);
      return;
    }

    // Fetch profile first (required for other queries)
    const { data: profileData } = await supabase
      .from("students")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    setProfile(profileData as StudentProfile | null);
    setProfileLoading(false);

    if (!profileData) {
      setBadgesLoading(false);
      setMilestonesLoading(false);
      setTrainingsLoading(false);
      setReflectionsLoading(false);
      setSkillsLoading(false);
      return;
    }

    const studentId = profileData.id;

    // Fetch all other data in parallel
    const [badgesResult, milestonesResult, trainingsResult, reflectionsResult, skillsResult, commentsCountResult] = await Promise.all([
      fetchBadges(studentId),
      fetchMilestones(studentId),
      fetchTrainings(studentId),
      fetchReflections(studentId),
      fetchSkills(studentId),
      fetchForumCommentsCount(studentId),
    ]);

    setBadges(badgesResult);
    setBadgesLoading(false);
    
    setMilestones(milestonesResult);
    setMilestonesLoading(false);
    
    setTrainings(trainingsResult);
    setTrainingsLoading(false);
    
    setReflections(reflectionsResult);
    setReflectionsLoading(false);
    
    setSkills(skillsResult);
    setSkillsLoading(false);
    
    setForumCommentsCount(commentsCountResult);
  };

  const fetchBadges = async (studentId: string): Promise<Badge[]> => {
    const [allBadgesRes, studentBadgesRes] = await Promise.all([
      supabase.from("badges").select("*").order("required_xp", { ascending: true }),
      supabase.from("student_badges").select("badge_id, awarded_at").eq("student_id", studentId),
    ]);

    const earnedBadgeIds = new Set(studentBadgesRes.data?.map((sb) => sb.badge_id) || []);
    const awardedAtMap = new Map(studentBadgesRes.data?.map((sb) => [sb.badge_id, sb.awarded_at]) || []);

    return (allBadgesRes.data || []).map((badge) => ({
      ...badge,
      earned: earnedBadgeIds.has(badge.id),
      awarded_at: awardedAtMap.get(badge.id),
    }));
  };

  const fetchMilestones = async (studentId: string): Promise<Milestone[]> => {
    const [allMilestonesRes, studentMilestonesRes] = await Promise.all([
      supabase.from("milestones").select("*").order("required_xp", { ascending: true }),
      supabase.from("student_milestones").select("milestone_id, achieved_at").eq("student_id", studentId),
    ]);

    const achievedMilestoneIds = new Set(studentMilestonesRes.data?.map((sm) => sm.milestone_id) || []);
    const achievedAtMap = new Map(studentMilestonesRes.data?.map((sm) => [sm.milestone_id, sm.achieved_at]) || []);

    return (allMilestonesRes.data || []).map((milestone) => ({
      ...milestone,
      achieved: achievedMilestoneIds.has(milestone.id),
      achieved_at: achievedAtMap.get(milestone.id),
    }));
  };

  const fetchTrainings = async (studentId: string): Promise<TrainingModule[]> => {
    const [allModulesRes, studentTrainingsRes] = await Promise.all([
      supabase.from("training_modules").select("*").order("created_at", { ascending: true }),
      supabase.from("student_trainings").select("module_id, completed_at, score, video_completed, reading_completed").eq("student_id", studentId),
    ]);

    const completedModuleIds = new Set(
      studentTrainingsRes.data?.filter((st) => st.completed_at).map((st) => st.module_id) || []
    );
    const trainingDataMap = new Map(
      studentTrainingsRes.data?.map((st) => [st.module_id, { 
        completed_at: st.completed_at, 
        score: st.score,
        video_completed: st.video_completed,
        reading_completed: st.reading_completed,
      }]) || []
    );

    return (allModulesRes.data || []).map((module: any) => {
      const data = trainingDataMap.get(module.id);
      return {
        ...module,
        completed: completedModuleIds.has(module.id),
        completed_at: data?.completed_at || undefined,
        score: data?.score,
        video_completed: data?.video_completed || false,
        reading_completed: data?.reading_completed || false,
      };
    });
  };

  const fetchReflections = async (studentId: string): Promise<Reflection[]> => {
    const { data } = await supabase
      .from("reflections")
      .select("*")
      .eq("student_id", studentId)
      .order("created_at", { ascending: false });

    return (data || []) as Reflection[];
  };

  const fetchSkills = async (studentId: string): Promise<Skill[]> => {
    const [allSkillsRes, studentSkillsRes] = await Promise.all([
      supabase.from("skills").select("*").order("name", { ascending: true }),
      supabase.from("student_skills").select("skill_id, unlocked_at").eq("student_id", studentId),
    ]);

    const unlockedSkillIds = new Set(studentSkillsRes.data?.map((ss) => ss.skill_id) || []);
    const unlockedAtMap = new Map(studentSkillsRes.data?.map((ss) => [ss.skill_id, ss.unlocked_at]) || []);

    return (allSkillsRes.data || []).map((skill) => ({
      ...skill,
      unlocked: unlockedSkillIds.has(skill.id),
      unlocked_at: unlockedAtMap.get(skill.id),
    }));
  };

  const fetchForumCommentsCount = async (studentId: string): Promise<number> => {
    const { count } = await supabase
      .from("forum_comments")
      .select("*", { count: "exact", head: true })
      .eq("student_id", studentId);
    
    return count || 0;
  };

  useEffect(() => {
    fetchAllData();
  }, [user, isAuthenticated]);

  // Actions
  const updateProfile = async (updates: Partial<StudentProfile>) => {
    if (!profile) return { error: new Error("No profile found") };

    const { error } = await supabase
      .from("students")
      .update(updates)
      .eq("id", profile.id);

    if (!error) {
      setProfile({ ...profile, ...updates });
    }

    return { error: error ? new Error(error.message) : null };
  };

  const completeTraining = async (moduleId: string, score?: number) => {
    if (!profile) return { error: new Error("No profile found") };

    // Check if already completed to avoid duplicate XP
    const alreadyCompleted = trainings.find(t => t.id === moduleId)?.completed;

    const { error } = await supabase.from("student_trainings").upsert(
      {
        student_id: profile.id,
        module_id: moduleId,
        completed_at: new Date().toISOString(),
        score: score || null,
      },
      { onConflict: "student_id,module_id" }
    );

    if (!error) {
      setTrainings(trainings.map((t) =>
        t.id === moduleId ? { ...t, completed: true, completed_at: new Date().toISOString(), score } : t
      ));

      // Award XP only if this is a new completion
      if (!alreadyCompleted) {
        const newXp = (profile.xp || 0) + XP_VALUES.COMPLETE_LECTURE;
        await supabase.from("students").update({ xp: newXp }).eq("id", profile.id);
        setProfile({ ...profile, xp: newXp });
        toast.success(`+${XP_VALUES.COMPLETE_LECTURE} XP for completing a training module!`);
      }
    }

    return { error: error ? new Error(error.message) : null };
  };

  const addReflection = async (reflection: {
    content: string;
    what_learned?: string;
    challenges?: string;
    conversation_id?: string;
  }) => {
    if (!profile) return { error: new Error("No profile found"), data: null };

    const { data, error } = await supabase
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

    if (!error && data) {
      setReflections([data as Reflection, ...reflections]);
      
      // Award XP for writing a reflection
      const newXp = (profile.xp || 0) + XP_VALUES.WRITE_REFLECTION;
      await supabase.from("students").update({ xp: newXp }).eq("id", profile.id);
      setProfile({ ...profile, xp: newXp });
      toast.success(`+${XP_VALUES.WRITE_REFLECTION} XP for writing a reflection!`);
    }

    return { error: error ? new Error(error.message) : null, data: data as Reflection | null };
  };

  const updateReflection = async (
    id: string,
    updates: Partial<Omit<Reflection, "id" | "student_id" | "created_at">>
  ) => {
    const { error } = await supabase.from("reflections").update(updates).eq("id", id);

    if (!error) {
      setReflections(reflections.map((r) => (r.id === id ? { ...r, ...updates } : r)));
    }

    return { error: error ? new Error(error.message) : null };
  };

  const deleteReflection = async (id: string) => {
    const { error } = await supabase.from("reflections").delete().eq("id", id);

    if (!error) {
      setReflections(reflections.filter((r) => r.id !== id));
    }

    return { error: error ? new Error(error.message) : null };
  };

  const isLoading = profileLoading || badgesLoading || milestonesLoading || trainingsLoading || reflectionsLoading || skillsLoading;

  const earnedBadges = badges.filter((b) => b.earned);
  const achievedMilestones = milestones.filter((m) => m.achieved);
  const completedTrainings = trainings.filter((t) => t.completed);
  const unlockedSkills = skills.filter((s) => s.unlocked);

  const value: StudentContextType = {
    profile,
    profileLoading,
    updateProfile,
    badges,
    earnedBadges,
    badgesLoading,
    milestones,
    achievedMilestones,
    milestonesLoading,
    trainings,
    completedTrainings,
    trainingsLoading,
    completeTraining,
    reflections,
    reflectionsLoading,
    addReflection,
    updateReflection,
    deleteReflection,
    skills,
    unlockedSkills,
    skillsLoading,
    forumCommentsCount,
    isLoading,
    refetch: fetchAllData,
  };

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
};
