import { supabaseClient } from "@/lib/client/supabaseClient";
import { create } from "zustand";

interface AuthState {
  session: any;
  user: { avatar_url: string; email_prefix: string } | null;
  fetchSession: () => Promise<void>;
  resetSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  fetchSession: async () => {
    const { data, error } = await supabaseClient.auth.getSession();
    if (data.session) {
      const { avatar_url, email } = data.session.user.user_metadata;
      const email_prefix = email.split("@")[0];

      set({
        session: data.session,
        user: {
          avatar_url,
          email_prefix,
        },
      });
    } else {
      set({ session: null, user: null });
    }
  },
  resetSession: () => {
    set({ session: null, user: null });
  },
}));
