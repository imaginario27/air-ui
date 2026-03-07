<template>
    <li 
        :class="[
            'hover:text-text-primary-brand-hover',
            'cursor-pointer',
            'font-medium text-text-neutral-subtle',
        ]"
    >
        <component
            :is="props.actionType === ListItemActionType.LINK ? NuxtLink : 'span'"
            :to="props.link"
            :external="props.isExternal"
            class="flex gap-2"
            @click="handleClick"
        >
            <Icon 
                v-if="icon"
                :name="icon"
            />

            <span>
                {{ text }}
            </span>
        </component>
    </li>
</template>
<script setup lang="ts">
// Imports
import { NuxtLink } from '#components'

// Props
const props = defineProps({
    text: {
        type: String as PropType<string>,
        required: true,
    },
    link: String as PropType<string>,
    isExternal: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    icon: String as PropType<string>,
    actionType: {
        type: String as PropType<ListItemActionType>,
        default: ListItemActionType.LINK,
        validator: (value: ListItemActionType) => Object.values(ListItemActionType).includes(value),
    },
})

// Emits
const emit = defineEmits(['click'])

// Handlers
const handleClick = () => {
    if (props.actionType === ListItemActionType.ACTION) {
        emit('click')
    }
}
</script>