import { supabase } from "../supabaseClient";
import type { User } from "@supabase/supabase-js";

export const authService = {
  async signUp(
    email: string,
    password: string
  ): Promise<{ user: User | null }> {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return { user: data.user };
  },

  async signIn(
    email: string,
    password: string
  ): Promise<{ user: User | null }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { user: data.user };
  },

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getUser(): Promise<User | null> {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },
};
