"use client";

import { Logo } from "@/components/ui/Logo";
import { IconButton } from "@/components/ui/IconButton";
import { BellIcon } from "@/components/ui/icons";
import { UserMenu } from "@/components/layout/UserMenu";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useAuthStore } from "@features/auth/store";
import { useIncidentsStore } from "@features/incidents/store";
import { useT } from "@/i18n";
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
  const t = useT();
  const user = useAuthStore((state) => state.user);
  const projectName = useIncidentsStore((state) => {
    const selected = state.incidents.find(
      (incident) => incident.id === state.selectedId,
    );
    return (
      (selected ?? state.incidents[0])?.project.name ?? t.topbar.projectFallback
    );
  });

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <span className={styles.burger}>
          <IconButton label={t.topbar.openMenu} tone="light" onClick={onToggleMenu}>
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
        <LanguageSwitcher />
        <span className={styles.bell}>
          <IconButton label={t.topbar.notifications} tone="light">
            <BellIcon />
          </IconButton>
        </span>
        {user && <UserMenu user={user} />}
      </div>
    </header>
  );
}
