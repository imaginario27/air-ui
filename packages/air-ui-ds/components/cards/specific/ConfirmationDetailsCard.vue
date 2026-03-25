<template>
    <Card 
        :hasShadow="false"
        :class="[
            'bg-background-neutral-subtlest'
        ]"
    >
        <CardBody>
            <div 
                :class="[
                    'flex', 
                    'gap-1', 
                    'w-full', 
                    'text-sm',
                    alignClass
                ]"
            >
                <span :class="scopeClass">
                    {{ scope }}
                </span>

                <Icon
                    :name="separatorIcon"
                    :iconClass="['text-icon-neutral-subtler', iconClass ?? '']"
                />

                <span 
                    :class="[
                    'font-bold', 
                    'text-sm',
                    titleClass
                ]">
                    {{ title }}
                </span>
            </div>
        </CardBody>
    </Card>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    scope: {
        type: String as PropType<string>,
        default: 'Scope',
    },
    title: {
        type: String as PropType<string>,
        default: 'Title',
    },
    separatorIcon: {
        type: String as PropType<string>,
        default: 'mdi:chevron-right',
    },
    alignement: {
        type: String as PropType<Align>,
        default: Align.LEFT,
    },
    scopeClass: String as PropType<string>,
    iconClass: String as PropType<string>,
    titleClass: String as PropType<string>,
})

// Computed classes
const alignClass = computed(() => {
    const variant: Record<Align, string> = {
        [Align.LEFT]: "justify-start",
        [Align.CENTER]: "justify-center",
        [Align.RIGHT]: "justify-end",
    }

    return variant[props.alignement as Align] || "justify-start"
})
</script>