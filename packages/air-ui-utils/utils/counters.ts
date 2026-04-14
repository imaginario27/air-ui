import { StackCounterType } from '../../air-ui-ds/models/enums/counters'

/**
 * Returns the counter content for a stack display based on the number of items, counter type, and item limit.
 *
 * @param items - Array of items to evaluate
 * @param counterType - Type of counter display (ellipsis or numeric)
 * @param itemsLimit - Optional maximum number of items before showing a counter
 *
 * @returns A string representing the counter content
 */

export const getStackCounterContent = (
    items: unknown[],
    counterType: StackCounterType,
    itemsLimit?: number | null,
) => {
    const ellipsis = '...'

    if (!items.length && (itemsLimit === null || itemsLimit === undefined) || counterType === StackCounterType.ELLIPSIS) {
        return ellipsis
    }


    if (counterType === StackCounterType.COUNTER) {
        const additionalItems = items.length - (itemsLimit ?? 0)

        return additionalItems > 9 ? '+9' : `+${additionalItems}`
    }

    return ellipsis
}
