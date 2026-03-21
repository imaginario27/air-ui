<template>
    <div class="overflow-x-auto">
        <ProseTable v-if="items.length">
            <ProseThead>
                <ProseTr>
                    <ProseTh>
                        Token
                    </ProseTh>
                    <ProseTh>
                        Description
                    </ProseTh>
                </ProseTr>
            </ProseThead>

            <ProseTbody>
                <ProseTr v-for="(item, index) in items" :key="index">
                    <ProseTd class="w-[1%] whitespace-nowrap">
                        <div class="flex gap-2 items-center">

                            <!-- Background indicator -->
                            <div 
                                v-if="type === 'background'"
                                :class="[
                                    'w-5 h-5 rounded-full',
                                    'border-3 border-solid',
                                ]"
                                :style="getBackgroundPreviewStyle(item.name)"
                            />

                            <!-- Text indicator -->
                            <div 
                                v-else-if="type === 'text'"
                                :class="[
                                    'flex items-center justify-center',
                                    'px-2 py-0.5 rounded-full',
                                    'text-sm font-semibold',
                                    'border-2 border-solid',
                                ]"
                                :style="getForegroundPreviewStyle(item.name)"
                            >   
                                Text
                            </div>

                            <!-- Border indicator -->
                            <div 
                                v-else-if="type === 'border'"
                                :class="[
                                    'w-5 h-5 rounded-full',
                                    'border-3 border-solid',
                                ]"
                                :style="getBorderPreviewStyle(item.name)"
                            />

                            <!-- Icon indicator -->
                            <div 
                                v-else-if="type === 'icon'"
                                :class="[
                                    'flex items-center justify-center',
                                    'w-6 h-6 rounded-full',
                                    'text-sm font-semibold',
                                    'border-2 border-solid',
                                ]"
                                :style="getForegroundPreviewStyle(item.name)"
                            >   
                                <Icon 
                                    name="mdi-help"
                                    :size="IconSize.SM"
                                />
                            </div>

                            <div 
                                v-if="type === 'opacity'"
                                :class="[
                                    'w-5 h-5 rounded-full',
                                ]"
                                :style="getOpacityPreviewStyle(item.name)"
                            />

                            <div 
                                v-if="type === 'radius'"
                                :class="[
                                    'w-5 h-5',
                                ]"
                                :style="getRadiusPreviewStyle(item.name)"
                            />

                            <ProseCode 
                                :color="ColorAccent.NEUTRAL"
                                class="font-semibold whitespace-nowrap"
                            >
                                {{ item.name }}
                            </ProseCode>
                        </div>
                    </ProseTd>
                    <ProseTd>
                        {{ item.description }}
                    </ProseTd>
                </ProseTr>
            </ProseTbody>
        </ProseTable>
    </div>
</template>
<script setup lang="ts">
// Local interfaces
interface DesignTokenTableItem {
    name: string
    description: string
}

type DesignTokenTableType = 
    'background' 
    | 'text' 
    | 'border' 
    | 'icon'
    | 'opacity'
    | 'radius'
    | 'others'

// Props
defineProps({
    items: {
        type: Array as PropType<DesignTokenTableItem[]>,
        default: () => []
    },
    type: {
        type: String as PropType<DesignTokenTableType>,
        default: 'background'
    }
})

const getColorToken = (name: string): string => `var(--color-${name})`

const getContextBackground = (name: string): string | undefined => {
    if (name.includes('warning-on-bg')) {
        return getColorToken('background-warning-subtler')
    }

    if (name.includes('on-filled')) {
        return getColorToken('background-neutral-filled-default')
    }

    if (name.includes('on-monochrome-active-bg')) {
        return getColorToken('background-neutral-bold')
    }

    if (name.includes('on-monochrome-hover-bg')) {
        return getColorToken('background-neutral-hover')
    }

    if (name.includes('on-neutral-filled-bg')) {
        return getColorToken('background-neutral-filled-default')
    }

    if (name.includes('on-neutral-bg')) {
        return getColorToken('background-neutral-default')
    }

    if (name.includes('on-primary-brand-soft-bg')) {
        return getColorToken('background-primary-brand-soft')
    }

    if (name.includes('on-subtlest-bg')) {
        return getColorToken('background-neutral-subtlest')
    }

    if (name.includes('primary-brand-on-soft-bg')) {
        return getColorToken('background-primary-brand-soft')
    }

    if (name.includes('secondary-brand-on-soft-bg')) {
        return getColorToken('background-secondary-brand-soft')
    }

    if (name.includes('primary-brand-on-checked-subtlest')) {
        return getColorToken('background-primary-brand-checked-subtlest')
    }

    if (name.includes('secondary-brand-on-checked-subtlest')) {
        return getColorToken('background-secondary-brand-checked-subtlest')
    }

    return undefined
}

const getBackgroundPreviewStyle = (name: string) => ({
    backgroundColor: getColorToken(name),
    borderColor: getColorToken('border-default')
})

const getForegroundPreviewStyle = (name: string) => ({
    color: getColorToken(name),
    borderColor: getColorToken('border-default'),
    backgroundColor: getContextBackground(name)
})

const getBorderPreviewStyle = (name: string) => ({
    borderColor: getColorToken(name),
    backgroundColor: getColorToken('background-surface')
})

const getOpacityPreviewStyle = (name: string) => ({
    opacity: `var(--opacity-${name})`,
    backgroundColor: getColorToken('background-neutral-bold')
})

const getRadiusPreviewStyle = (name: string) => ({
    borderRadius: `var(--radius-${name})`,
    backgroundColor: getColorToken('background-neutral-bold')
})
</script>