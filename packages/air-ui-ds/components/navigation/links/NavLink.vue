<template>
    <NuxtLink
        :to="!disabled ? to : undefined"
        :target="isExternal ? '_blank' : '_self'"
        :rel="isExternal ? 'noopener noreferrer' : undefined" 
        :external="isExternal"   
        class="inline-flex items-center justify-center w-fit"
    >
        <div 
            :class="[
            'group flex items-center justify-center',
            'text-text-primary-brand-default',
            !props.disabled ? 'hover:text-text-primary-brand-hover' : 'opacity-disabled cursor-not-allowed',
            gapClass,
        ]">
            <!-- Left icon -->
            <MdiIcon
                v-if="iconPosition === IconPosition.LEFT"
                :icon="icon"
                :size="iconSizeClass"
                preserveAspectRatio="xMidYMid meet"
            />
            <span :class="[ textSizeClass, textClass ]">
                {{ text }}
            </span>
            <!-- Right icon -->
            <MdiIcon
                v-if="iconPosition === IconPosition.RIGHT"
                :icon="icon"
                :size="iconSizeClass"
                preserveAspectRatio="xMidYMid meet"
            />
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    text: {
        type: String as PropType<string>,
        default: 'Link text'
    },
    size: {
        type: String as PropType<NavLinkSize>,
        default: NavLinkSize.SM,
        validator: (value: NavLinkSize) => Object.values(NavLinkSize).includes(value),
    },
    icon: {
        type: String as PropType<any>,
        default: "mdiArrowRightThin"
    },
    iconPosition: {
        type: String as PropType<IconPosition>,
        default: IconPosition.NONE,
        validator: (value: IconPosition) => Object.values(IconPosition).includes(value),
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    to: {
        type: String as PropType<string>,
        default: '/'
    },
    isExternal: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    textClass: {
        type: String as PropType<string>,
        default: 'font-semibold'
    },
})

// Computed classes
const iconSizeClass = computed(() => {
    const sizeVariant = {
        [NavLinkSize.XS]: '16px',
        [NavLinkSize.SM]: '16px',
        [NavLinkSize.MD]: '16px',
        [NavLinkSize.LG]: '20px',
        [NavLinkSize.XL]: '24px',
        [NavLinkSize.XXL]: '28px',
    }
    return sizeVariant[props.size as NavLinkSize] || '20px'
})

const textSizeClass = computed(() => {
    const sizeVariant = {
        [NavLinkSize.XS]: 'text-xs',
        [NavLinkSize.SM]: 'text-sm',
        [NavLinkSize.MD]: 'text-md',
        [NavLinkSize.LG]: 'text-lg',
        [NavLinkSize.XL]: 'text-xl',
        [NavLinkSize.XXL]: 'text-2xl',
    }
    return sizeVariant[props.size as NavLinkSize] || 'text-sm'
})

const gapClass = computed(() => {
    const sizeVariant = {
        [NavLinkSize.XS]: 'gap-1',
        [NavLinkSize.SM]: 'gap-1.5',
        [NavLinkSize.MD]: 'gap-2',
        [NavLinkSize.LG]: 'gap-2',
        [NavLinkSize.XL]: 'gap-2',
        [NavLinkSize.XXL]: 'gap-2',
    }
    return sizeVariant[props.size as NavLinkSize] || 'gap-2'
})
</script>