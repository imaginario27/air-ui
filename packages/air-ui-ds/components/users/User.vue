<template>
    <div
        :class="[
            'inline-flex items-center font-semibold',
            isInteractive && 'group hover:cursor-pointer',
            containerClass
        ]"
    >
        <Avatar
            :displayName
            :imgUrl
            :size="avatarSize ? avatarSize : size"
            :shape
            :class="`${isInteractive && 'group-hover:border-2 group-hover:border-border-primary-brand-default'}`"
        />
        <span>{{ trimText(displayName, 20) }}</span>
    </div>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    displayName: {
        type: String as PropType<string>,
        default: 'Test username',
    },
    shape: {
        type: String as PropType<AvatarShape>,
        default: AvatarShape.CIRCLE,
        validator: (value: AvatarShape) => Object.values(AvatarShape).includes(value),
    },
    size: {
        type: String as PropType<AvatarSize.XS | AvatarSize.SM | AvatarSize.MD>,
        default: AvatarSize.XS,
        validator: (value: AvatarSize) => [AvatarSize.XS, AvatarSize.SM, AvatarSize.MD].includes(value),
    },
    avatarSize: String as PropType<AvatarSize.XS | AvatarSize.SM | AvatarSize.MD>,
    isInteractive: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    imgUrl: String as PropType<string>,
})

// Computed classes
const containerClass = computed(() => {
    const variants = {
        [AvatarSize.XS]: 'text-xs gap-2',
        [AvatarSize.SM]: 'text-sm gap-2',
        [AvatarSize.MD]: 'gap-3',
    }
    return variants[props.size as AvatarSize.XS | AvatarSize.SM | AvatarSize.MD] || 'gap-2'
})
</script>
