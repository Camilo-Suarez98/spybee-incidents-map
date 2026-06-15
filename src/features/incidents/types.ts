export type IncidentPriority = "high" | "medium" | "low";

export type IncidentStatus = "open" | "on_pause" | "closed";

export interface IncidentType {
  id: string;
  key: string;
  name: string;
  name_en: string;
}

export interface Person {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface IncidentMedia {
  id: string;
  name: string;
  type: "image" | "video";
  format: string;
  size: number;
  status: string;
  url: string;
}

export interface IncidentTag {
  id: string;
  name: string;
  color: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Incident {
  id: string;
  sequenceId: string;
  order: number;
  title: string;
  description: string;
  type: IncidentType;
  priority: IncidentPriority;
  status: IncidentStatus;
  approval: boolean;
  project: { id: string; name: string };
  owner: Person;
  whatsappOwner: string | null;
  assignees: Person[];
  observers: Person[];
  coordinates: Coordinates;
  locationDescription: string;
  dueDate: string | null;
  closingDate: string | null;
  media: IncidentMedia[];
  tags: IncidentTag[];
  deleted: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NewIncidentInput {
  title: string;
  description: string;
  dueDate: string | null;
  typeKey: string;
  priority: IncidentPriority;
  locationDescription: string;
  coordinates: Coordinates;
}
