## Usage
```ts
const newPassword = generateSecurePassword(16)

console.log('Generated Password:', newPassword)
// Output: something like "a8X!K#f7zV2@dQ1b"
```

## Type definition
```ts
/**
 * Generates a secure password that meets specified security requirements.
 *
 * @param length - The desired length of the password (default is 12 characters).
 * @returns A randomly generated, secure password string.
 *
 * The generated password will:
 * 1. Be at least 12 characters long (or the specified length).
 * 2. Include at least one lowercase letter, one uppercase letter, one number, and one special character.
 * 3. Be shuffled to prevent predictable patterns.
 */
export declare const generateSecurePassword: (length?: number) => string
```