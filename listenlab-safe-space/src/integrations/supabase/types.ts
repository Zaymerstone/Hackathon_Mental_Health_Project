export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      badges: {
        Row: {
          created_at: string
          description: string | null
          icon_url: string | null
          id: string
          name: string
          required_xp: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          name: string
          required_xp?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          name?: string
          required_xp?: number | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          sender_id: string
          sender_type: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          sender_id: string
          sender_type: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          sender_id?: string
          sender_type?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_queue: {
        Row: {
          id: string
          joined_at: string
          user_id: string
          user_type: string
        }
        Insert: {
          id?: string
          joined_at?: string
          user_id: string
          user_type: string
        }
        Update: {
          id?: string
          joined_at?: string
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
      chat_sessions: {
        Row: {
          ended_at: string | null
          id: string
          seeker_id: string
          started_at: string
          status: string
          student_id: string
        }
        Insert: {
          ended_at?: string | null
          id?: string
          seeker_id: string
          started_at?: string
          status?: string
          student_id: string
        }
        Update: {
          ended_at?: string | null
          id?: string
          seeker_id?: string
          started_at?: string
          status?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_sessions_seeker_id_fkey"
            columns: ["seeker_id"]
            isOneToOne: false
            referencedRelation: "help_seekers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_sessions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_comments: {
        Row: {
          author_name: string
          content: string
          created_at: string
          id: string
          parent_comment_id: string | null
          post_id: string
          student_id: string
        }
        Insert: {
          author_name?: string
          content: string
          created_at?: string
          id?: string
          parent_comment_id?: string | null
          post_id: string
          student_id: string
        }
        Update: {
          author_name?: string
          content?: string
          created_at?: string
          id?: string
          parent_comment_id?: string | null
          post_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "forum_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_comments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_posts: {
        Row: {
          author_name: string
          author_university: string | null
          content: string
          created_at: string
          id: string
          student_id: string
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string
          author_university?: string | null
          content: string
          created_at?: string
          id?: string
          student_id: string
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          author_university?: string | null
          content?: string
          created_at?: string
          id?: string
          student_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      help_seekers: {
        Row: {
          availability_times: Json | null
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string
          id: string
          last_session_at: string | null
          preferred_language: string | null
          preferred_topics: string[] | null
          total_sessions: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          availability_times?: Json | null
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email: string
          id?: string
          last_session_at?: string | null
          preferred_language?: string | null
          preferred_topics?: string[] | null
          total_sessions?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          availability_times?: Json | null
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string
          id?: string
          last_session_at?: string | null
          preferred_language?: string | null
          preferred_topics?: string[] | null
          total_sessions?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      levels: {
        Row: {
          description: string | null
          level: number
          name: string
          required_xp: number
        }
        Insert: {
          description?: string | null
          level: number
          name: string
          required_xp: number
        }
        Update: {
          description?: string | null
          level?: number
          name?: string
          required_xp?: number
        }
        Relationships: []
      }
      milestones: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          required_xp: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          required_xp?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          required_xp?: number
        }
        Relationships: []
      }
      reflections: {
        Row: {
          challenges: string | null
          content: string
          conversation_id: string | null
          created_at: string
          id: string
          student_id: string
          what_learned: string | null
        }
        Insert: {
          challenges?: string | null
          content: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          student_id: string
          what_learned?: string | null
        }
        Update: {
          challenges?: string | null
          content?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          student_id?: string
          what_learned?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reflections_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      student_badges: {
        Row: {
          awarded_at: string
          badge_id: string
          id: string
          student_id: string
        }
        Insert: {
          awarded_at?: string
          badge_id: string
          id?: string
          student_id: string
        }
        Update: {
          awarded_at?: string
          badge_id?: string
          id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_badges_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_milestones: {
        Row: {
          achieved_at: string
          id: string
          milestone_id: string
          student_id: string
        }
        Insert: {
          achieved_at?: string
          id?: string
          milestone_id: string
          student_id: string
        }
        Update: {
          achieved_at?: string
          id?: string
          milestone_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_milestones_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "milestones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_milestones_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_skills: {
        Row: {
          id: string
          skill_id: string
          student_id: string
          unlocked_at: string
        }
        Insert: {
          id?: string
          skill_id: string
          student_id: string
          unlocked_at?: string
        }
        Update: {
          id?: string
          skill_id?: string
          student_id?: string
          unlocked_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_skills_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_trainings: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          module_id: string
          reading_completed: boolean | null
          reading_progress: number | null
          score: number | null
          student_id: string
          video_completed: boolean | null
          video_progress: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          module_id: string
          reading_completed?: boolean | null
          reading_progress?: number | null
          score?: number | null
          student_id: string
          video_completed?: boolean | null
          video_progress?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          module_id?: string
          reading_completed?: boolean | null
          reading_progress?: number | null
          score?: number | null
          student_id?: string
          video_completed?: boolean | null
          video_progress?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "student_trainings_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "training_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_trainings_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          availability_status: boolean | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          cultural_background: string | null
          current_level: number | null
          daily_session_limit: number | null
          email: string
          full_name: string
          id: string
          is_certified: boolean | null
          last_session_date: string | null
          preferred_language: string | null
          professor_name: string | null
          student_id: string | null
          total_minutes_online: number | null
          university_name: string | null
          updated_at: string
          user_id: string
          username: string | null
          weekly_session_count: number | null
          xp: number | null
        }
        Insert: {
          availability_status?: boolean | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          cultural_background?: string | null
          current_level?: number | null
          daily_session_limit?: number | null
          email: string
          full_name: string
          id?: string
          is_certified?: boolean | null
          last_session_date?: string | null
          preferred_language?: string | null
          professor_name?: string | null
          student_id?: string | null
          total_minutes_online?: number | null
          university_name?: string | null
          updated_at?: string
          user_id: string
          username?: string | null
          weekly_session_count?: number | null
          xp?: number | null
        }
        Update: {
          availability_status?: boolean | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          cultural_background?: string | null
          current_level?: number | null
          daily_session_limit?: number | null
          email?: string
          full_name?: string
          id?: string
          is_certified?: boolean | null
          last_session_date?: string | null
          preferred_language?: string | null
          professor_name?: string | null
          student_id?: string | null
          total_minutes_online?: number | null
          university_name?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
          weekly_session_count?: number | null
          xp?: number | null
        }
        Relationships: []
      }
      training_modules: {
        Row: {
          content_url: string | null
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          name: string
          reading_content: string | null
          required: boolean | null
          video_url: string | null
        }
        Insert: {
          content_url?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          name: string
          reading_content?: string | null
          required?: boolean | null
          video_url?: string | null
        }
        Update: {
          content_url?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          name?: string
          reading_content?: string | null
          required?: boolean | null
          video_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_level_from_xp: { Args: { xp_amount: number }; Returns: number }
      get_seeker_email_by_username: {
        Args: { username: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
