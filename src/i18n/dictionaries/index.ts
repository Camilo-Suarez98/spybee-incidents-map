import type { Locale } from "../config";
import { es } from "./es";
import { en } from "./en";

export type Dictionary = typeof es;

export const dictionaries: Record<Locale, Dictionary> = { es, en };
