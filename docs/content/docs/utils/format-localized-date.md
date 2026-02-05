## Usage
```ts
// Plain YYYY-MM-DD (safe from timezone shifts)
const dateEn = formatLocalizedDate('2025-09-24', 'en')
// → "September 24, 2025"

// Spanish locale
const dateEs = formatLocalizedDate('2025-09-24', 'es')
// → "24 de septiembre de 2025"

// Full ISO string (UTC-safe output)
const dateFr = formatLocalizedDate('2025-09-24T00:00:00Z', 'fr')
// → "24 septembre 2025"

// Invalid input
const invalid = formatLocalizedDate('')
// → ""
```

## Type definition
```ts
/**
 * Formats a date string (YYYY-MM-DD or ISO 8601) into a localized full date.
 *
 * @param dateString - Date in `YYYY-MM-DD` or ISO 8601 format
 * @param locale - Locale code (e.g. 'en', 'es', 'fr'). Defaults to 'en'
 * @returns Localized date string or empty string if invalid
 */
export declare const formatLocalizedDate: (
    dateString: string,
    locale?: string,
) => string
```