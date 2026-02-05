## Usage
```ts
const copied = await copyToClipboard('Hello, world!')

if (copied) {
    console.log('Copied to clipboard!')
} else {
    console.warn('Failed to copy.')
}
```

## Type definition
```ts
/**
 * Copies text to the clipboard.
 *
 * @param text - The text to copy.
 * @returns A Promise that resolves to true if successful, or false if the operation fails.
 */
export declare const copyToClipboard: (text: string) => Promise<boolean>
```