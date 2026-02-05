## Usage
```ts
const password = 'Str0ngPass!'

const result = isSecurePassword(password)

console.log(`Is "${password}" secure?`, result)
// Output: Is "Str0ngPass!" secure? true
```

## Type definition
```ts
/**
 * Checks if all secure password conditions are fulfilled.
 *
 * @param password - The password string to validate.
 * @returns `true` if all conditions are met, otherwise `false`.
 */
export declare const isSecurePassword: (password: string) => boolean
```