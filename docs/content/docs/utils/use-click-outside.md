## Usage
```ts
const dropdownRef = ref<HTMLElement | null>(null)

useClickOutside(dropdownRef, () => {
    isOpen.value = false
})
```

## Type definition
```ts
/**
 * A composable to handle clicks outside a specified element.
 *
 * @param elementRef - A ref to the target DOM element.
 * @param callback - Function triggered when clicking outside the element.
 */
export declare const useClickOutside: (
    elementRef: Ref<HTMLElement | null>,
    callback: () => void,
) => void
```