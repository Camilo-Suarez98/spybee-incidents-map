"use client";

import { useEffect } from "react";
import { useLocaleStore } from "./store";

/** Keeps <html lang> in sync with the active locale (client-side). */
export function LocaleHtmlSync() {
  const locale = useLocaleStore((state) => state.locale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
