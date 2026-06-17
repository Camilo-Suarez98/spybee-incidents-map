"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import {
  GridIcon,
  MapIcon,
  BellIcon,
  LayersIcon,
  SettingsIcon,
} from "@/components/ui/icons";
import { useT } from "@/i18n";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  open: boolean;
  onNavigate: () => void;
}

export function Sidebar({ open, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const t = useT();

  const navItems = [
    { href: "/map", label: t.nav.map, icon: MapIcon },
    { href: "/dashboard", label: t.nav.dashboard, icon: GridIcon },
  ];

  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
      <div className={styles.mark}>
        <Logo tone="light" showWordmark={false} size={28} />
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`${styles.link} ${active ? styles.active : ""}`}
              title={item.label}
            >
              <Icon />
              <span className={styles.label}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.bottom}>
        <span className={styles.ghost} title={t.sidebar.layers}>
          <LayersIcon />
        </span>
        <span className={styles.ghost} title={t.sidebar.notifications}>
          <BellIcon />
        </span>
        <span className={styles.ghost} title={t.sidebar.settings}>
          <SettingsIcon />
        </span>
      </div>
    </aside>
  );
}
