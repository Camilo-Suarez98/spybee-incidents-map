import type { Incident } from "../types";
import raw from "./incidents.mock.json";

export const seedIncidents = raw as unknown as Incident[];
