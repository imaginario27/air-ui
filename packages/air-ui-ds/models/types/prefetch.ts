export type PrefetchOnStrategy =
  | PrefetchOn
  | {
      visibility?: boolean
      interaction?: boolean
    }

export type PrefetchOnOptions = Exclude<PrefetchOnStrategy, PrefetchOn>