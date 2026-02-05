## Usage
```ts
const firstName = 'Ada'
const lastName = 'Lovelace'

const fullName = getFullName(firstName, lastName)

console.log(fullName)
// Output: "Ada Lovelace"
```

## Type definition
```ts
/**
 * Returns the full name by combining first and last names.
 *
 * @param firstName - The first name.
 * @param lastName - The last name.
 * @returns The concatenated full name in the format "FirstName LastName".
 */
export declare const getFullName: (firstName: string, lastName: string) => string
```