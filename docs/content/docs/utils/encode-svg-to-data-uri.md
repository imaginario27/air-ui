## Usage
```ts
const rawSvg = `<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="red"/></svg>`

const encoded = encodeSvgToDataURI(rawSvg)

// Result:
// data:image/svg+xml;charset=utf8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2240%22%20fill%3D%22red%22/%3E%3C/svg%3E
```

## Type definition
```ts
/**
 * Encodes an SVG string to a Data URI.
 *
 * @param svg - The SVG string.
 * @returns The encoded Data URI.
 */
export declare const encodeSvgToDataURI: (svg: string) => string
```