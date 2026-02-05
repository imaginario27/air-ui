## Usage
```ts
const items = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
    { id: '4', name: 'Item 4' },
]

getStackCounterContent(items, StackCounterType.COUNTER, 5) // "+4"
getStackCounterContent(items, StackCounterType.ELLIPSIS, 3) // "..."
```

## Type definition
```ts
/**
 * Returns a counter string based on the number of items, display type, and limit.
 *
 * @param items - Array of items to evaluate
 * @param counterType - Either 'COUNTER' or 'ELLIPSIS'
 * @param itemsLimit - Optional limit before counter is shown
 * @returns A string like "+3" or "..." depending on the counter type and excess items
 */
declare function getStackCounterContent(
    items: unknown[],
    counterType: StackCounterType,
    itemsLimit?: number | null,
): string
```

## counterType options
::options-table
---
options: [
    {
        "value": "COUNTER",
        "description": "Displays the number of additional items as a numeric counter",
    },
    {
        "value": "ELLIPSIS",
        "description": "Displays an ellipsis (...) to indicate more items",
    },
]
---
::