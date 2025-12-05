import { AppNotification } from "../models/constants/notifications"

/**
 * A composable to handle clicks outside a specified element.
 *
 * @param elementRef - A reference to the target DOM element.
 * @param callback - A function to call when a click outside the element is detected.
 */
export const useClickOutside = (
    elementRef: Ref<HTMLElement | null>, 
    callback: () => void
): void => {
    const handleClick = (event: MouseEvent): void => {
        const element = elementRef.value

        if (!(element instanceof HTMLElement)) return

        if (!element.contains(event.target as Node)) {
            callback()
        }
    }

    watchEffect((cleanup) => {
        document.addEventListener('mousedown', handleClick) 

        cleanup(() => {
            document.removeEventListener('mousedown', handleClick) 
        })
    })
}


/**
 * Copies text to the clipboard and shows success or error notifications.
 * @param text - The text to copy to the clipboard.
 * @param successMessage - The success message to display.
 * @param errorMessage - The error message to display.
 */
export const copyToClipboard = async (
    text: string, 
    successMessage: string = 'Copied to clipboard', 
    errorMessage: string = 'Failed to copy to clipboard'
): Promise<void> => {
    if (!text) return

    const { $toast } = useNuxtApp()

    try {
        await navigator.clipboard.writeText(text)
        $toast.success(successMessage, { toastId: 'clipboard-success' })
    } catch {
        $toast.error(errorMessage, { toastId: 'clipboard-error' })
    }
}


/**
 * Opens the default email app with the given email address pre-filled.
 * @param email - The email address to open in the default email client.
 */
export const openEmailApp = (email: string): void => {
    if (!email) return
    window.location.href = `mailto:${email}`
}