## Usage
```ts
import { getInitials } from '~/utils/getInitials'

console.log(getInitials('Jane Doe'))      // Output: "JD"
console.log(getInitials('Alan'))          // Output: "A"
console.log(getInitials(''))              // Output: "TU"
console.log(getInitials('   '))           // Output: "TU"
console.log(getInitials('grace hopper'))  // Output: "GH"
```

## Type definition
```ts
/**
 * Extracts the initials from a given input.
 *
 * - If the name is empty or invalid, returns "TU" by default.
 * - Takes the first character of up to two words to form the initials.
 *
 * @param input - The input string to generate initials from.
 * @returns A string with the initials in uppercase (e.g., "John Doe" → "JD").
 */
export declare const getInitials: (input: string) => string
```