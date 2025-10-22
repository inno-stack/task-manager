import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import { authService } from "../services/authService";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  checkAuth: async () => {
    const user = await authService.getUser();
    set({ user, isAuthenticated: !!user });
  },

  signIn: async (email, password) => {
    const { user } = await authService.signIn(email, password);
    set({ user, isAuthenticated: true });
  },

  signUp: async (email, password) => {
    const { user } = await authService.signUp(email, password);
    set({ user, isAuthenticated: true });
  },

  signOut: async () => {
    await authService.signOut();
    set({ user: null, isAuthenticated: false });
  },
}));
