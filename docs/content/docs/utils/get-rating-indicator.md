## Usage
```ts
const rating = 3.5
const icons = getRatingIndicator(rating)

console.log(icons)
// Output: ['mdi:star', 'mdi:star', 'mdi:star', 'mdi:star-half-full', 'mdi:star-outline']
```

## Type definition
```ts
/**
 * Returns an array of MDI icon names representing an indicator rating.
 *
 * @param value - A number from 0 to 5 (can include 0.5 steps). Will be clamped between 0 and 5.
 * @param emptyIndicator - Icon name used for empty indicators (default: 'mdi:star-outline').
 * @param halfIndicator - Icon name used for half indicators (default: 'mdi:star-half-full').
 * @param fullIndicator - Icon name used for full indicators (default: 'mdi:star').
 * @returns An array of 5 icon strings representing full, half, or empty indicator.
 */
export declare const getRatingIndicator: (
    value: number,
    emptyIndicator?: string,
    halfIndicator?: string,
    fullIndicator?: string,
) => string[]
```