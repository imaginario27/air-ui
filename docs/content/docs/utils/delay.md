## Usage
```ts
await delay(1000) // Delays execution for 1 second
```

## Type definition
```ts
/**
 * Delays the execution of a function or operation by a specified amount of time.
 *
 * @param delay - Duration of the delay in milliseconds
 * @returns A Promise that resolves after the specified time
 */
declare function delay(delay: number): Promise<void>
```