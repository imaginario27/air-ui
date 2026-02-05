## Usage
```ts
const title = 'Hello World! Vue 3 + Nuxt 3 Guide 🚀'

const slug = convertStringIntoSlugFormat(title)

console.log(slug)
// Output: "hello-world-vue-3-nuxt-3-guide"
```

## Type definition
```ts
/**
 * Converts a string into a slug format.
 * - Converts to lowercase
 * - Removes special characters
 * - Replaces spaces with hyphens
 *
 * @param text - The input string to slugify.
 * @returns The slugified string.
 */
export declare const convertStringIntoSlugFormat: (text: string) => string
```