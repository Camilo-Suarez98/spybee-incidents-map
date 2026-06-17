"use client";

import { Button } from "@/components/ui/Button";
import { PlusIcon, LayersIcon, PinIcon, CloseIcon } from "@/components/ui/icons";
import { PRIORITY_META, PRIORITY_ORDER } from "@features/incidents/constants";
import { useIncidentsStore } from "@features/incidents/store";
import { useMapStore } from "@features/map/store";
import { useT } from "@/i18n";
import styles from "./MapToolbar.module.scss";

export function MapToolbar() {
  const t = useT();
  const listOpen = useMapStore((state) => state.listOpen);
  const toggleList = useMapStore((state) => state.toggleList);
  const placementMode = useMapStore((state) => state.placementMode);
  const startPlacement = useMapStore((state) => state.startPlacement);
  const cancelPlacement = useMapStore((state) => state.cancelPlacement);

  const total = useIncidentsStore((state) => state.incidents.length);

  return (
    <>
      <div className={styles.topLeft}>
        {!listOpen && (
          <Button variant="secondary" size="sm" leadingIcon={<LayersIcon />} onClick={toggleList}>
            {t.mapToolbar.viewDetails}
          </Button>
        )}
      </div>

      <div className={styles.topRight}>
        <Button
          leadingIcon={<PlusIcon />}
          onClick={startPlacement}
          disabled={placementMode}
        >
          {t.mapToolbar.createIncident}
        </Button>
      </div>

      {placementMode && (
        <div className={styles.hint}>
          <span className={styles.hintIcon}>
            <PinIcon width={18} height={18} />
          </span>
          <span>{t.mapToolbar.placementHint}</span>
          <button type="button" className={styles.hintClose} onClick={cancelPlacement}>
            <CloseIcon width={16} height={16} />
          </button>
        </div>
      )}

      <div className={styles.legend}>
        <span className={styles.legendTitle}>{t.mapToolbar.legendCount(total)}</span>
        <div className={styles.legendItems}>
          {PRIORITY_ORDER.map((priority) => (
            <span key={priority} className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ background: PRIORITY_META[priority].color }}
              />
              {t.priority[priority]}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
