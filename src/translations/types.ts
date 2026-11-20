import type { en } from './en';

/** Recursively widen string literals so other languages can supply their own text. */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : { [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof en>;
export type Lang = 'en' | 'es';
export const LANGS: readonly Lang[] = ['en', 'es'];
