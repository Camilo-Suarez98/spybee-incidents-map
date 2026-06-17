import type { Locale } from "../config";
import { es } from "./es";
import { en } from "./en";

// `es` is the source of truth for the dictionary shape; `en` must match it.
export type Dictionary = typeof es;

export const dictionaries: Record<Locale, Dictionary> = { es, en };
