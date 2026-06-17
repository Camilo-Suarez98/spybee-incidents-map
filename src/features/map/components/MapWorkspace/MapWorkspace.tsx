"use client";

import { MapView } from "../MapView";
import { MapToolbar } from "../MapToolbar";
import { IncidentListPanel } from "../IncidentListPanel";
import { IncidentDetailPanel } from "../IncidentDetailPanel";
import { CreateIncidentModal } from "../CreateIncidentModal";
import styles from "./MapWorkspace.module.scss";

export function MapWorkspace() {
  return (
    <div className={styles.workspace}>
      <MapView />
      <MapToolbar />
      <IncidentListPanel />
      <IncidentDetailPanel />
      <CreateIncidentModal />
    </div>
  );
}
