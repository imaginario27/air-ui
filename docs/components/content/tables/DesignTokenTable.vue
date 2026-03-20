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
                                    `bg-${item.name}`,
                                    'w-[20px] h-[20px] rounded-full',
                                    'border-3 border-solid',
                                    isDark ? 'border-border-theme-neutral-50' : 'border-border-default',
                                ]"
                            />

                            <!-- Text indicator -->
                            <div 
                                v-else-if="type === 'text'"
                                :class="[
                                    `text-${item.name}`,
                                    'flex items-center justify-center',
                                    'px-2 py-0.5 rounded-full',
                                    'text-sm font-semibold',
                                    'border-2 border-solid',
                                    isDark ? 'border-border-theme-neutral-50' : 'border-border-default',
                                    isOnFilled(item.name) && !isDark && 'bg-theme-neutral-500'
                                ]"
                            >   
                                Text
                            </div>

                            <!-- Border indicator -->
                            <div 
                                v-else-if="type === 'border'"
                                :class="[
                                    `border-${item.name}`,
                                    'w-[20px] h-[20px] rounded-full',
                                    'border-3 border-solid',
                                    'bg-background-theme-neutral-50',
                                ]"
                            />

                            <!-- Icon indicator -->
                            <div 
                                v-else-if="type === 'icon'"
                                :class="[
                                    `text-${item.name}`,
                                    'flex items-center justify-center',
                                    'w-[24px] h-[24px] rounded-full',
                                    'text-sm font-semibold',
                                    'border-2 border-solid',
                                    isDark ? 'border-border-theme-neutral-50' : 'border-border-default',
                                    isOnFilled(item.name) && !isDark && 'bg-theme-neutral-500'
                                ]"
                            >   
                                <Icon 
                                    name="mdi-help"
                                    :size="IconSize.SM"
                                />
                            </div>

                            <div 
                                v-if="type === 'opacity'"
                                :class="[
                                    `opacity-${item.name}`,
                                    'w-[20px] h-[20px] rounded-full',
                                    'bg-background-neutral-bold',
                                ]"
                            />

                            <div 
                                v-if="type === 'radius'"
                                :class="[
                                    `rounded-${item.name}`,
                                    'w-[20px] h-[20px]',
                                    'bg-background-neutral-bold',
                                ]"
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
const props = defineProps({
    items: {
        type: Array as PropType<DesignTokenTableItem[]>,
        default: () => []
    },
    type: {
        type: String as PropType<DesignTokenTableType>,
        default: 'background'
    }
})

// Composables
const darkModeStore = useDarkMode()
const { isDark } = darkModeStore

// Methods
const isOnFilled = (name: string): boolean => {
    return (
        (props.type === 'text' || props.type === 'icon') &&
        name.includes('on-filled')
    )
}
</script>