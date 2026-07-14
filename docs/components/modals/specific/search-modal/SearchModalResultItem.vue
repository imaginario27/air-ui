<template>
    <div 
        :class="[ 
            'py-4',
            'px-6',
            'border border-border-neutral-subtle',
            'flex gap-3 justify-between items-center',
            'cursor-pointer',
            'hover:bg-background-neutral-hover',
        ]"
        @click="handleClick"
    >
        <div class="flex flex-col gap-2 w-full">
            <Badge 
                :text="badgeText" 
                :color="badgeColor" 
                :style="badgeStyle"
            />
            <span v-if="breadcrumbs" class="text-sm text-text-neutral-subtle">
                {{ breadcrumbs }}
            </span>
            <h3 class="text-base font-semibold">
                {{ text }}
            </h3>
        </div>
        <ActionIconButton 
            icon="mdi:chevron-right"
            :size="ButtonSize.LG"
            :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
            @click.stop="handleClick"
        />
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    text: {
        type: String as PropType<string>,
        default: 'Result text',
    },
    breadcrumbs: String as PropType<string>,
    badgeText: {
        type: String as PropType<string>,
        default: 'Section title / Page title',
    },
    badgeColor: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.NEUTRAL,
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
    badgeStyle: {
        type: String as PropType<BadgeStyle>,
        default: BadgeStyle.FLAT,
        validator: (value: BadgeStyle) => Object.values(BadgeStyle).includes(value),
    },
    to: String as PropType<string>,
})

// Emits
const emit = defineEmits(['item-clicked'])

// Handlers
const handleClick = () => {
    // Emit the item data to the parent, which handles navigation
    emit('item-clicked', {
        text: props.text,
        breadcrumbs: props.breadcrumbs,
        badgeText: props.badgeText,
        to: props.to,
    })
}
</script>
