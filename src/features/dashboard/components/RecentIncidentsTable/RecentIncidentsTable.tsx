"use client";

import { useMemo, useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { AlertIcon, ChevronDownIcon, ChevronRightIcon } from "@/components/ui/icons";
import {
  PriorityBadge,
  StatusBadge,
} from "@features/incidents/components/IncidentBadges";
import { PRIORITY_ORDER, STATUS_ORDER } from "@features/incidents/constants";
import { formatDate } from "@features/incidents/utils";
import type { Incident } from "@features/incidents/types";
import { INTL_LOCALE } from "@/i18n/config";
import { useT, useLocale, typeName } from "@/i18n";
import styles from "./RecentIncidentsTable.module.scss";

const PAGE_SIZE = 10;

type SortKey = "discipline" | "status" | "priority" | "created";
type SortDir = "asc" | "desc";

interface RecentIncidentsTableProps {
  incidents: Incident[];
}

export function RecentIncidentsTable({ incidents }: RecentIncidentsTableProps) {
  const t = useT();
  const locale = useLocale();
  const [sortKey, setSortKey] = useState<SortKey>("created");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);

  const [prevIncidents, setPrevIncidents] = useState(incidents);
  if (incidents !== prevIncidents) {
    setPrevIncidents(incidents);
    setPage(1);
  }

  const sorted = useMemo(() => {
    const dir = sortDir === "asc" ? 1 : -1;
    return [...incidents].sort((a, b) => dir * compare(a, b, sortKey, locale));
  }, [incidents, sortKey, sortDir, locale]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pageItems = sorted.slice(start, start + PAGE_SIZE);
  const from = sorted.length === 0 ? 0 : start + 1;
  const to = Math.min(start + PAGE_SIZE, sorted.length);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "created" ? "desc" : "asc");
    }
    setPage(1);
  }

  if (incidents.length === 0) {
    return (
      <EmptyState
        icon={<AlertIcon />}
        title={t.table.emptyTitle}
        description={t.table.emptyDesc}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t.table.incident}</th>
              <SortHeader
                label={t.table.discipline}
                sortKey="discipline"
                active={sortKey}
                dir={sortDir}
                onSort={toggleSort}
                ariaLabel={t.table.sortBy(t.table.discipline)}
              />
              <SortHeader
                label={t.table.status}
                sortKey="status"
                active={sortKey}
                dir={sortDir}
                onSort={toggleSort}
                ariaLabel={t.table.sortBy(t.table.status)}
              />
              <SortHeader
                label={t.table.priority}
                sortKey="priority"
                active={sortKey}
                dir={sortDir}
                onSort={toggleSort}
                ariaLabel={t.table.sortBy(t.table.priority)}
              />
              <th>{t.table.owner}</th>
              <SortHeader
                label={t.table.created}
                sortKey="created"
                active={sortKey}
                dir={sortDir}
                onSort={toggleSort}
                ariaLabel={t.table.sortBy(t.table.created)}
              />
            </tr>
          </thead>
          <tbody>
            {pageItems.map((incident) => (
              <tr key={incident.id}>
                <td>
                  <div className={styles.titleCell}>
                    <span className={styles.seq}>#{incident.sequenceId}</span>
                    <span className={styles.title}>{incident.title}</span>
                  </div>
                </td>
                <td className={styles.muted}>{typeName(incident.type, locale)}</td>
                <td>
                  <StatusBadge status={incident.status} />
                </td>
                <td>
                  <PriorityBadge priority={incident.priority} />
                </td>
                <td>
                  <div className={styles.owner}>
                    <Avatar person={incident.owner} size={26} />
                    <span>{incident.owner.name}</span>
                  </div>
                </td>
                <td className={styles.muted}>{formatDate(incident.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <span className={styles.range}>{t.table.range(from, to, sorted.length)}</span>
        <div className={styles.pager}>
          <Button
            variant="secondary"
            size="sm"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            leadingIcon={<ChevronRightIcon className={styles.flip} width={16} height={16} />}
          />
          <span className={styles.pageInfo}>
            {t.pagination.page(safePage, totalPages)}
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            trailingIcon={<ChevronRightIcon width={16} height={16} />}
          />
        </div>
      </div>
    </div>
  );
}

interface SortHeaderProps {
  label: string;
  sortKey: SortKey;
  active: SortKey;
  dir: SortDir;
  onSort: (key: SortKey) => void;
  ariaLabel: string;
}

function SortHeader({ label, sortKey, active, dir, onSort, ariaLabel }: SortHeaderProps) {
  const isActive = active === sortKey;
  return (
    <th aria-sort={isActive ? (dir === "asc" ? "ascending" : "descending") : "none"}>
      <button
        type="button"
        className={`${styles.sortBtn} ${isActive ? styles.sortActive : ""}`}
        onClick={() => onSort(sortKey)}
        aria-label={ariaLabel}
      >
        <span>{label}</span>
        <ChevronDownIcon
          className={`${styles.sortIcon} ${isActive && dir === "asc" ? styles.flip : ""}`}
          width={14}
          height={14}
          aria-hidden
        />
      </button>
    </th>
  );
}

function compare(a: Incident, b: Incident, key: SortKey, locale: ReturnType<typeof useLocale>): number {
  switch (key) {
    case "discipline":
      return typeName(a.type, locale).localeCompare(
        typeName(b.type, locale),
        INTL_LOCALE[locale],
      );
    case "status":
      return STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
    case "priority":
      return PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority);
    case "created":
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  }
}
