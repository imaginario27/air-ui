<template>
    <footer 
        :class="[
            'w-full',
            'bg-background-surface',
            'py-section-xs',
            hasSidePadding && 'px-content-side-padding-mobile md:px-content-side-padding',
        ]"
    >
        <MaxWidthContainer
            :class="[!hasContentMaxWidth && '!max-w-full']"
        >
            <template v-if="!$slots['default']">
                <div 
                    :class="[
                        'w-full',
                        'flex',
                        'flex-col',
                        isMobileCentered &&'items-center text-center',
                        'gap-10',
                        'lg:flex-row',
                        'lg:items-start',
                        'lg:text-left',
                        'lg:justify-between',
                    ]"
                >
                    <span class="text-sm text-text-neutral-subtle">
                        {{ credits }}
                    </span>

                    <nav v-if="menuItems.length">
                        <ul class="flex flex-col lg:flex-row gap-5">
                            <li 
                                v-for="(item, index) in menuItems" 
                                :key="index"
                            >
                                <NuxtLink
                                    :to="item.to"
                                    :class="[
                                        'text-sm',
                                        'hover:text-text-primary-brand-hover',
                                        'transition-colors',
                                    ]"
                                >
                                    {{ item.text }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </nav>

                    <div v-if="socialNetworks.length" class="flex gap-5">
                        <a 
                            v-for="(network, index) in socialNetworks" 
                            :key="index"
                            :href="network.link"
                            target="_blank"
                            rel="noopener noreferrer"
                            :class="[
                                'text-text-neutral-subtle',
                                'hover:text-text-primary-brand-hover',
                                'transition-colors',
                            ]"
                            :aria-label="network.name"
                        >
                            <img 
                                :src="network.icon"
                                :alt="`${network.name} icon`"
                                width="20"
                                height="20"
                                class="min-w-[20px] min-h-[20px]"
                            />
                        </a>
                    </div>  
                </div>
            </template>
            <template v-else>
                <slot />    
            </template>
        </MaxWidthContainer>
    </footer>
</template>
<script setup lang="ts">
// Props
defineProps({
    credits: {
        type: String as PropType<string>,
        default: '© <year> <your-company>. All rights reserved.',
    },
    menuItems: {
        type: Array as PropType<MenuItem[]>,
        default: () => [],
    },
    socialNetworks: {
        type: Array as PropType<SocialNetwork[]>,
        default: () => [],
    },
    hasContentMaxWidth: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    hasSidePadding: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    isMobileCentered: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})
</script>