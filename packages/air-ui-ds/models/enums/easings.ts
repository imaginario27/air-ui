export enum Easing {
    SMOOTH = 'smooth',
    EASE = 'ease',
    EASE_IN = 'ease-in',
    EASE_OUT = 'ease-out',
    EASE_IN_OUT = 'ease-in-out',
    LINEAR = 'linear',
    BOUNCE = 'bounce',
}

// CSS timing function for each easing
export const EASING_VALUES: Record<Easing, string> = {
    [Easing.SMOOTH]: 'cubic-bezier(0.22, 1, 0.36, 1)',
    [Easing.EASE]: 'ease',
    [Easing.EASE_IN]: 'ease-in',
    [Easing.EASE_OUT]: 'ease-out',
    [Easing.EASE_IN_OUT]: 'ease-in-out',
    [Easing.LINEAR]: 'linear',
    [Easing.BOUNCE]: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
}
