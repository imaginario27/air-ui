<template>
    <nav class="nav-menu flex gap-8 px-6">
        <template v-for="item in menuItems" :key="item.text">
            <DropdownMenu
                v-if="hasSubmenu(item)"
                :positionYOffset="submenuYOffset"
                :trigger="submenuTrigger"
                :dropdownClass="getDropdownClass(item)"
            >
                <template #activator="{ isOpen }">
                    <button
                        type="button"
                        :class="[
                            'font-medium',
                            'transition-colors',
                            'duration-150',
                            'hover:text-text-primary-brand-active text-text-default',
                            isSubmenuActive(item) && 'text-text-primary-brand-active',
                        ]"
                    >
                        <span class="inline-flex items-center gap-1">
                            {{ item.text }}
                            <Icon
                                :name="isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                                class="text-icon-neutral-subtle transition-transform duration-150"
                            />
                        </span>
                    </button>
                </template>

                <template #items>
                    <DropdownMenuItem
                        v-for="submenuItem in getSubmenuItems(item)"
                        :key="`${item.text}-${submenuItem.text}`"
                        :text="submenuItem.text"
                        :to="submenuItem.to"
                    />
                </template>
            </DropdownMenu>

            <NavMenuItem
                v-else
                :text="item.text"
                :to="item.to"
                :detectActive="props.detectActive"
                :prefetchOn
            />
        </template>
    </nav>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    menuItems: {
        type: Array as PropType<MenuItem[]>,
        default: () => [
            {
                'text': 'Menu item 1',
                'to': '/',
            },
            {
                'text': 'Menu item 2',
                'to': '/',
            },
            {
                'text': 'Menu item 3',
                'to': '/',
            },
        ],
    }, 
    detectActive: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    submenuYOffset: {
        type: Number as PropType<number>,
        default: 8,
    },
    submenuDropdownClass: {
        type: String as PropType<string>,
        default: 'min-w-[220px]',
    },
    submenuTrigger: {
        type: String as PropType<Trigger>,
        default: Trigger.CLICK,
        validator: (value: Trigger) => Object.values(Trigger).includes(value),
    },
    prefetchOn: {
        type: [String, Object] as PropType<PrefetchOnStrategy>,
        default: PrefetchOn.VISIBILITY,
    },
})

// Composables
const route = useRoute()

// Methods
const getSubmenuItems = (item: MenuItem): NonNullable<MenuItem['children']> => {
    return item.children ?? []
}

const getDropdownClass = (item: MenuItem) => {
    return item.submenuDropdownClass ?? props.submenuDropdownClass
}

const hasSubmenu = (item: MenuItem) => getSubmenuItems(item).length > 0

const isSubmenuActive = (item: MenuItem) => {
    if (!props.detectActive || !hasSubmenu(item)) return false

    return getSubmenuItems(item).some((submenuItem) => submenuItem.to === route.path)
}
</script>
