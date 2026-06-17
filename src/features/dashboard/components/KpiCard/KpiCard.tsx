import type { ReactNode } from "react";
import styles from "./KpiCard.module.scss";

interface KpiCardProps {
  label: string;
  value: string | number;
  hint?: string;
  icon: ReactNode;
  accent: string;
}

export function KpiCard({ label, value, hint, icon, accent }: KpiCardProps) {
  return (
    <article className={styles.card}>
      <span
        className={styles.icon}
        style={{ color: accent, background: `${accent}1a` }}
      >
        {icon}
      </span>
      <div className={styles.content}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
        {hint && <span className={styles.hint}>{hint}</span>}
      </div>
    </article>
  );
}
