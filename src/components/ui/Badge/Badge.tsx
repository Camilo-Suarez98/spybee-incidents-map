import type { ReactNode } from "react";
import styles from "./Badge.module.scss";

interface BadgeProps {
  color: string;
  children: ReactNode;
  variant?: "soft" | "dot";
  size?: "sm" | "md";
}

function hexToRgb(hex: string): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export function Badge({ color, children, variant = "soft", size = "md" }: BadgeProps) {
  const rgb = hexToRgb(color);
  return (
    <span
      className={`${styles.badge} ${styles[size]}`}
      style={{
        color,
        background: `rgba(${rgb}, 0.12)`,
      }}
    >
      {variant === "dot" && (
        <span className={styles.dot} style={{ background: color }} />
      )}
      {children}
    </span>
  );
}
