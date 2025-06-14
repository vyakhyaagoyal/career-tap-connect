export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      conversations: {
        Row: {
          created_at: string
          id: number
          match_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          match_id: number
        }
        Update: {
          created_at?: string
          id?: number
          match_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "conversations_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company: string | null
          created_at: string
          id: string
          location: string | null
          pay: string | null
          recruiter_id: string
          tags: string[] | null
          title: string
          verified: boolean | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          id?: string
          location?: string | null
          pay?: string | null
          recruiter_id: string
          tags?: string[] | null
          title: string
          verified?: boolean | null
        }
        Update: {
          company?: string | null
          created_at?: string
          id?: string
          location?: string | null
          pay?: string | null
          recruiter_id?: string
          tags?: string[] | null
          title?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          created_at: string
          id: number
          job_id: string
          jobseeker_id: string
          recruiter_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          job_id: string
          jobseeker_id: string
          recruiter_id: string
        }
        Update: {
          created_at?: string
          id?: number
          job_id?: string
          jobseeker_id?: string
          recruiter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: number
          created_at: string
          id: number
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: number
          created_at?: string
          id?: number
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: number
          created_at?: string
          id?: number
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          email: string | null
          full_name: string | null
          id: string
          user_role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          email?: string | null
          full_name?: string | null
          id: string
          user_role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          email?: string | null
          full_name?: string | null
          id?: string
          user_role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      swipes: {
        Row: {
          created_at: string
          direction: Database["public"]["Enums"]["swipe_direction"]
          id: number
          job_id: string | null
          swiped_candidate_id: string | null
          swiper_id: string
        }
        Insert: {
          created_at?: string
          direction: Database["public"]["Enums"]["swipe_direction"]
          id?: number
          job_id?: string | null
          swiped_candidate_id?: string | null
          swiper_id: string
        }
        Update: {
          created_at?: string
          direction?: Database["public"]["Enums"]["swipe_direction"]
          id?: number
          job_id?: string | null
          swiped_candidate_id?: string | null
          swiper_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "swipes_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      swipe_direction: "left" | "right" | "up"
      user_role: "jobseeker" | "recruiter"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      swipe_direction: ["left", "right", "up"],
      user_role: ["jobseeker", "recruiter"],
    },
  },
} as const
