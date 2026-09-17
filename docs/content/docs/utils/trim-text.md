## Usage
```ts
const article =
    'This is a long paragraph that needs to be truncated if it goes beyond a certain length.'

const shortPreview = trimText(article, 50)
// Output: "This is a long paragraph that needs to be trunc..."

const previewWithLink = trimText(article, 50, 'Continue reading', '/full-article')
// Output: 'This is a long paragraph that needs to be trunc... <a href="/full-article" ...>(Continue reading)</a>'

const isExpanded = ref(false)
const togglePreview = computed(() =>
    trimText(article, 50, 'Continue reading', undefined, 'toggle', isExpanded.value)
)
// isExpanded false → "This is a long paragraph that needs to be trunc..."
// isExpanded true  → "This is a long paragraph that needs to be truncated if it goes beyond a certain length."

console.log(shortPreview)
console.log(previewWithLink)
console.log(togglePreview.value)
```

`readMoreType` defaults to `'link'`, so existing calls that only pass `readMoreText`/`readMoreLink` keep working unchanged. Switch it to `'toggle'` to have the function return either the trimmed or the full text based on an `isExpanded` state you own (e.g. a ref bound to a "Read more"/"Show less" button) instead of appending a navigable link.

## Type definition
```ts
/**
 * Trims a string to the specified maximum length and appends "..." if it exceeds the limit.
 * In `link` mode (default), appends a "Read more" link when `readMoreLink` is provided.
 * In `toggle` mode, `isExpanded` controls whether the full text or the trimmed text is returned,
 * letting a caller-owned state (e.g. a ref bound to a "Read more"/"Show less" button) drive the output.
 *
 * @param inputString - The text string to be trimmed.
 * @param maxLength - The maximum allowed length of the string.
 * @param readMoreText - Optional text for the "Read more" link (default: "Read more"). Link mode only.
 * @param readMoreLink - Optional URL for the "Read more" link. If omitted, only "..." is appended. Link mode only.
 * @param readMoreType - Whether truncation is resolved via a link or via caller-driven `isExpanded` state (default: "link").
 * @param isExpanded - In toggle mode, returns the full text when `true` (default: false). Ignored in link mode.
 * @returns The trimmed string, the full string (when expanded), or a string with a "Read more" link appended.
 * @throws If `inputString` is not a string.
 * @throws If `maxLength` is not a number or negative.
 */
export declare const trimText: (
    inputString: string,
    maxLength: number,
    readMoreText?: string,
    readMoreLink?: string,
    readMoreType?: 'link' | 'toggle',
    isExpanded?: boolean,
) => string

```