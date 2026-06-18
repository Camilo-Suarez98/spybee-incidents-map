"use client";

import { useMemo } from "react";
import {
  GridIcon,
  AlertIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@/components/ui/icons";
import { STATUS_META } from "@features/incidents/constants";
import { useIncidentsStore } from "@features/incidents/store";
import { useDashboardStore, timePeriodStart } from "@features/dashboard/store";
import { computeMetrics } from "@features/dashboard/analytics";
import { useT, useLocale } from "@/i18n";
import { KpiCard } from "../KpiCard";
import { Panel } from "../Panel";
import { DonutChart } from "../DonutChart";
import { BarList } from "../BarList";
import { TrendChart } from "../TrendChart";
import { DashboardFilters } from "../DashboardFilters";
import { RecentIncidentsTable } from "../RecentIncidentsTable";
import styles from "./DashboardView.module.scss";

export function DashboardView() {
  const t = useT();
  const locale = useLocale();
  const incidents = useIncidentsStore((state) => state.incidents);
  const status = useDashboardStore((state) => state.status);
  const priority = useDashboardStore((state) => state.priority);
  const typeKey = useDashboardStore((state) => state.typeKey);
  const timePeriod = useDashboardStore((state) => state.timePeriod);

  const filtered = useMemo(() => {
    const periodStart = timePeriodStart(timePeriod);
    return incidents.filter((incident) => {
      if (new Date(incident.createdAt).getTime() < periodStart) return false;
      if (status !== "all" && incident.status !== status) return false;
      if (priority !== "all" && incident.priority !== priority) return false;
      if (typeKey !== "all" && incident.type.key !== typeKey) return false;
      return true;
    });
  }, [incidents, status, priority, typeKey, timePeriod]);

  const metrics = useMemo(
    () => computeMetrics(filtered, t, locale),
    [filtered, t, locale],
  );

  const projectName =
    incidents[0]?.project.name ?? t.topbar.projectFallback;

  return (
    <div className={styles.view}>
      <header className={styles.head}>
        <div>
          <p className={styles.eyebrow}>{projectName}</p>
          <h1>{t.dashboard.title}</h1>
          <p className={styles.subtitle}>{t.dashboard.subtitle}</p>
        </div>
        <DashboardFilters />
      </header>

      <section className={styles.kpis}>
        <KpiCard
          label={t.dashboard.kpiTotal}
          value={metrics.total}
          icon={<GridIcon />}
          accent="#fab915"
          hint={t.dashboard.approved(metrics.approvalRate)}
        />
        <KpiCard
          label={t.dashboard.kpiOpen}
          value={metrics.open}
          icon={<AlertIcon />}
          accent={STATUS_META.open.color}
          hint={t.dashboard.overdue(metrics.overdue)}
        />
        <KpiCard
          label={t.dashboard.kpiOnPause}
          value={metrics.onPause}
          icon={<ClockIcon />}
          accent={STATUS_META.on_pause.color}
        />
        <KpiCard
          label={t.dashboard.kpiClosed}
          value={metrics.closed}
          icon={<CheckCircleIcon />}
          accent={STATUS_META.closed.color}
          hint={t.dashboard.resolutionRate(metrics.resolutionRate)}
        />
      </section>

      <section className={styles.grid}>
        <Panel
          title={t.dashboard.byStatusTitle}
          subtitle={t.dashboard.byStatusSubtitle}
          className={styles.donutPanel}
        >
          <DonutChart
            segments={metrics.byStatus}
            centerLabel={t.dashboard.donutCenter}
          />
        </Panel>

        <Panel title={t.dashboard.byPriorityTitle} subtitle={t.dashboard.byPrioritySubtitle} className={styles.priorityPanel}>
          <BarList segments={metrics.byPriority} />
        </Panel>

        <Panel
          title={t.dashboard.trendTitle}
          subtitle={t.dashboard.trendSubtitle}
          className={styles.trendPanel}
        >
          <TrendChart points={metrics.trend} />
        </Panel>

        <Panel title={t.dashboard.topTypesTitle} subtitle={t.dashboard.topTypesSubtitle} className={styles.typesPanel}>
          <BarList segments={metrics.byType} />
        </Panel>
      </section>

      <Panel title={t.dashboard.recentTitle}>
        <RecentIncidentsTable incidents={filtered} />
      </Panel>
    </div>
  );
}
