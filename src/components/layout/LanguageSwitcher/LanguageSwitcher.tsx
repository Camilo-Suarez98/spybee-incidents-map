"use client";

import { GlobeIcon } from "@/components/ui/icons";
import { useLocaleStore, useT, LOCALES } from "@/i18n";
import styles from "./LanguageSwitcher.module.scss";

export function LanguageSwitcher() {
  const t = useT();
  const locale = useLocaleStore((state) => state.locale);
  const setLocale = useLocaleStore((state) => state.setLocale);

  return (
    <div
      className={styles.switcher}
      role="group"
      aria-label={t.userMenu.language}
    >
      <GlobeIcon width={16} height={16} className={styles.globe} />
      {LOCALES.map((value) => (
        <button
          key={value}
          type="button"
          className={`${styles.option} ${
            locale === value ? styles.active : ""
          }`}
          onClick={() => setLocale(value)}
          aria-pressed={locale === value}
          title={`${t.userMenu.language}: ${value.toUpperCase()}`}
        >
          {value.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
