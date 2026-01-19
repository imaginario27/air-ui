<template>
    <div class="flex gap-2.5">
        <Icon
            v-if="icon"
            :name="icon"
            :size="IconSize.LG"
            :color="iconColor"
            :iconClass="iconClass"
        />
    
        <div class="w-full flex flex-col gap-1">
            <div class="text-base font-semibold">
                {{ title }}
            </div>
            <p 
                v-if="description" 
                class="text-base text-text-neutral-subtle"
            >
                {{ description }}
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
// Props
defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Title',
    },
    description: String as PropType<string>,
    icon: String as PropType<string>,
    iconColor: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.SECONDARY_BRAND, 
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
    iconClass: String as PropType<string>,
})
</script>