"use client";

import { Logo } from "@/components/ui/Logo";
import { IconButton } from "@/components/ui/IconButton";
import { BellIcon } from "@/components/ui/icons";
import { UserMenu } from "@/components/layout/UserMenu";
import { useAuthStore } from "@features/auth/store";
import { seedIncidents } from "@features/incidents/data/incidents";
import styles from "./Topbar.module.scss";

function MenuGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

interface TopbarProps {
  onToggleMenu: () => void;
}

export function Topbar({ onToggleMenu }: TopbarProps) {
  const user = useAuthStore((state) => state.user);
  const projectName = seedIncidents[0]?.project.name ?? "Proyecto";

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <span className={styles.burger}>
          <IconButton label="Abrir menú" tone="light" onClick={onToggleMenu}>
            <MenuGlyph />
          </IconButton>
        </span>
        <Logo tone="light" />
      </div>

      <div className={styles.center}>
        <span className={styles.projectDot} />
        <span className={styles.projectName}>{projectName}</span>
      </div>

      <div className={styles.right}>
        <span className={styles.bell}>
          <IconButton label="Notificaciones" tone="light">
            <BellIcon />
          </IconButton>
        </span>
        {user && <UserMenu user={user} />}
      </div>
    </header>
  );
}
