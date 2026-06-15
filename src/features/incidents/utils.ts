import { INCIDENT_TYPES } from "./constants";
import type { Incident, IncidentType } from "./types";

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(value: string | null): string {
  if (!value) return "Sin fecha";
  return dateFormatter.format(new Date(value));
}

export function formatDateTime(value: string | null): string {
  if (!value) return "Sin fecha";
  return dateTimeFormatter.format(new Date(value));
}

export function formatRelative(value: string): string {
  const diff = Date.now() - new Date(value).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days <= 0) return "Hoy";
  if (days === 1) return "Ayer";
  if (days < 30) return `Hace ${days} días`;
  const months = Math.floor(days / 30);
  if (months < 12) return `Hace ${months} ${months === 1 ? "mes" : "meses"}`;
  const years = Math.floor(months / 12);
  return `Hace ${years} ${years === 1 ? "año" : "años"}`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let size = bytes / 1024;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit += 1;
  }
  return `${size.toFixed(1)} ${units[unit]}`;
}

export function getTypeByKey(key: string): IncidentType {
  return (
    INCIDENT_TYPES.find((type) => type.key === key) ?? INCIDENT_TYPES[0]
  );
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function isOverdue(incident: Incident): boolean {
  if (!incident.dueDate || incident.status === "closed") return false;
  return new Date(incident.dueDate).getTime() < Date.now();
}
