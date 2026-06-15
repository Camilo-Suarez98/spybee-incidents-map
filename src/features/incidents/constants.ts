import type {
  IncidentPriority,
  IncidentStatus,
  IncidentType,
} from "./types";

export const PRIORITY_META: Record<
  IncidentPriority,
  { label: string; color: string; weight: number }
> = {
  high: { label: "Alta", color: "#ef4444", weight: 3 },
  medium: { label: "Media", color: "#f59e0b", weight: 2 },
  low: { label: "Baja", color: "#10b981", weight: 1 },
};

export const STATUS_META: Record<
  IncidentStatus,
  { label: string; color: string }
> = {
  open: { label: "Abierta", color: "#2563eb" },
  on_pause: { label: "En pausa", color: "#a855f7" },
  closed: { label: "Cerrada", color: "#16a34a" },
};

export const INCIDENT_TYPES: IncidentType[] = [
  { id: "t-architectural", key: "architectural", name: "Arquitectónico", name_en: "Architectural" },
  { id: "t-foundation", key: "foundation", name: "Cimentación", name_en: "Foundation" },
  { id: "t-design-coordination", key: "design_coordination", name: "Coordinación de Diseños", name_en: "Design Coordination" },
  { id: "t-electrical", key: "electrical", name: "Electrico", name_en: "Electrical" },
  { id: "t-stability", key: "stability", name: "Estabilidad", name_en: "Stability" },
  { id: "t-structural", key: "structural", name: "Estructural", name_en: "Structural" },
  { id: "t-soil-study", key: "soil_study", name: "Estudio Suelos", name_en: "Soil Study" },
  { id: "t-excavation", key: "excavation", name: "Excavación", name_en: "Excavation" },
  { id: "t-plumbing", key: "plumbing", name: "Hidrosanitario", name_en: "Plumbing" },
  { id: "t-infrastructure", key: "infrastructure", name: "Infraestructura", name_en: "Infrastructure" },
  { id: "t-masonry", key: "masonry", name: "Mamposteria", name_en: "Masonry" },
  { id: "t-materials", key: "materials", name: "Materiales", name_en: "Materials" },
  { id: "t-general-observation", key: "general_observation", name: "Observación General", name_en: "General Observation" },
  { id: "t-risk-prevention", key: "risk_prevention", name: "Prevención de riesgos", name_en: "Risk Prevention" },
  { id: "t-urbanism", key: "urbanism", name: "Urbanismo", name_en: "Urbanism" },
];

export const PROJECT_CENTER: [number, number] = [-74.05772, 4.652022];

export const PRIORITY_ORDER: IncidentPriority[] = ["high", "medium", "low"];

export const STATUS_ORDER: IncidentStatus[] = ["open", "on_pause", "closed"];
