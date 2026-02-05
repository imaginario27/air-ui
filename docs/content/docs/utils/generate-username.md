## Usage
```ts
import { generateUsername } from '~/utils/generateUsername'

const username = generateUsername('Ada', 'Lovelace')

console.log(username)
// Output: "ada.lovelace1234" (random 4-digit number will vary)
```

## Type definition
```ts
/**
 * Generates a unique username based on the user's first name and last names.
 * The username follows the format: `{firstName}.{lastNames}{randomNumber}`.
 *
 * @param firstName - The user's first name.
 * @param lastNames - The user's last names (can include spaces).
 * @returns A generated username in lowercase with a random 4-digit number.
 */
export declare const generateUsername: (
    firstName: string,
    lastNames: string,
) => string
```