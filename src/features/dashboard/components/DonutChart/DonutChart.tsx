import type { Segment } from "@features/dashboard/analytics";
import styles from "./DonutChart.module.scss";

interface DonutChartProps {
  segments: Segment[];
  centerLabel: string;
}

const RADIUS = 60;
const STROKE = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function DonutChart({ segments, centerLabel }: DonutChartProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  let offset = 0;

  return (
    <div className={styles.chart}>
      <div className={styles.ring}>
        <svg viewBox="0 0 160 160" role="img" aria-label={centerLabel}>
          <circle
            cx="80"
            cy="80"
            r={RADIUS}
            fill="none"
            stroke="var(--track)"
            strokeWidth={STROKE}
          />
          {total > 0 &&
            segments.map((segment) => {
              const fraction = segment.value / total;
              const dash = fraction * CIRCUMFERENCE;
              const circle = (
                <circle
                  key={segment.key}
                  cx="80"
                  cy="80"
                  r={RADIUS}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={STROKE}
                  strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)"
                />
              );
              offset += dash;
              return circle;
            })}
        </svg>
        <div className={styles.center}>
          <span className={styles.total}>{total}</span>
          <span className={styles.label}>{centerLabel}</span>
        </div>
      </div>

      <ul className={styles.legend}>
        {segments.map((segment) => (
          <li key={segment.key}>
            <span className={styles.dot} style={{ background: segment.color }} />
            <span className={styles.name}>{segment.label}</span>
            <span className={styles.value}>{segment.value}</span>
            <span className={styles.percent}>
              {total ? Math.round((segment.value / total) * 100) : 0}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
