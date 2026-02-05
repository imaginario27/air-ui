## Usage
```ts
const result = evaluateSecurePasswordConditions('Example123!')
console.log(result.hasMixedCase) // Result: true
```

## Type definition
```ts
/**
 * Result of password security evaluation.
 */


/**
 * Evaluates secure password conditions.
 *
 * @param password - The password string to evaluate.
 * @returns An object indicating whether each condition is satisfied.
 */
export const evaluateSecurePasswordConditions = (
    password: string,
): SecurePasswordConditions => {
    return {
        isLongEnough: password.length >= 12,
        hasMixedCase: /[a-z]/.test(password) && /[A-Z]/.test(password),
        hasNumbersAndSpecialChars: /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password),
    }
}
```

## TypeScript interface
```ts
export interface SecurePasswordConditions {
    isLongEnough: boolean,
    hasMixedCase: boolean,
    hasNumbersAndSpecialChars: boolean,
}
```