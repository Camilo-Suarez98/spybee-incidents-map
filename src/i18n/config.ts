export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

export const LOCALE_LABELS: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

// BCP-47 tags used for Intl date/number formatting per locale.
export const INTL_LOCALE: Record<Locale, string> = {
  es: "es-CO",
  en: "en-US",
};
