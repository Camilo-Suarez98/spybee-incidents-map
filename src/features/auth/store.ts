import { create } from "zustand";
import { persist } from "zustand/middleware";
import { dictionaries, getLocale } from "@/i18n";
import type { AuthUser } from "./types";
import { DEMO_ACCOUNTS, findAccount } from "./users";

export const DEMO_CREDENTIALS = {
  email: DEMO_ACCOUNTS[0].email,
  password: DEMO_ACCOUNTS[0].password,
};

interface AuthState {
  user: AuthUser | null;
  hydrated: boolean;
  setHydrated: () => void;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ ok: boolean; message?: string }>;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      signIn: async (email, password) => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        const account = findAccount(email, password);
        if (!account) {
          return {
            ok: false,
            message: dictionaries[getLocale()].auth.invalidCredentials,
          };
        }
        set({ user: account });
        return { ok: true };
      },
      signOut: () => set({ user: null }),
    }),
    {
      name: "spybee-auth",
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
