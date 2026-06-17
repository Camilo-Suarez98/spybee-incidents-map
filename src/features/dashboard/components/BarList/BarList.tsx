import type { Segment } from "@features/dashboard/analytics";
import styles from "./BarList.module.scss";

interface BarListProps {
  segments: Segment[];
}

export function BarList({ segments }: BarListProps) {
  const max = Math.max(1, ...segments.map((segment) => segment.value));

  return (
    <ul className={styles.list}>
      {segments.map((segment) => (
        <li key={segment.key} className={styles.row}>
          <span className={styles.label}>{segment.label}</span>
          <span className={styles.track}>
            <span
              className={styles.bar}
              style={{
                width: `${(segment.value / max) * 100}%`,
                background: segment.color,
              }}
            />
          </span>
          <span className={styles.value}>{segment.value}</span>
        </li>
      ))}
    </ul>
  );
}
