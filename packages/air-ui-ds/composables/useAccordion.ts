export const useAccordion = () => {
    const isOpen = ref(false)

    const toggle = () => {
        isOpen.value = !isOpen.value
    }

    return {
        isOpen,
        toggle
    }
}
