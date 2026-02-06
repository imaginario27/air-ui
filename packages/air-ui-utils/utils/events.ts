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