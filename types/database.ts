export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      recipes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          ingredients: string[];
          steps: string[];
          category: string;
          difficulty: string;
          prep_time_minutes: number;
          cook_time_minutes: number;
          servings: number;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string;
          ingredients?: string[];
          steps?: string[];
          category?: string;
          difficulty?: string;
          prep_time_minutes?: number;
          cook_time_minutes?: number;
          servings?: number;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          ingredients?: string[];
          steps?: string[];
          category?: string;
          difficulty?: string;
          prep_time_minutes?: number;
          cook_time_minutes?: number;
          servings?: number;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      recipe_likes: {
        Row: {
          recipe_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          recipe_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          recipe_id?: string;
          user_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      recipe_comments: {
        Row: {
          id: string;
          recipe_id: string;
          user_id: string;
          body: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          recipe_id: string;
          user_id: string;
          body: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          recipe_id?: string;
          user_id?: string;
          body?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
