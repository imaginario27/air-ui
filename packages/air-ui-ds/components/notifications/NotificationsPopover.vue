<template>
    <Popover
        :position
        :align
        :trigger
        :popoverClass="['px-0 py-3', popoverClass]"
    >
        <template #content="{ onClose }">
            <div
                v-if="isLoading && !hasError"
                class="w-full flex justify-center py-3"
            >
                <Loading 
                    :text="loadingText"
                    spinnerClass="w-[16px]! h-[16px]! border-2!"
                    class="flex-row gap-2! text-sm!"
                />
            </div>

            <div
                v-else-if="!isLoading && hasError"
                class="w-full flex justify-center py-3"
            >
                <span class="text-sm text-text-error">
                    {{ errorText }}
                </span>
            </div>

            <div 
                v-else
                class="w-full flex flex-col gap-2"
            >
                <!-- Header -->
                <div class="w-full flex flex-col gap-2.5 px-3">
                    <div class="w-full flex gap-4 items-center justify-between">
                        <div class="flex gap-2 items-center min-h-[24px]">
                            <span class="text-sm font-semibold">
                                {{ title }}
                            </span>

                            <Badge
                                v-if="unreadCount"
                                :text="unreadCount.toString()"
                                :color="badgeColor"
                                :styleType="badgeStyleType"
                                :shape="badgeShape"
                            />
                        </div>
                    
                        <NavLink
                            v-if="internalList.length"
                            :text="viewAllText"
                            :to="viewAllLink"
                            textClass="text-text-default text-sm! hover:text-text-primary-brand-hover font-normal"
                            @click="onViewAllClick($event, onClose)"
                        />
                    </div>

                    <!-- Filters -->
                    <ToggleButtonsGroupField
                        v-if="internalList.length"
                        id="notifications-filters" 
                        v-model="selectedFilterValue" 
                        :buttons="toggleFilterButtons" 
                        :groupStyle="filterGroupStyle"
                    />
                </div>

                <!-- Notifications List -->
                <div :class="['w-full flex flex-col overflow-y-auto', listMaxHeightClass]">
                    <slot name="list" />

                    <template v-if="!$slots.list && filteredList.length">
                        <NotificationListItem
                            v-for="notification in filteredList"
                            :key="notification.id"
                            :modelValue="notification.read"
                            :icon="notification.icon"
                            :iconColor="notification.iconColor"
                            :iconSize="listIconSize"
                            :isIconContained="isListIconContained"
                            :containedIconShape="listContainedIconShape"
                            :containedIconSize="listContainedIconSize"
                            :containedStyleType="listContainedStyleType"
                            :to="notification.link"
                            :title="notification.title"
                            :description="notification.description"
                            :timeAgo="notification.timeAgo"
                            :timeAgoIcon="listTimeAgoIcon"
                            :author="notification.author"
                            :authorIcon="listAuthorIcon"
                            :removeItemIcon="listRemoveItemIcon"
                            :removeAriaLabel="listRemoveItemAriaLabel"
                            @update:model-value="onReadStatusChange(notification.id, $event)"
                            @remove="onRemoveNotification(notification.id)"
                            @itemClick="onClose"
                        />
                    </template>

                    <div v-else class="p-3">
                        <p class="text-sm text-text-neutral-subtle text-center">{{ listEmptyText }}</p>
                    </div>
                </div>

                <!-- Footer -->
                <div
                    v-if="internalList.length"
                    class="w-full flex gap-2 px-3"
                >
                    <ActionButton
                        :icon="buttonAllReadIcon"
                        :iconPosition="IconPosition.LEFT"
                        :text="buttonAllReadText"
                        :size="ButtonSize.XS"
                        isFullWidth
                        @click="onMarkAllAsRead"
                    />
                    <ActionButton
                        :icon="buttonClearAllIcon"
                        :iconPosition="IconPosition.LEFT"
                        :text="buttonClearAllText"
                        :size="ButtonSize.XS"
                        isFullWidth
                        @click="onClearAll"
                    />
                </div> 
            </div>
        </template>
        <template #activator>
            <slot name="activator" />
        </template>
    </Popover>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    list: {
        type: Array as PropType<NotificationItem[]>,
        default: () => [],
    },
    limit: {
        type: Number as PropType<number>,
        default: 10,
    },
    isListIconContained: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    listIconSize: {
        type: String as PropType<IconSize>,
        default: IconSize.MD,
        validator: (value: IconSize) => Object.values(IconSize).includes(value),
    },
    listContainedIconShape: {
        type: String as PropType<IconContainerShape>,
        default: IconContainerShape.CIRCLE,
        validator: (value: IconContainerShape) => Object.values(IconContainerShape).includes(value),
    },
    listContainedIconSize: {
        type: String as PropType<IconContainerSize>,
        default: IconContainerSize.SM, 
        validator: (value: IconContainerSize) => Object.values(IconContainerSize).includes(value),
    },
    listContainedStyleType: {
        type: String as PropType<IconContainerStyleType>,
        default: IconContainerStyleType.FLAT,
        validator: (value: IconContainerStyleType) => Object.values(IconContainerStyleType).includes(value),
    },
    listTimeAgoIcon: {
        type: String as PropType<string>,
        default: 'mdi:clock-time-four-outline',
    },
    listMaxHeightClass: {
        type: String as PropType<string>,
        default: 'max-h-[400px]',
    },
    listAuthorIcon: {
        type: String as PropType<string>,
        default: 'mdi:account-outline',
    },
    listRemoveItemIcon: {
        type: String as PropType<string>,
        default: 'mdi:close',
    },
    listRemoveItemAriaLabel: {
        type: String as PropType<string>,
        default: 'Remove notification',
    },
    listEmptyText: {
        type: String as PropType<string>,
        default: 'No notifications available.',
    },
    isLoading: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    loadingText: {
        type: String as PropType<string>,
        default: "Loading notifications",
    },
    errorText: {
        type: String as PropType<string>,
        default: "",
    },
    title: {
        type: String as PropType<string>,
        default: 'Notifications',
    },
    position: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    align: {
        type: String as PropType<Align>,
        default: Align.RIGHT,
        validator: (value: Align) => Object.values(Align).includes(value),
    },
    trigger: {
        type: String as PropType<Trigger>,
        default: Trigger.CLICK,
        validator: (value: Trigger) => Object.values(Trigger).includes(value),
    },
    popoverClass: {
        type: String as PropType<string>,
        default: 'min-w-[332px]'
    },
    badgeStyleType: {
        type: String as PropType<BadgeStyle>,
        default: BadgeStyle.FILLED,
        validator: (value: BadgeStyle) => Object.values(BadgeStyle).includes(value),
    },
    badgeShape: {
        type: String as PropType<BadgeShape>,
        default: BadgeShape.PILL, 
        validator: (value: BadgeShape) => Object.values(BadgeShape).includes(value),
    },
    badgeColor: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.SECONDARY_BRAND, 
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
    viewAllText: {
        type: String as PropType<string>,
        default: 'View all',
    },
    viewAllLink: {
        type: String as PropType<string>,
        default: '',
    },
    buttonAllReadIcon: {
        type: String as PropType<string>,
        default: 'mdi:check-all',
    },
    buttonAllReadText: {
        type: String as PropType<string>,
        default: 'Mark all as read',
    },
    buttonClearAllIcon: {
        type: String as PropType<string>,
        default: 'mdi:close-circle-outline',
    },
    buttonClearAllText: {
        type: String as PropType<string>,
        default: 'Clear all',
    },
    filterAllButtonText: {
        type: String as PropType<string>,
        default: 'All',
    },
    filterUnreadButtonText: {
        type: String as PropType<string>,
        default: 'Unread',
    },
    filterGroupStyle: {
        type: String as PropType<ToggleButtonGroupStyle>,
        default: ToggleButtonGroupStyle.GROUPED,
        validator: (value: ToggleButtonGroupStyle) => Object.values(ToggleButtonGroupStyle).includes(value),
    },
})

