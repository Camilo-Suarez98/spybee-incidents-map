import type { IncidentType } from "@features/incidents/types";
import type { Locale } from "./config";
import { dictionaries, type Dictionary } from "./dictionaries";
import { useLocaleStore } from "./store";

export type { Locale } from "./config";
export { LOCALES, LOCALE_LABELS, INTL_LOCALE } from "./config";
export { useLocaleStore, getLocale } from "./store";
export type { Dictionary } from "./dictionaries";
export { dictionaries } from "./dictionaries";

/** Returns the dictionary for the active locale and re-renders on change. */
export function useT(): Dictionary {
  const locale = useLocaleStore((state) => state.locale);
  return dictionaries[locale];
}

/** Active locale, reactive. */
export function useLocale(): Locale {
  return useLocaleStore((state) => state.locale);
}

/** Localized name for an incident type using its built-in translations. */
export function typeName(type: IncidentType, locale: Locale): string {
  return locale === "en" ? type.name_en : type.name;
}
