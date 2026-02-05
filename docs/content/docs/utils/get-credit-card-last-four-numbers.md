## Usage
```ts
const cardNumber = '4242424242424242'

const lastFour = getCreditCardLastFourNumbers(cardNumber)

console.log(lastFour)
// Output: "4242"
```

## Type definition
```ts
/**
 * Extracts the last four digits from a given credit card number.
 *
 * @param pan - The full credit card number (PAN).
 * @returns The last four digits of the card number, or an empty string if the input is invalid.
 */
export declare const getCreditCardLastFourNumbers: (pan: string) => string
```