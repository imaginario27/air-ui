## Usage
```ts
const article =
    'This is a long paragraph that needs to be truncated if it goes beyond a certain length.'

const shortPreview = trimText(article, 50)
// Output: "This is a long paragraph that needs to be trunc..."

const previewWithLink = trimText(article, 50, 'Continue reading', '/full-article')
// Output: 'This is a long paragraph that needs to be trunc... <a href="/full-article" ...>(Continue reading)</a>'

console.log(shortPreview)
console.log(previewWithLink)
```

## Type definition
```ts
/**
 * Trims a string to the specified maximum length and appends "..." if it exceeds the limit.
 * Optionally, appends a "Read more" link if `readMoreLink` is provided.
 *
 * @param inputString - The text string to be trimmed.
 * @param maxLength - The maximum allowed length of the string.
 * @param readMoreText - Optional text for the "Read more" link (default: "Read more").
 * @param readMoreLink - Optional URL for the "Read more" link. If omitted, only "..." is appended.
 * @returns The trimmed string, with "..." or a "Read more" link if truncated.
 * @throws If `inputString` is not a string.
 * @throws If `maxLength` is not a number or negative.
 */
export declare const trimText: (
    inputString: string,
    maxLength: number,
    readMoreText?: string,
    readMoreLink?: string,
) => string

```