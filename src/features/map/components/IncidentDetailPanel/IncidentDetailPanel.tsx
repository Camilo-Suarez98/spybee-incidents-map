"use client";

import Image from "next/image";
import { IconButton } from "@/components/ui/IconButton";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";
import {
  CloseIcon,
  PinIcon,
  CalendarIcon,
  ClockIcon,
  VideoIcon,
} from "@/components/ui/icons";
import {
  PriorityBadge,
  StatusBadge,
} from "@features/incidents/components/IncidentBadges";
import { useIncidentsStore } from "@features/incidents/store";
import { formatDate, formatRelative } from "@features/incidents/utils";
import { useT, useLocale, typeName } from "@/i18n";
import styles from "./IncidentDetailPanel.module.scss";

export function IncidentDetailPanel() {
  const t = useT();
  const locale = useLocale();
  const selectedId = useIncidentsStore((state) => state.selectedId);
  const incident = useIncidentsStore((state) =>
    state.incidents.find((item) => item.id === state.selectedId),
  );
  const select = useIncidentsStore((state) => state.select);

  if (!selectedId || !incident) return null;

  return (
    <aside className={styles.panel}>
      <header className={styles.header}>
        <div className={styles.headingRow}>
          <span className={styles.sequence}>#{incident.sequenceId}</span>
          <IconButton label={t.detailPanel.closeDetail} onClick={() => select(null)}>
            <CloseIcon />
          </IconButton>
        </div>
        <h2 className={styles.title}>{incident.title}</h2>
        <div className={styles.badges}>
          <StatusBadge status={incident.status} />
          <PriorityBadge priority={incident.priority} />
          <span className={styles.type}>{typeName(incident.type, locale)}</span>
        </div>
      </header>

      <div className={styles.body}>
        <p className={styles.description}>{incident.description}</p>

        <dl className={styles.meta}>
          <div>
            <dt>
              <PinIcon width={16} height={16} /> {t.detailPanel.location}
            </dt>
            <dd>{incident.locationDescription || t.detailPanel.noReference}</dd>
          </div>
          <div>
            <dt>
              <CalendarIcon width={16} height={16} /> {t.detailPanel.dueDate}
            </dt>
            <dd>{formatDate(incident.dueDate)}</dd>
          </div>
          <div>
            <dt>
              <ClockIcon width={16} height={16} /> {t.detailPanel.created}
            </dt>
            <dd>{formatRelative(incident.createdAt)}</dd>
          </div>
          <div>
            <dt>
              <ClockIcon width={16} height={16} /> {t.detailPanel.closing}
            </dt>
            <dd>{formatDate(incident.closingDate)}</dd>
          </div>
        </dl>

        {incident.tags.length > 0 && (
          <div className={styles.tags}>
            {incident.tags.map((tag) => (
              <span
                key={tag.id}
                className={styles.tag}
                style={{ color: tag.color, background: `${tag.color}1f` }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <section className={styles.section}>
          <h3>{t.detailPanel.owner}</h3>
          <div className={styles.owner}>
            <Avatar person={incident.owner} size={36} />
            <div>
              <p className={styles.ownerName}>{incident.owner.name}</p>
              <p className={styles.ownerEmail}>{incident.owner.email}</p>
            </div>
          </div>
        </section>

        {(incident.assignees.length > 0 || incident.observers.length > 0) && (
          <section className={styles.section}>
            <div className={styles.people}>
              {incident.assignees.length > 0 && (
                <div>
                  <h3>{t.detailPanel.assignees}</h3>
                  <AvatarGroup people={incident.assignees} max={4} />
                </div>
              )}
              {incident.observers.length > 0 && (
                <div>
                  <h3>{t.detailPanel.observers}</h3>
                  <AvatarGroup people={incident.observers} max={4} />
                </div>
              )}
            </div>
          </section>
        )}

        {incident.media.length > 0 && (
          <section className={styles.section}>
            <h3>{t.detailPanel.evidence(incident.media.length)}</h3>
            <div className={styles.gallery}>
              {incident.media.map((item) => (
                <div key={item.id} className={styles.mediaItem}>
                  <Image
                    src={item.url}
                    alt={item.name}
                    width={160}
                    height={120}
                    className={styles.mediaImage}
                    unoptimized
                  />
                  {item.type === "video" && (
                    <span className={styles.playBadge}>
                      <VideoIcon width={16} height={16} />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </aside>
  );
}