// Emits
const emit = defineEmits(['markAllAsRead', 'clearAll', 'remove'])

// States
const selectedFilterValue = ref<string>('all')

const toggleFilterButtons = ref<ToggleButton[]>([
    { text: props.filterAllButtonText, value: 'all', size: ButtonSize.SM },
    { text: props.filterUnreadButtonText, value: 'unread', size: ButtonSize.SM },
])

const internalList = ref<NotificationItem[]>([...props.list])

// Watchers
watch(() => props.list, (newList) => {
    internalList.value = [...newList]
}, { deep: true })

// Computed
const hasError = computed(() => props.errorText.trim().length > 0)

const unreadCount = computed(() => internalList.value.filter(notification => !notification.read).length)

const filteredList = computed(() => {
    const source = selectedFilterValue.value === 'unread'
        ? internalList.value.filter(notification => !notification.read)
        : internalList.value

    return source.slice(0, props.limit)
})

// Handlers
const onViewAllClick = (event: MouseEvent, onClose: () => void) => {
    if (!props.viewAllLink) event.preventDefault()
    onClose()
}

const onRemoveNotification = (id: string) => {
    internalList.value = internalList.value.filter(notification => notification.id !== id)
    emit('remove', { id })
}

const onReadStatusChange = (id: string, read: boolean) => {
    const item = internalList.value.find(notification => notification.id === id)
    if (item) item.read = read
}

const onMarkAllAsRead = () => {
    internalList.value.forEach(notification => notification.read = true)
    emit('markAllAsRead')
}

const onClearAll = () => {
    internalList.value = []
    emit('clearAll')
}
</script>