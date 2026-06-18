import { create } from "zustand";
import type {
  IncidentPriority,
  IncidentStatus,
} from "@features/incidents/types";

export type TimePeriod = "7d" | "15d" | "30d" | "90d" | "6m";

export const DEFAULT_TIME_PERIOD: TimePeriod = "30d";

export const TIME_PERIOD_ORDER: TimePeriod[] = ["7d", "15d", "30d", "90d", "6m"];

export function timePeriodStart(period: TimePeriod): number {
  const now = new Date();
  switch (period) {
    case "7d":
      now.setDate(now.getDate() - 7);
      break;
    case "15d":
      now.setDate(now.getDate() - 15);
      break;
    case "30d":
      now.setDate(now.getDate() - 30);
      break;
    case "90d":
      now.setDate(now.getDate() - 90);
      break;
    case "6m":
      now.setMonth(now.getMonth() - 6);
      break;
  }
  return now.getTime();
}

export interface DashboardFilters {
  status: IncidentStatus | "all";
  priority: IncidentPriority | "all";
  typeKey: string | "all";
  timePeriod: TimePeriod;
}

interface DashboardState extends DashboardFilters {
  setStatus: (value: DashboardFilters["status"]) => void;
  setPriority: (value: DashboardFilters["priority"]) => void;
  setType: (value: DashboardFilters["typeKey"]) => void;
  setTimePeriod: (value: DashboardFilters["timePeriod"]) => void;
  reset: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  status: "all",
  priority: "all",
  typeKey: "all",
  timePeriod: DEFAULT_TIME_PERIOD,
  setStatus: (status) => set({ status }),
  setPriority: (priority) => set({ priority }),
  setType: (typeKey) => set({ typeKey }),
  setTimePeriod: (timePeriod) => set({ timePeriod }),
  reset: () =>
    set({
      status: "all",
      priority: "all",
      typeKey: "all",
      timePeriod: DEFAULT_TIME_PERIOD,
    }),
}));
