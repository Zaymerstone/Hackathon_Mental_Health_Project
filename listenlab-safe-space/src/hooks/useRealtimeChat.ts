// Realtime chat hook for student-seeker matching
import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";
import { XP_VALUES } from "./useXpAwarder";

export interface ChatMessage {
  id: string;
  session_id: string;
  sender_type: "student" | "seeker";
  sender_id: string;
  content: string;
  created_at: string;
}

export interface ChatSession {
  id: string;
  student_id: string;
  seeker_id: string;
  status: "active" | "ended";
  started_at: string;
  ended_at: string | null;
}

type ChatStatus = "idle" | "waiting" | "connecting" | "connected" | "ended";

export const useRealtimeChat = () => {
  const { user, userType } = useAuth();
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);

  // Prevent double-awarding XP for the same ended session in a single client session
  const awardedChatXpSessionIdsRef = useRef<Set<string>>(new Set());

  // Fetch profile ID on mount and when user changes
  useEffect(() => {
    const fetchProfileId = async () => {
      if (!user) {
        setProfileId(null);
        return;
      }

      if (userType === "student") {
        const { data } = await supabase
          .from("students")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();
        setProfileId(data?.id || null);
      } else if (userType === "seeker") {
        const { data } = await supabase
          .from("help_seekers")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();
        setProfileId(data?.id || null);
      }
    };

    fetchProfileId();
  }, [user, userType]);

  // Get the profile ID (student or seeker) - kept for backward compatibility
  const getProfileId = useCallback(async (): Promise<string | null> => {
    if (profileId) return profileId;
    if (!user) return null;

    if (userType === "student") {
      const { data } = await supabase
        .from("students")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      return data?.id || null;
    } else if (userType === "seeker") {
      const { data } = await supabase
        .from("help_seekers")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      return data?.id || null;
    }
    return null;
  }, [user, userType, profileId]);

  // Check for existing active session
  const checkExistingSession = useCallback(async () => {
    if (!user) return null;

    const profileId = await getProfileId();
    if (!profileId) return null;

    const column = userType === "student" ? "student_id" : "seeker_id";
    const { data } = await supabase
      .from("chat_sessions")
      .select("*")
      .eq(column, profileId)
      .eq("status", "active")
      .maybeSingle();

    return data as ChatSession | null;
  }, [user, userType, getProfileId]);

  // Join queue (for seekers)
  const joinQueue = useCallback(async () => {
    if (!user || userType !== "seeker") return;
    
    setIsLoading(true);
    setStatus("waiting");

    try {
      const seekerId = await getProfileId();
      if (!seekerId) throw new Error("Seeker profile not found");

      // Check if seeker already has an active session
      const { data: existingSession } = await supabase
        .from("chat_sessions")
        .select("id")
        .eq("seeker_id", seekerId)
        .eq("status", "active")
        .maybeSingle();

      if (existingSession) {
        toast.info("You already have an active session.");
        setStatus("idle");
        setIsLoading(false);
        return;
      }

      // Check if already in queue
      const { data: existingEntry } = await supabase
        .from("chat_queue")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!existingEntry) {
        const { error } = await supabase
          .from("chat_queue")
          .insert({ user_id: user.id, user_type: "seeker" });

        if (error) throw error;
      }

      toast.info("You're in the queue. A listener will connect with you shortly.");
    } catch (error) {
      console.error("Error joining queue:", error);
      toast.error("Failed to join queue. Please try again.");
      setStatus("idle");
    } finally {
      setIsLoading(false);
    }
  }, [user, userType, getProfileId]);

  // Leave queue
  const leaveQueue = useCallback(async () => {
    if (!user) return;

    try {
      await supabase
        .from("chat_queue")
        .delete()
        .eq("user_id", user.id);

      setStatus("idle");
    } catch (error) {
      console.error("Error leaving queue:", error);
    }
  }, [user]);

  // Find and connect with a seeker (for students)
  const findSeeker = useCallback(async () => {
    if (!user || userType !== "student") return;

    setIsLoading(true);
    setStatus("connecting");

    try {
      const studentId = await getProfileId();
      if (!studentId) throw new Error("Student profile not found");

      // Check if student already has an active session
      const { data: existingSession } = await supabase
        .from("chat_sessions")
        .select("id")
        .eq("student_id", studentId)
        .eq("status", "active")
        .maybeSingle();

      if (existingSession) {
        toast.info("You already have an active session.");
        setStatus("idle");
        setIsLoading(false);
        return;
      }

      // Get the first seeker in queue
      const { data: queueEntry, error: queueError } = await supabase
        .from("chat_queue")
        .select("*")
        .eq("user_type", "seeker")
        .order("joined_at", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (queueError) throw queueError;

      if (!queueEntry) {
        toast.info("No one is waiting right now. Check back soon!");
        setStatus("idle");
        setIsLoading(false);
        return;
      }

      // Get seeker's profile ID
      const { data: seekerProfile } = await supabase
        .from("help_seekers")
        .select("id")
        .eq("user_id", queueEntry.user_id)
        .maybeSingle();

      if (!seekerProfile) throw new Error("Seeker profile not found");

      // Create chat session
      const { data: newSession, error: sessionError } = await supabase
        .from("chat_sessions")
        .insert({
          student_id: studentId,
          seeker_id: seekerProfile.id,
          status: "active"
        })
        .select()
        .single();

      if (sessionError) throw sessionError;

      // Remove seeker from queue
      await supabase
        .from("chat_queue")
        .delete()
        .eq("user_id", queueEntry.user_id);

      setSession(newSession as ChatSession);
      setStatus("connected");
      toast.success("Connected! You can now start chatting.");
    } catch (error) {
      console.error("Error finding seeker:", error);
      toast.error("Failed to connect. Please try again.");
      setStatus("idle");
    } finally {
      setIsLoading(false);
    }
  }, [user, userType, getProfileId]);

  // Send a message
  const sendMessage = useCallback(async (content: string) => {
    if (!user || !session || status !== "connected") return;

    const trimmedContent = content.trim();
    if (!trimmedContent) return;

    try {
      const { error } = await supabase
        .from("chat_messages")
        .insert({
          session_id: session.id,
          sender_type: userType as "student" | "seeker",
          sender_id: user.id,
          content: trimmedContent
        });

      if (error) throw error;
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  }, [user, session, status, userType]);

  const awardChatXpIfNeeded = useCallback(
    async (endedSessionId: string) => {
      if (userType !== "student" || !profileId) return;

      const alreadyAwarded = awardedChatXpSessionIdsRef.current.has(endedSessionId);
      if (alreadyAwarded) return;
      awardedChatXpSessionIdsRef.current.add(endedSessionId);

      try {
        const { data: studentData, error: fetchErr } = await supabase
          .from("students")
          .select("xp")
          .eq("id", profileId)
          .single();

        if (fetchErr) throw fetchErr;

        const newXp = (studentData?.xp || 0) + XP_VALUES.HELP_VIA_CHAT;
        const { error: updateErr } = await supabase
          .from("students")
          .update({ xp: newXp })
          .eq("id", profileId);

        if (updateErr) throw updateErr;

        toast.success(`+${XP_VALUES.HELP_VIA_CHAT} XP for helping someone!`);
      } catch (err) {
        // Allow retry if something failed
        awardedChatXpSessionIdsRef.current.delete(endedSessionId);
        console.error("[RealtimeChat] Failed to award chat XP:", err);
      }
    },
    [userType, profileId]
  );

  // End the chat session
  const endSession = useCallback(async () => {
    if (!session) return;

    try {
      const { error } = await supabase
        .from("chat_sessions")
        .update({ status: "ended", ended_at: new Date().toISOString() })
        .eq("id", session.id);

      if (error) throw error;

      // If the student ends the session, we may tear down subscriptions immediately.
      // Award XP here too so it always happens.
      await awardChatXpIfNeeded(session.id);

      setSession(null);
      setMessages([]);
      setStatus("ended");
      toast.info("Chat session ended.");
    } catch (error) {
      console.error("Error ending session:", error);
    }
  }, [session, awardChatXpIfNeeded]);

  // Reset to idle state
  const reset = useCallback(() => {
    setStatus("idle");
    setSession(null);
    setMessages([]);
  }, []);

  // Load existing messages when session starts
  useEffect(() => {
    if (!session) return;

    const loadMessages = async () => {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("session_id", session.id)
        .order("created_at", { ascending: true });

      if (!error && data) {
        setMessages(data as ChatMessage[]);
      }
    };

    loadMessages();
  }, [session?.id]);

  // Subscribe to real-time messages
  useEffect(() => {
    if (!session) return;

    const channel = supabase
      .channel(`chat-messages-${session.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `session_id=eq.${session.id}`
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.id]);

  // Subscribe to session updates (for seekers to know when matched)
  useEffect(() => {
    if (!user || !profileId || userType !== "seeker") return;

    console.log("[RealtimeChat] Setting up seeker session subscription for profileId:", profileId);

    const channel = supabase
      .channel(`session-updates-seeker-${profileId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_sessions",
          filter: `seeker_id=eq.${profileId}`
        },
        (payload) => {
          console.log("[RealtimeChat] Seeker received session INSERT:", payload);
          const newSession = payload.new as ChatSession;
          
          if (newSession.status === "active") {
            setSession(newSession);
            setStatus("connected");
            toast.success("A listener has connected with you!");
          }
        }
      )
      .subscribe((status) => {
        console.log("[RealtimeChat] Seeker subscription status:", status);
      });

    return () => {
      console.log("[RealtimeChat] Cleaning up seeker session subscription");
      supabase.removeChannel(channel);
    };
  }, [user, profileId, userType]);

  // Subscribe to session end
  useEffect(() => {
    if (!session) return;

    const channel = supabase
      .channel(`session-end-${session.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "chat_sessions",
          filter: `id=eq.${session.id}`
        },
        async (payload) => {
          const updatedSession = payload.new as ChatSession;
          if (updatedSession.status !== "ended") return;

          // Award XP to the student when the session ends (no matter who clicked "End Chat")
          await awardChatXpIfNeeded(updatedSession.id);

          setSession(null);
          setMessages([]);
          setStatus("ended");
          toast.info("The chat session has ended.");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.id, awardChatXpIfNeeded]);

  // Check for existing session on mount
  useEffect(() => {
    const init = async () => {
      const existingSession = await checkExistingSession();
      if (existingSession) {
        setSession(existingSession);
        setStatus("connected");
      }
    };

    if (user && userType) {
      init();
    }
  }, [user, userType, checkExistingSession]);

  return {
    status,
    session,
    messages,
    isLoading,
    userType,
    profileId,
    joinQueue,
    leaveQueue,
    findSeeker,
    sendMessage,
    endSession,
    reset
  };
};
