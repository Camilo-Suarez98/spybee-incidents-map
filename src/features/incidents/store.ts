import { create } from "zustand";
import { seedIncidents } from "./data/incidents";
import { getTypeByKey } from "./utils";
import type { Incident, NewIncidentInput, Person } from "./types";

interface IncidentsState {
  incidents: Incident[];
  selectedId: string | null;
  select: (id: string | null) => void;
  createIncident: (input: NewIncidentInput, author: Person) => Incident;
}

function buildIncident(
  input: NewIncidentInput,
  author: Person,
  order: number,
): Incident {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    sequenceId: String(order).padStart(4, "0"),
    order,
    title: input.title.trim(),
    description: input.description.trim(),
    type: getTypeByKey(input.typeKey),
    priority: input.priority,
    status: "open",
    approval: false,
    project: seedIncidents[0]?.project ?? {
      id: "project",
      name: "Proyecto Onboarding",
    },
    owner: author,
    whatsappOwner: null,
    assignees: [],
    observers: [],
    coordinates: input.coordinates,
    locationDescription: input.locationDescription.trim(),
    dueDate: input.dueDate,
    closingDate: null,
    media: [],
    tags: [],
    deleted: null,
    createdAt: now,
    updatedAt: now,
  };
}

export const useIncidentsStore = create<IncidentsState>((set, get) => ({
  incidents: seedIncidents,
  selectedId: null,
  select: (id) => set({ selectedId: id }),
  createIncident: (input, author) => {
    const order = get().incidents.length + 1;
    const incident = buildIncident(input, author, order);
    set((state) => ({
      incidents: [incident, ...state.incidents],
      selectedId: incident.id,
    }));
    return incident;
  },
}));
