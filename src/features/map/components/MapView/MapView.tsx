"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { PROJECT_CENTER } from "@features/incidents/constants";
import { useIncidentsStore } from "@features/incidents/store";
import { useMapStore } from "@features/map/store";
import { createDraftMarker, createIncidentMarker } from "./markers";
import markerStyles from "./markers.module.scss";
import { MapTokenNotice } from "../MapTokenNotice";
import styles from "./MapView.module.scss";

const MAP_STYLE = "mapbox://styles/mapbox/streets-v12";
const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

export function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());
  const draftMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const incidents = useIncidentsStore((state) => state.incidents);
  const selectedId = useIncidentsStore((state) => state.selectedId);
  const select = useIncidentsStore((state) => state.select);

  const placementMode = useMapStore((state) => state.placementMode);
  const draft = useMapStore((state) => state.draft);
  const pickLocation = useMapStore((state) => state.pickLocation);

  const placementRef = useRef(placementMode);

  useEffect(() => {
    placementRef.current = placementMode;
  }, [placementMode]);

  useEffect(() => {
    if (!TOKEN || !containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = TOKEN;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center: PROJECT_CENTER,
      zoom: 14.2,
      attributionControl: false,
    });
    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: true, visualizePitch: true }),
      "bottom-right",
    );
    map.on("click", (event) => {
      if (!placementRef.current) return;
      pickLocation({ lat: event.lngLat.lat, lng: event.lngLat.lng });
    });

    mapRef.current = map;
    const markers = markersRef.current;

    return () => {
      map.remove();
      mapRef.current = null;
      markers.clear();
    };
  }, [pickLocation]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const store = markersRef.current;
    const seen = new Set<string>();

    incidents.forEach((incident) => {
      seen.add(incident.id);
      if (store.has(incident.id)) return;
      const element = createIncidentMarker(incident, incident.id === selectedId);
      element.addEventListener("click", (event) => {
        event.stopPropagation();
        select(incident.id);
      });
      const marker = new mapboxgl.Marker({ element, anchor: "bottom" })
        .setLngLat([incident.coordinates.lng, incident.coordinates.lat])
        .addTo(map);
      store.set(incident.id, marker);
    });

    store.forEach((marker, id) => {
      if (!seen.has(id)) {
        marker.remove();
        store.delete(id);
      }
    });
  }, [incidents, selectedId, select]);

  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      marker.getElement().classList.toggle(markerStyles.selected, id === selectedId);
    });

    const map = mapRef.current;
    if (!map || !selectedId) return;
    const target = incidents.find((incident) => incident.id === selectedId);
    if (!target) return;
    map.flyTo({
      center: [target.coordinates.lng, target.coordinates.lat],
      zoom: Math.max(map.getZoom(), 15.5),
      speed: 0.8,
    });
  }, [selectedId, incidents]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (draftMarkerRef.current) {
      draftMarkerRef.current.remove();
      draftMarkerRef.current = null;
    }
    if (draft) {
      draftMarkerRef.current = new mapboxgl.Marker({
        element: createDraftMarker(),
        anchor: "bottom",
      })
        .setLngLat([draft.lng, draft.lat])
        .addTo(map);
    }
  }, [draft]);

  if (!TOKEN) {
    return <MapTokenNotice />;
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.map} ${placementMode ? styles.placing : ""}`}
    />
  );
}
