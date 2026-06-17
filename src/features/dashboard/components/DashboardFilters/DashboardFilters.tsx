"use client";

import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/Field";
import { FilterIcon } from "@/components/ui/icons";
import {
  INCIDENT_TYPES,
  PRIORITY_ORDER,
  STATUS_ORDER,
} from "@features/incidents/constants";
import { useDashboardStore } from "@features/dashboard/store";
import { useT, useLocale, typeName } from "@/i18n";
import styles from "./DashboardFilters.module.scss";

export function DashboardFilters() {
  const t = useT();
  const locale = useLocale();
  const { status, priority, typeKey, setStatus, setPriority, setType, reset } =
    useDashboardStore();

  const statusOptions = [
    { value: "all", label: t.filters.allStatuses },
    ...STATUS_ORDER.map((value) => ({ value, label: t.status[value] })),
  ];

  const priorityOptions = [
    { value: "all", label: t.filters.allPriorities },
    ...PRIORITY_ORDER.map((value) => ({ value, label: t.priority[value] })),
  ];

  const typeOptions = [
    { value: "all", label: t.filters.allDisciplines },
    ...INCIDENT_TYPES.map((type) => ({
      value: type.key,
      label: typeName(type, locale),
    })),
  ];

  const dirty = status !== "all" || priority !== "all" || typeKey !== "all";

  return (
    <div className={styles.filters}>
      <span className={styles.icon}>
        <FilterIcon width={18} height={18} />
      </span>
      <SelectField
        options={statusOptions}
        value={status}
        onChange={(event) =>
          setStatus(event.target.value as typeof status)
        }
      />
      <SelectField
        options={priorityOptions}
        value={priority}
        onChange={(event) =>
          setPriority(event.target.value as typeof priority)
        }
      />
      <SelectField
        options={typeOptions}
        value={typeKey}
        onChange={(event) => setType(event.target.value)}
      />
      {dirty && (
        <Button variant="ghost" size="sm" onClick={reset}>
          {t.filters.clear}
        </Button>
      )}
    </div>
  );
}
