import { PRIORITY_META } from "@features/incidents/constants";
import type { Incident } from "@features/incidents/types";
import styles from "./markers.module.scss";

export function createIncidentMarker(
  incident: Incident,
  selected: boolean,
): HTMLElement {
  const el = document.createElement("div");
  el.className = `${styles.pin} ${selected ? styles.selected : ""}`;
  el.style.setProperty("--pin-color", PRIORITY_META[incident.priority].color);
  el.setAttribute("role", "button");
  el.setAttribute("aria-label", incident.title);

  const body = document.createElement("span");
  body.className = styles.body;

  const core = document.createElement("span");
  core.className = styles.core;
  body.appendChild(core);
  el.appendChild(body);

  return el;
}

export function createDraftMarker(): HTMLElement {
  const el = document.createElement("div");
  el.className = `${styles.pin} ${styles.draft}`;

  const body = document.createElement("span");
  body.className = styles.body;

  const core = document.createElement("span");
  core.className = styles.core;
  body.appendChild(core);
  el.appendChild(body);

  return el;
}
