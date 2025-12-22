import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type UserType = "student" | "seeker" | null;

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<UserType>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer profile check with setTimeout to avoid deadlock
          setTimeout(() => {
            checkUserType(session.user.id);
          }, 0);
        } else {
          setUserType(null);
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkUserType(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUserType = async (userId: string) => {
    try {
      // Check if user is a student
      const { data: studentData } = await supabase
        .from("students")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (studentData) {
        setUserType("student");
        setLoading(false);
        return;
      }

      // Check if user is a help seeker
      const { data: seekerData } = await supabase
        .from("help_seekers")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (seekerData) {
        setUserType("seeker");
        setLoading(false);
        return;
      }

      setUserType(null);
      setLoading(false);
    } catch (error) {
      console.error("Error checking user type:", error);
      setLoading(false);
    }
  };

  const signUpStudent = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          user_type: "student"
        }
      }
    });

    if (error) return { error };

    if (data.user) {
      // Create student profile
      const { error: profileError } = await supabase
        .from("students")
        .insert({
          user_id: data.user.id,
          email: email,
          full_name: fullName
        });

      if (profileError) return { error: profileError };
    }

    return { data, error: null };
  };

  const signUpSeeker = async (email: string, password: string, displayName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    // Generate a consistent email for anonymous users using their display name (no timestamp)
    const generatedEmail = `${displayName.toLowerCase().replace(/\s+/g, '_')}@anonymous.listenlab.app`;
    
    const { data, error } = await supabase.auth.signUp({
      email: generatedEmail,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          display_name: displayName,
          user_type: "seeker"
        }
      }
    });

    if (error) return { error };

    if (data.user) {
      // Create help seeker profile
      const { error: profileError } = await supabase
        .from("help_seekers")
        .insert({
          user_id: data.user.id,
          email: generatedEmail,
          display_name: displayName
        });

      if (profileError) return { error: profileError };
    }

    return { data, error: null };
  };

  const signIn = async (emailOrUsername: string, password: string) => {
    let email = emailOrUsername;
    
    if (!emailOrUsername.includes("@")) {
      // It's a username - look up the actual email from help_seekers table
      const { data: lookupData } = await supabase.rpc('get_seeker_email_by_username', {
        username: emailOrUsername
      });
      
      if (lookupData) {
        email = lookupData;
      } else {
        // Fallback to constructed email for new format
        email = `${emailOrUsername.toLowerCase().replace(/\s+/g, '_')}@anonymous.listenlab.app`;
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    return { data, error };
  };

  const signOut = async () => {
    try {
      // Clear local state immediately for responsive UX
      setUser(null);
      setSession(null);
      setUserType(null);
      
      // Sign out from Supabase (clears JWT from storage)
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      
      if (error) {
        console.error("Sign out error:", error);
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      console.error("Unexpected sign out error:", error);
      return { error: error as Error };
    }
  };

  return {
    user,
    session,
    loading,
    userType,
    signUpStudent,
    signUpSeeker,
    signIn,
    signOut,
    isAuthenticated: !!session
  };
};
