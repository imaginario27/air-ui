/**
 * Creates a delay for a specified number of milliseconds.
 *
 * @param {number} ms - The duration of the delay in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 *
 * @example
 * ```ts
 * await delay(2000) // Delays execution for 2 seconds
 * ```
 */
export const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Returns a paginated subset of an array.
 *
 * @template T - The type of items in the array.
 * @param {T[]} data - The full array of data items.
 * @param {number} currentPage - The current page number (1-based).
 * @param {number} itemsPerPage - The number of items per page.
 * @param {number} [itemsLimit] - Optional maximum number of items to consider before pagination.
 * @returns {T[]} The paginated array of items.
 */
export function getPaginatedData<T>(
    data: T[],
    currentPage: number,
    itemsPerPage: number,
    itemsLimit?: number
): T[] {
    let result = data

    // Apply items limit if provided
    if (itemsLimit !== undefined && itemsLimit !== null) {
        result = result.slice(0, itemsLimit)
    }

    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage

    return result.slice(start, end)
}


/**
 * Converts an array of objects into SelectOption[] by mapping specified keys or transformation functions.
 *
 * @param originArray - The array of items to convert.
 * @param keyMap - A partial map where each key is a SelectOption field ('text', 'value', etc.)
 *                 and the value is either a string key to pick from the item, or a function that returns the desired value.
 *
 * @example
 * convertToSelectOptions(users, {
 *   text: user => capitalize(user.name),
 *   value: user => slugify(user.name),
 * })
 */
export const convertToSelectOptions = <T extends Record<string, any>>(
    originArray: T[],
    keyMap: Partial<Record<keyof SelectOption, keyof T | ((item: T) => any)>>
): SelectOption[] => {
    if (!Array.isArray(originArray)) {
        return []
    }

    return originArray
        .map((item) => {
            const option: Partial<SelectOption> = {}

            for (const [rawKey, source] of Object.entries(keyMap) as [
                keyof SelectOption,
                keyof T | ((item: T) => any)
            ][]) {
                const value =
                    typeof source === 'function'
                        ? source(item)
                        : item[source]

                if (value !== undefined) {
                    // Prevents error by casting to indexable object
                    ;(option as Record<keyof SelectOption, unknown>)[rawKey] = value
                }
            }

            // Require at least a `value` and one of `text` or `userDisplayName`
            if (option.value === undefined) {
                return null
            }

            if (!option.text && !option.userDisplayName) {
                return null
            }

            return option as SelectOption
        })
        .filter(Boolean) as SelectOption[]
}

