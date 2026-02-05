## Usage
```ts
const raw = 'H3llø Wørld! 123 @#$'
const filtered = filterAlphabetic(raw)
// → "Hllø Wørld"
```

## Type definition
```ts
/**
 * Filters out non-alphabetic characters from a given string.
 *
 * @param value - The input string to be filtered.
 * @returns The filtered string containing only alphabetic characters and spaces.
 */
export declare const filterAlphabetic: (value: string) => string
```