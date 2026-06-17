import { create } from "zustand";
import type { Coordinates } from "@features/incidents/types";

interface MapState {
  placementMode: boolean;
  draft: Coordinates | null;
  createOpen: boolean;
  listOpen: boolean;
  startPlacement: () => void;
  cancelPlacement: () => void;
  pickLocation: (coordinates: Coordinates) => void;
  closeCreate: () => void;
  toggleList: () => void;
}

export const useMapStore = create<MapState>((set) => ({
  placementMode: false,
  draft: null,
  createOpen: false,
  listOpen: true,
  startPlacement: () => set({ placementMode: true, listOpen: false }),
  cancelPlacement: () => set({ placementMode: false, draft: null }),
  pickLocation: (coordinates) =>
    set({ draft: coordinates, createOpen: true, placementMode: false }),
  closeCreate: () => set({ createOpen: false, draft: null }),
  toggleList: () => set((state) => ({ listOpen: !state.listOpen })),
}));
