import { Badge } from "@components/ui/Badge";
import { PRIORITY_META, STATUS_META } from "../../constants";
import type { IncidentPriority, IncidentStatus } from "../../types";

export function StatusBadge({ status }: { status: IncidentStatus }) {
  const meta = STATUS_META[status];
  return (
    <Badge color={meta.color} variant="dot">
      {meta.label}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: IncidentPriority }) {
  const meta = PRIORITY_META[priority];
  return <Badge color={meta.color}>{meta.label}</Badge>;
}
