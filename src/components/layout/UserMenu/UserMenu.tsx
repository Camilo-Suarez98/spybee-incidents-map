"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { ChevronDownIcon, LogoutIcon, UserIcon } from "@/components/ui/icons";
import { useAuthStore } from "@features/auth/store";
import type { AuthUser } from "@features/auth/types";
import { useT } from "@/i18n";
import styles from "./UserMenu.module.scss";

export function UserMenu({ user }: { user: AuthUser }) {
  const router = useRouter();
  const signOut = useAuthStore((state) => state.signOut);
  const t = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSignOut = () => {
    signOut();
    router.replace("/login");
  };

  return (
    <div className={styles.menu} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <Avatar person={user} size={32} />
        <span className={styles.identity}>
          <span className={styles.name}>{user.name}</span>
          <span className={styles.role}>{t.roles[user.role] ?? user.role}</span>
        </span>
        <ChevronDownIcon width={16} height={16} className={styles.caret} />
      </button>

      {open && (
        <div className={styles.dropdown} role="menu">
          <div className={styles.header}>
            <Avatar person={user} size={40} />
            <div>
              <p className={styles.name}>{user.name}</p>
              <p className={styles.email}>{user.email}</p>
            </div>
          </div>
          <div className={styles.divider} />
          <button type="button" className={styles.item} role="menuitem">
            <UserIcon width={18} height={18} />
            <span>{t.userMenu.profile}</span>
          </button>

          <div className={styles.divider} />
          <button
            type="button"
            className={`${styles.item} ${styles.danger}`}
            role="menuitem"
            onClick={handleSignOut}
          >
            <LogoutIcon width={18} height={18} />
            <span>{t.userMenu.signOut}</span>
          </button>
        </div>
      )}
    </div>
  );
}
