import { create } from "zustand";
import type {
  IncidentPriority,
  IncidentStatus,
} from "@features/incidents/types";

export interface DashboardFilters {
  status: IncidentStatus | "all";
  priority: IncidentPriority | "all";
  typeKey: string | "all";
}

interface DashboardState extends DashboardFilters {
  setStatus: (value: DashboardFilters["status"]) => void;
  setPriority: (value: DashboardFilters["priority"]) => void;
  setType: (value: DashboardFilters["typeKey"]) => void;
  reset: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  status: "all",
  priority: "all",
  typeKey: "all",
  setStatus: (status) => set({ status }),
  setPriority: (priority) => set({ priority }),
  setType: (typeKey) => set({ typeKey }),
  reset: () => set({ status: "all", priority: "all", typeKey: "all" }),
}));
