"use client";

import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import styles from "./AppShell.module.scss";

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <Topbar onToggleMenu={() => setMenuOpen((value) => !value)} />
      <Sidebar open={menuOpen} onNavigate={() => setMenuOpen(false)} />
      {menuOpen && (
        <div
          className={styles.scrim}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <main className={styles.content}>{children}</main>
    </div>
  );
}
