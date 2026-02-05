## Usage
```ts
// ISO string input
const formatted1 = formatLocalizedDateTime('2025-09-20T10:15:22', 'en')
// → "September 20, 2025 (10:15:22)"

// Timestamp input without time
const formatted2 = formatLocalizedDateTime(1761724212863, 'en', false)
// → "October 29, 2025"

// French format with time
const formatted3 = formatLocalizedDateTime('2026-01-01T08:30:00', 'fr')
// → "1 janvier 2026 (08:30:00)"
```

## Type definition
```ts
/**
 * Formats a date (ISO string or timestamp) into a localized full date with optional time.
 *
 * @param dateInput - ISO date string or timestamp
 * @param locale - The locale code (e.g. 'en', 'es', 'fr', 'de')
 * @param showTime - Whether to include the time in the output
 * @returns Formatted localized date string
 */
export declare function formatLocalizedDateTime(
    dateInput: string | number,
    locale?: string,
    showTime?: boolean,
): string
```