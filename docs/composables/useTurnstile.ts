import type {
    TurnstileApi,
    UseTurnstileOptions,
} from '@/models/types/turnstile'

let turnstileScriptPromise: Promise<void> | null = null

const getTurnstileApi = () => (globalThis as unknown as { turnstile?: TurnstileApi }).turnstile

const loadTurnstileScript = async () => {
    if (!import.meta.client) {
        return
    }

    if (getTurnstileApi()) {
        return
    }

    if (turnstileScriptPromise !== null) {
        return turnstileScriptPromise
    }

    turnstileScriptPromise = new Promise((resolve, reject) => {
        const existingScript = document.querySelector<HTMLScriptElement>('script[data-turnstile-script="true"]')

        if (existingScript) {
            existingScript.addEventListener('load', () => resolve(), { once: true })
            existingScript.addEventListener('error', () => reject(new Error('Failed to load Turnstile script')), { once: true })
            return
        }

        const script = document.createElement('script')
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
        script.async = true
        script.defer = true
        script.dataset.turnstileScript = 'true'
        script.addEventListener('load', () => resolve(), { once: true })
        script.addEventListener('error', () => reject(new Error('Failed to load Turnstile script')), { once: true })
        document.head.appendChild(script)
    })

    return turnstileScriptPromise
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const ensureTurnstileLoaded = async () => {
    await loadTurnstileScript()

    for (let i = 0; i < 10; i += 1) {
        const api = getTurnstileApi()

        if (api) {
            return api
        }

        await wait(150)
    }

    return null
}

export const useTurnstile = (options: UseTurnstileOptions) => {
    const turnstileToken = ref('')
    const turnstileError = ref('')
    const turnstileWidgetId = ref<string | null>(null)

    const turnstileSiteKey = computed(() => unref(options.siteKey) || '')
    const turnstileEnabled = computed(() => Boolean(turnstileSiteKey.value))

    const clearTurnstileState = () => {
        turnstileToken.value = ''
        turnstileError.value = ''
    }

    const renderTurnstile = async (container: HTMLElement | null) => {
        if (!import.meta.client || !turnstileEnabled.value || !container) {
            return
        }

        await nextTick()

        const maybeTurnstile = await ensureTurnstileLoaded()

        if (!maybeTurnstile) {
            turnstileError.value = 'Captcha is loading. Please wait a second and try again.'
            return
        }

        turnstileError.value = ''

        if (turnstileWidgetId.value) {
            maybeTurnstile.reset(turnstileWidgetId.value)
            return
        }

        turnstileWidgetId.value = maybeTurnstile.render(container, {
            sitekey: turnstileSiteKey.value,
            theme: options.theme || 'auto',
            size: options.size || 'normal',
            appearance: options.appearance || 'always',
            callback: (token: string) => {
                turnstileToken.value = token
                turnstileError.value = ''
            },
            'expired-callback': () => {
                turnstileToken.value = ''
                turnstileError.value = 'Captcha expired. Please verify again.'
            },
            'error-callback': () => {
                turnstileToken.value = ''
                turnstileError.value = 'Captcha failed. Please try again.'
            },
        })
    }

    return {
        turnstileEnabled,
        turnstileToken,
        turnstileError,
        renderTurnstile,
        clearTurnstileState,
    }
}