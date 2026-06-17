import type { TrendPoint } from "@features/dashboard/analytics";
import { useT } from "@/i18n";
import styles from "./TrendChart.module.scss";

interface TrendChartProps {
  points: TrendPoint[];
}

const WIDTH = 560;
const HEIGHT = 200;
const PADDING_X = 12;
const PADDING_TOP = 16;
const PADDING_BOTTOM = 28;

export function TrendChart({ points }: TrendChartProps) {
  const t = useT();
  if (points.length === 0) {
    return <p className={styles.empty}>{t.dashboard.trendEmpty}</p>;
  }

  const max = Math.max(1, ...points.map((point) => point.value));
  const innerWidth = WIDTH - PADDING_X * 2;
  const innerHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM;
  const step = points.length > 1 ? innerWidth / (points.length - 1) : 0;

  const coords = points.map((point, index) => {
    const x = PADDING_X + step * index;
    const y = PADDING_TOP + innerHeight - (point.value / max) * innerHeight;
    return { x, y, point };
  });

  const line = coords
    .map((coord, index) => `${index === 0 ? "M" : "L"} ${coord.x} ${coord.y}`)
    .join(" ");

  const area = `${line} L ${coords[coords.length - 1].x} ${
    PADDING_TOP + innerHeight
  } L ${coords[0].x} ${PADDING_TOP + innerHeight} Z`;

  return (
    <div className={styles.chart}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" role="img">
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fab915" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#fab915" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#trendFill)" />
        <path
          d={line}
          fill="none"
          stroke="#e0a400"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {coords.map((coord) => (
          <circle
            key={coord.point.label}
            cx={coord.x}
            cy={coord.y}
            r="3.5"
            fill="#fff"
            stroke="#e0a400"
            strokeWidth="2"
          />
        ))}
      </svg>
      <div className={styles.axis}>
        {points.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </div>
  );
}
