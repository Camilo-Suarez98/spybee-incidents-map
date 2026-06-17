import {
  PRIORITY_META,
  PRIORITY_ORDER,
  STATUS_META,
  STATUS_ORDER,
} from "@features/incidents/constants";
import { getTypeByKey, isOverdue } from "@features/incidents/utils";
import type {
  Incident,
  IncidentPriority,
  IncidentStatus,
} from "@features/incidents/types";
import { typeName, type Dictionary, type Locale } from "@/i18n";

export interface Segment {
  key: string;
  label: string;
  value: number;
  color: string;
}

export interface TrendPoint {
  label: string;
  value: number;
}

export interface DashboardMetrics {
  total: number;
  open: number;
  onPause: number;
  closed: number;
  overdue: number;
  resolutionRate: number;
  approvalRate: number;
  avgResolutionDays: number | null;
  byStatus: Segment[];
  byPriority: Segment[];
  byType: Segment[];
  trend: TrendPoint[];
  topOwners: { name: string; avatarUrl: string; count: number }[];
}

function buildTrend(incidents: Incident[], months: string[]): TrendPoint[] {
  const buckets = new Map<string, number>();
  incidents.forEach((incident) => {
    const date = new Date(incident.createdAt);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  });

  return Array.from(buckets.entries())
    .map(([key, value]) => {
      const [year, month] = key.split("-").map(Number);
      return {
        sort: year * 12 + month,
        label: `${months[month]} ${String(year).slice(2)}`,
        value,
      };
    })
    .sort((a, b) => a.sort - b.sort)
    .slice(-8)
    .map(({ label, value }) => ({ label, value }));
}

export function computeMetrics(
  incidents: Incident[],
  t: Dictionary,
  locale: Locale,
): DashboardMetrics {
  const total = incidents.length;

  const statusCount = { open: 0, on_pause: 0, closed: 0 } as Record<
    IncidentStatus,
    number
  >;
  const priorityCount = { high: 0, medium: 0, low: 0 } as Record<
    IncidentPriority,
    number
  >;
  const typeCount = new Map<string, number>();
  const ownerCount = new Map<string, { avatarUrl: string; count: number }>();

  let approved = 0;
  let overdue = 0;
  let resolutionDaysSum = 0;
  let resolved = 0;

  incidents.forEach((incident) => {
    statusCount[incident.status] += 1;
    priorityCount[incident.priority] += 1;
    typeCount.set(
      incident.type.key,
      (typeCount.get(incident.type.key) ?? 0) + 1,
    );

    const owner = ownerCount.get(incident?.owner?.name || "") ?? {
      avatarUrl: incident?.owner?.avatarUrl || "",
      count: 0,
    };
    owner.count += 1;
    ownerCount.set(incident?.owner?.name || "", owner);

    if (incident.approval) approved += 1;
    if (isOverdue(incident)) overdue += 1;

    if (incident.status === "closed" && incident.closingDate) {
      const days =
        (new Date(incident.closingDate).getTime() -
          new Date(incident.createdAt).getTime()) /
        86_400_000;
      if (days >= 0) {
        resolutionDaysSum += days;
        resolved += 1;
      }
    }
  });

  const byStatus: Segment[] = STATUS_ORDER.map((status) => ({
    key: status,
    label: t.status[status],
    value: statusCount[status],
    color: STATUS_META[status].color,
  }));

  const byPriority: Segment[] = PRIORITY_ORDER.map((priority) => ({
    key: priority,
    label: t.priority[priority],
    value: priorityCount[priority],
    color: PRIORITY_META[priority].color,
  }));

  const palette = ["#2563eb", "#fab915", "#a855f7", "#10b981", "#ef4444", "#0ea5e9"];
  const byType: Segment[] = Array.from(typeCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([key, value], index) => ({
      key,
      label: typeName(getTypeByKey(key), locale),
      value,
      color: palette[index % palette.length],
    }));

  const topOwners = Array.from(ownerCount.entries())
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    total,
    open: statusCount.open,
    onPause: statusCount.on_pause,
    closed: statusCount.closed,
    overdue,
    resolutionRate: total ? Math.round((statusCount.closed / total) * 100) : 0,
    approvalRate: total ? Math.round((approved / total) * 100) : 0,
    avgResolutionDays: resolved ? resolutionDaysSum / resolved : null,
    byStatus,
    byPriority,
    byType,
    trend: buildTrend(incidents, t.time.months),
    topOwners,
  };
}
