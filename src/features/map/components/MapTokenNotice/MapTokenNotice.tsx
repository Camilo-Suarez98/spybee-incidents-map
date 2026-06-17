"use client";

import { MapIcon } from "@/components/ui/icons";
import { useT } from "@/i18n";
import styles from "./MapTokenNotice.module.scss";

export function MapTokenNotice() {
  const t = useT();
  return (
    <div className={styles.notice}>
      <div className={styles.card}>
        <span className={styles.icon}>
          <MapIcon />
        </span>
        <h2>{t.mapToken.title}</h2>
        <p>
          {t.mapToken.textBefore}
          <code>.env.local</code>
          {t.mapToken.textAfter}
        </p>
        <pre className={styles.code}>NEXT_PUBLIC_MAPBOX_TOKEN=tu_token_aqui</pre>
        <p className={styles.hint}>{t.mapToken.hint}</p>
      </div>
    </div>
  );
}
