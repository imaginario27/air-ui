## Usage
```ts
// Default locale ('en-GB')
const value1 = formatNumberWithThousands(1234567)
// -> "1,234,567"

// US locale
const value2 = formatNumberWithThousands(1234567.89, 'en-US')
// -> "1,234,567.89"

// German locale
const value3 = formatNumberWithThousands(1234.56, 'de-DE')
// -> "1.234,56"

// Invalid number
const invalid = formatNumberWithThousands(Number.NaN)
// -> "Not a valid number"
```

## Type definition
```ts
/**
 * Formats a number into a string with thousands separators using Intl locale rules.
 *
 * @param value - Number to format
 * @param locale - Optional locale (default: 'en-GB')
 * @returns Formatted string with thousands separators
 */
export declare const formatNumberWithThousands: (
    value: number,
    locale?: string,
) => string
```
