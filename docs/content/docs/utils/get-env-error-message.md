## Usage
```ts
const message = getEnvErrorMessage(
    new Error('Database connection failed'),
    'Something went wrong. Please try again later.'
)

// In dev: "Database connection failed"
// In prod: "Something went wrong. Please try again later."
```

## Type definition
```ts
/**
 * Returns an error message depending on the environment.
 *
 * @param devErrorMessage - Error message shown in development mode
 * (can be a string or an Error instance).
 * @param prodErrorMessage - Error message shown in production mode
 * (user-friendly, localized string).
 * @returns A string with the appropriate message based on environment.
 */
export declare const getEnvErrorMessage: (
    devErrorMessage: string | Error,
    prodErrorMessage: string,
) => string
```