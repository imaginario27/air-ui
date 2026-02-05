## Usage
```ts
console.log(getUserDisplayName('Alan', 'Turing'))
// Output: "Alan Turing"

console.log(getUserDisplayName('Marie', 'Curie Skłodowska'))
// Output: "Marie Curie"

console.log(getUserDisplayName())
// Output: "Test User"
```

## Type definition
```ts
/**
 * Generates a display name using the first name and only the first last name.
 * Returns 'Test User' if either parameter is null or undefined.
 *
 * @param firstName - The user's first name.
 * @param lastNames - The user's full last names (may contain multiple words).
 * @returns The formatted display name or 'Test User' if inputs are missing.
 */
export declare const getUserDisplayName: (
    firstName?: string | null,
    lastNames?: string | null,
) => string
```