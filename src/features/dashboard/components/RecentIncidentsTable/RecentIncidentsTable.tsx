import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { AlertIcon } from "@/components/ui/icons";
import {
  PriorityBadge,
  StatusBadge,
} from "@features/incidents/components/IncidentBadges";
import { formatDate } from "@features/incidents/utils";
import type { Incident } from "@features/incidents/types";
import { useT, useLocale, typeName } from "@/i18n";
import styles from "./RecentIncidentsTable.module.scss";

interface RecentIncidentsTableProps {
  incidents: Incident[];
}

export function RecentIncidentsTable({ incidents }: RecentIncidentsTableProps) {
  const t = useT();
  const locale = useLocale();

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
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{t.table.incident}</th>
            <th>{t.table.discipline}</th>
            <th>{t.table.status}</th>
            <th>{t.table.priority}</th>
            <th>{t.table.owner}</th>
            <th>{t.table.created}</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
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
  );
}
