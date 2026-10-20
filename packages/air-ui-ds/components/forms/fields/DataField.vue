<template>
    <div :class="['flex flex-col', 'w-full', 'gap-2']">
        <!-- Label -->
        <label v-if="label" :for="id" :class="['text-sm', 'font-semibold', 'text-left']">
            {{ label }}
        </label>

        <!-- Help Text (top) -->
        <HelpText v-if="helpTextPosition === Position.TOP" :text="helpText" />

        <template v-if="!$slots.default">
            <template v-if="!isEmpty">
                <div v-if="text" class="flex gap-2 items-center">
                    <p :class="['text-sm']">
                        {{ text }}
                    </p>

                    <ActionIconButton
                        v-if="hasCopyToClipboardButton"
                        icon="mdi:content-copy"
                        :size="ButtonSize.XS"
                        :ariaLabel="copyButtonAriaLabel"
                        @click="handleCopyToClipboard"
                    />
                </div>
            </template>
            <template v-else>
                <p :class="['text-sm text-text-neutral-subtle']">
                    {{ resolvedEmptyText }}
                </p>
            </template>
        </template>

        <!-- Slot for other type of items -->
        <slot />

        <!-- Help Text (bottom) -->
        <HelpText v-if="helpTextPosition === Position.BOTTOM" :text="helpText" />
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    id: {
        type: String as PropType<string>,
        required: true,
    },
    label: String as PropType<string>,
    ariaLabel: String as PropType<string>,
    text: [String, Number] as PropType<string | number>,
    emptyText: String as PropType<string>,
    helpText: String as PropType<string>,
    helpTextPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    hasCopyToClipboardButton: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    copyToClipboardMessage: String as PropType<string>,
    copyToClipboardErrorMessage: String as PropType<string>,
})

// Composables
const dsConfig = useDSConfig()

// Computed
const resolvedEmptyText = computed(() => props.emptyText ?? dsConfig.common.notDefinedText())
const resolvedCopyToClipboardMessage = computed(() => props.copyToClipboardMessage ?? dsConfig.common.copiedText())
const resolvedCopyToClipboardErrorMessage = computed(
    () => props.copyToClipboardErrorMessage ?? dsConfig.common.copyFailedText(),
)

// Computed
const isEmpty = computed(() => {
    return props.text === '' || props.text === null || props.text === undefined || props.text === 0
})

const copyButtonAriaLabel = computed(() => {
    if (props.ariaLabel) {
        return props.ariaLabel
    }

    if (props.label) {
        return `Copy ${props.label}`
    }

    return 'Copy value'
})

// Toast
const { $toast } = useNuxtApp()

// Methods
const handleCopyToClipboard = async () => {
    const success = await copyToClipboard(props.text?.toString() ?? '')

    if (success) {
        $toast.success(resolvedCopyToClipboardMessage.value, { toastId: 'clipboard-success' })
    } else {
        $toast.error(resolvedCopyToClipboardErrorMessage.value, { toastId: 'clipboard-error' })
    }
}
</script>
