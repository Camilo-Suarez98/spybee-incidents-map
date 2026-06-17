import type { Metadata } from "next";
import { MapWorkspace } from "@features/map/components/MapWorkspace";

export const metadata: Metadata = {
  title: "Mapa de incidencias · Spybee",
};

export default function MapPage() {
  return <MapWorkspace />;
}
