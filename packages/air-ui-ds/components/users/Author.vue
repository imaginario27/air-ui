<template>
    <div 
        :class="[
            'flex',
            spacingClass,
            !role && 'items-center',
            layoutOrientation === Orientation.VERTICAL && 'flex-col',
            detailsOrientation === Orientation.HORIZONTAL &&  'items-center',
            layoutOrientation === Orientation.VERTICAL && verticalLayoutAlign === Align.CENTER && 'items-center text-center'
        ]"
    >
        <Avatar 
            :displayName="name"
            :size
            :shape
            :imgUrl
        />

        <div
            :class="[
                'flex',
                detailsOrientation === Orientation.VERTICAL ? 'flex-col gap-1' : 'gap-2', 
            ]"
        >
            <span 
                :class="[
                    'font-semibold',
                    nameClass
                ]"
            >
                {{ name }}
            </span>
            <span 
                v-if="detailsOrientation == Orientation.HORIZONTAL"
                class="text-border-default"
            >
                |
            </span>
            <span 
                v-if="role" 
                :class="[
                    'text-text-neutral-subtle',
                    detailsOrientation === Orientation.VERTICAL ? roleClass : nameClass,
                ]"
            >
                {{ role }}
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    name: {
        type: String as PropType<string>,
        default: 'John Doe'
    },
    role: String as PropType<string>,
    imgUrl: String as PropType<string>,
    layoutOrientation: {
        type: String as PropType<Orientation>,
        default: Orientation.HORIZONTAL,
        validator: (value: Orientation) => Object.values(Orientation).includes(value)
    },
    detailsOrientation: {
        type: String as PropType<Orientation>,
        default: Orientation.VERTICAL,
        validator: (value: Orientation) => Object.values(Orientation).includes(value)
    },
    verticalLayoutAlign: {
        type: String as PropType<Align.LEFT | Align.CENTER>,
        default: Align.LEFT,
        validator: (value: Align) => [Align.LEFT, Align.CENTER].includes(value)
    },
    shape: {
        type: String as PropType<AvatarShape>,
        default: AvatarShape.CIRCLE,
        validator: (value: AvatarShape) => Object.values(AvatarShape).includes(value),
    },
    size: {
        type: String as PropType<AvatarSize.XS | AvatarSize.SM | AvatarSize.MD>,
        default: AvatarSize.SM,
        validator: (value: AvatarSize) => [AvatarSize.XS, AvatarSize.SM, AvatarSize.MD].includes(value),
    },
})

const spacingClass = computed(() => {
    const variants = {
        [AvatarSize.XS]: 'gap-2',
        [AvatarSize.SM]: 'gap-2',
        [AvatarSize.MD]: 'gap-3',
    }
    return variants[props.size as AvatarSize.XS | AvatarSize.SM | AvatarSize.MD] || 'gap-2'
})

const nameClass = computed(() => {
    const variants = {
        [AvatarSize.XS]: 'text-xs',
        [AvatarSize.SM]: 'text-sm',
        [AvatarSize.MD]: 'text-base',
    }
    return variants[props.size as AvatarSize.XS | AvatarSize.SM | AvatarSize.MD] || 'text-sm'
})

const roleClass = computed(() => {
    const variants = {
        [AvatarSize.XS]: 'text-xs',
        [AvatarSize.SM]: 'text-xs',
        [AvatarSize.MD]: 'text-sm',
    }
    return variants[props.size as AvatarSize.XS | AvatarSize.SM | AvatarSize.MD] || 'text-xs'
})
</script>