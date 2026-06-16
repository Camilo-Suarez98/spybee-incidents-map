import type { AuthUser } from "./types";

export interface DemoAccount extends AuthUser {
  password: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: "usr-demo-julian",
    name: "Julián Lozano",
    email: "demo@spybee.com",
    password: "spybee2026",
    avatarUrl: "https://i.pravatar.cc/150?u=julian.spybee",
    role: "Superadmin",
  },
  {
    id: "usr-demo-camilo",
    name: "Camilo Suárez",
    email: "camilo@spybee.com",
    password: "spybee2026",
    avatarUrl: "https://i.pravatar.cc/150?u=camilo.spybee",
    role: "Administrador",
  }
];

export function findAccount(email: string, password: string): AuthUser | null {
  const account = DEMO_ACCOUNTS.find(
    (item) =>
      item.email === email.trim().toLowerCase() && item.password === password,
  );
  if (!account) return null;
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    avatarUrl: account.avatarUrl,
    role: account.role,
  };
}
