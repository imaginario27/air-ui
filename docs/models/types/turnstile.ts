import type { Ref } from 'vue'

export type TurnstileTheme = 'auto' | 'light' | 'dark'
export type TurnstileSize = 'normal' | 'compact' | 'flexible'
export type TurnstileAppearance = 'always' | 'execute' | 'interaction-only'

export type TurnstileApi = {
    render: (element: HTMLElement, options: {
        sitekey: string
        theme?: TurnstileTheme
        size?: TurnstileSize
        appearance?: TurnstileAppearance
        callback: (token: string) => void
        'expired-callback': () => void
        'error-callback': () => void
    }) => string
    reset: (widgetId: string) => void
}

export type UseTurnstileOptions = {
    siteKey: string | Ref<string>
    theme?: TurnstileTheme
    size?: TurnstileSize
    appearance?: TurnstileAppearance
}