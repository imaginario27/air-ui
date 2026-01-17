/**
 * Returns an array of MDI icon names representing a indicator rating.
 *
 * @param value - A number from 0 to 5 (can include 0.5 steps). Will be clamped between 0 and 5.
 * @returns An array of 5 icon strings representing full, half, or empty indicator.
 *
 */
export const getRatingIndicator = (
    value: number,
    emptyIndicator: string = 'mdi:star-outline',
    halfIndicator: string = 'mdi:star-half-full',
    fullIndicator: string = 'mdi:star'
): string[] => {
    const clamped = Math.min(5, Math.max(0, Math.round(value * 2) / 2))
    const icons: string[] = []
    let remaining = clamped

    for (let i = 0; i < 5; i++) {
        if (remaining >= 1) {
            icons.push(fullIndicator)
        } else if (remaining >= 0.5) {
            icons.push(halfIndicator)
        } else {
            icons.push(emptyIndicator)
        }
        remaining -= 1
    }

    return icons
}

