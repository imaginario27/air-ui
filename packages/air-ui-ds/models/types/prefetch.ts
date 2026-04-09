export type PrefetchOnStrategy =
  | PrefetchOn
  | {
      visibility?: boolean
      interaction?: boolean
    }