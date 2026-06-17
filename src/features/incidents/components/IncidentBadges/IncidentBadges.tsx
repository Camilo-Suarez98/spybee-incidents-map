import { Badge } from "@components/ui/Badge";
import { PRIORITY_META, STATUS_META } from "../../constants";
import type { IncidentPriority, IncidentStatus } from "../../types";
import { useT } from "@/i18n";

export function StatusBadge({ status }: { status: IncidentStatus }) {
  const t = useT();
  return (
    <Badge color={STATUS_META[status].color} variant="dot">
      {t.status[status]}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: IncidentPriority }) {
  const t = useT();
  return <Badge color={PRIORITY_META[priority].color}>{t.priority[priority]}</Badge>;
}
