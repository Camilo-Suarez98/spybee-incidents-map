"use client";

import { useMemo, useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { IconButton } from "@/components/ui/IconButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { CloseIcon, SearchIcon, AlertIcon } from "@/components/ui/icons";
import { PriorityBadge } from "@features/incidents/components/IncidentBadges";
import { STATUS_META, STATUS_ORDER } from "@features/incidents/constants";
import { useIncidentsStore } from "@features/incidents/store";
import { formatRelative } from "@features/incidents/utils";
import type { IncidentStatus } from "@features/incidents/types";
import { useMapStore } from "@features/map/store";
import { useT, useLocale, typeName } from "@/i18n";
import styles from "./IncidentListPanel.module.scss";

export function IncidentListPanel() {
  const t = useT();
  const locale = useLocale();
  const listOpen = useMapStore((state) => state.listOpen);
  const toggleList = useMapStore((state) => state.toggleList);

  const incidents = useIncidentsStore((state) => state.incidents);
  const selectedId = useIncidentsStore((state) => state.selectedId);
  const select = useIncidentsStore((state) => state.select);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<IncidentStatus | "all">("all");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return incidents.filter((incident) => {
      if (status !== "all" && incident.status !== status) return false;
      if (!term) return true;
      return (
        incident.title.toLowerCase().includes(term) ||
        incident.sequenceId.includes(term) ||
        incident.type.name.toLowerCase().includes(term) ||
        incident.locationDescription.toLowerCase().includes(term)
      );
    });
  }, [incidents, query, status]);

  if (!listOpen) return null;

  return (
    <aside className={styles.panel}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <div>
            <h2>{t.listPanel.title}</h2>
            <p>{t.listPanel.count(filtered.length, incidents.length)}</p>
          </div>
          <IconButton label={t.listPanel.hideList} onClick={toggleList}>
            <CloseIcon />
          </IconButton>
        </div>

        <div className={styles.search}>
          <SearchIcon width={18} height={18} />
          <input
            type="search"
            placeholder={t.listPanel.searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className={styles.filters}>
          <button
            type="button"
            className={`${styles.chip} ${status === "all" ? styles.chipActive : ""}`}
            onClick={() => setStatus("all")}
          >
            {t.listPanel.all}
          </button>
          {STATUS_ORDER.map((value) => (
            <button
              key={value}
              type="button"
              className={`${styles.chip} ${status === value ? styles.chipActive : ""}`}
              onClick={() => setStatus(value)}
            >
              <span
                className={styles.dot}
                style={{ background: STATUS_META[value].color }}
              />
              {t.status[value]}
            </button>
          ))}
        </div>
      </header>

      <div className={styles.list}>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<AlertIcon />}
            title={t.listPanel.emptyTitle}
            description={t.listPanel.emptyDesc}
          />
        ) : (
          filtered.map((incident) => (
            <button
              key={incident.id}
              type="button"
              className={`${styles.card} ${incident.id === selectedId ? styles.cardActive : ""
                }`}
              onClick={() => select(incident.id)}
            >
              <span
                className={styles.statusBar}
                style={{ background: STATUS_META[incident.status].color }}
              />
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <span className={styles.cardSeq}>#{incident.sequenceId}</span>
                  <PriorityBadge priority={incident.priority} />
                </div>
                <p className={styles.cardTitle}>{incident.title}</p>
                <div className={styles.cardMeta}>
                  <span>{typeName(incident.type, locale)}</span>
                  <span className={styles.metaDivider} />
                  <span>{formatRelative(incident.createdAt)}</span>
                </div>
              </div>
              <Avatar person={incident.owner} size={28} />
            </button>
          ))
        )}
      </div>
    </aside>
  );
}
