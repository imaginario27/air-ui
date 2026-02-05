<template>
    <Alert 
        :type="finalProps.type"
        :icon="finalProps.icon"
        :title="finalProps.title"
        :description="finalProps.description"
        v-bind="finalProps.extraProps"
        class="mb-4"
    />
</template>

<script setup lang="ts">
// Interface for alert props
interface AlertProps {
    type?: AlertType,
    icon?: string,
    title?: string,
    description?: string,
    preset?: string,
    extraProps?: Record<string, unknown>,
}

// Define props using a single "props" object
const { props } = defineProps({
    props: {
        type: Object as PropType<Partial<AlertProps>>,
        default: () => ({}),
    },
})

// Define custom alert presets
const presets: Record<string, Partial<AlertProps>> = {
    'form-validation': {
        type: AlertType.INFO,
        title: 'Important',
        description: 'Please review the form validation method page for more details on how to implement field validation effectively.',
        extraProps: {
            buttons: [
                {
                    text: 'View form validation',
                    actionType: ButtonActionType.LINK,
                    to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/form#validation`
                },
            ],
        },
    },
}

// Compute final props by merging preset and passed props
const finalProps = computed(() => {
    const presetDefaults = props.preset ? presets[props.preset] || {} : {}

    return {
        ...presetDefaults,
        ...props,
        extraProps: {
            ...(presetDefaults.extraProps || {}),
            ...(props.extraProps || {}),
        },
    }
})
</script>
