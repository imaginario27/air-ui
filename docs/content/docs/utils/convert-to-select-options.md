## Usage
```ts
const users = [
    { id: 1, name: 'Alice', avatar: 'alice.png' },
    { id: 2, name: 'Bob', avatar: 'bob.png' },
]

const options = convertToSelectOptions(users, (user) => ({
    value: user.id,
    text: user.name,
    userProfileImg: user.avatar,
}))

```

## Type definition
```ts
/**
 * Converts an array of items into an array of SelectOption objects.
 *
 * @template T - The source item type.
 * @param items - The array of items to convert.
 * @param mapFn - A mapping function that transforms each item into a SelectOption.
 * @returns An array of SelectOption objects.
 */
export declare function convertToSelectOptions<T>(
    items: T[],
    mapFn: (item: T) => SelectOption,
): SelectOption[]
```

#### TypeScript interface
```ts
interface SelectOption {
    id?: string | number
    value: string | number
    sectionTitle?: boolean
    text?: string
    icon?: string
    userDisplayName?: string
    userProfileImg?: string
    imgUrl?: string
    alt?: string
    helpText?: string
    to?: string
    isExternal?: boolean
}
```