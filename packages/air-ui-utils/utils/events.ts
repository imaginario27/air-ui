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
 * Copies text to the clipboard.
 * @param text - The text to copy.
 * @returns A promise that resolves to true if successful, false otherwise.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
    if (!text) return false

    try {
        await navigator.clipboard.writeText(text)
        return true
    } catch {
        return false
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