<template>
    <div
        ref="panel"
        role="dialog"
        data-test="full-calendar-event-popover"
        :aria-label="event.title"
        :style="style"
        :class="[
            'absolute z-50',
            'min-w-64 max-w-80',
            'rounded-lg border border-border-default bg-background-surface p-3 shadow-lg',
        ]"
    >
        <slot :event="event" :close="close" :edit="edit" :remove="remove">
            <!-- Header -->
            <div class="flex items-center gap-2">
                <span :class="['h-3 w-3 shrink-0 rounded-full', dotClass(event)]" />
                <span class="min-w-0 flex-1 break-words text-sm font-semibold">{{ event.title }}</span>
                <div class="flex shrink-0 items-center">
                    <ActionIconButton
                        v-if="isEditable"
                        icon="mdi:pencil-outline"
                        data-test="full-calendar-event-edit"
                        :size="ButtonSize.SM"
                        :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                        :ariaLabel="editLabel"
                        @click="edit"
                    />
                    <ActionIconButton
                        v-if="isDeletable"
                        icon="mdi:delete-outline"
                        data-test="full-calendar-event-delete"
                        :size="ButtonSize.SM"
                        :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                        :ariaLabel="deleteLabel"
                        @click="remove"
                    />
                    <ActionIconButton
                        icon="mdi:close"
                        :size="ButtonSize.SM"
                        :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                        :ariaLabel="closeLabel"
                        @click="close"
                    />
                </div>
            </div>

            <!-- Info -->
            <div class="mt-1 flex flex-col">
                <span class="text-xs text-text-neutral-subtle">{{ dateLabel }}</span>
                <span class="text-xs text-text-neutral-subtle">{{ timeLabel }}</span>
            </div>
        </slot>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    event: {
        type: Object as PropType<FullCalendarEvent>,
        required: true,
    },
    // The element that opened it, relative to the calendar
    anchor: {
        type: Object as PropType<{ top: number; left: number; width: number; height: number }>,
        required: true,
    },
    locale: {
        type: String as PropType<string>,
        default: 'en-US',
    },
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.PRIMARY_BRAND,
    },
    getEventColor: Function as PropType<(event: FullCalendarEvent) => ColorAccent | undefined>,
    isEditable: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isDeletable: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Emits
const emit = defineEmits(['close', 'edit', 'delete'])

// States
const dsConfig = useDSConfig()
const panel = ref<HTMLElement | null>(null)
const style = ref<Record<string, string>>({
    top: `${props.anchor.top + props.anchor.height}px`,
    left: `${props.anchor.left}px`,
})

const { dotClass } = useFullCalendarEventStyles(
    reactive({ color: toRef(props, 'color'), getEventColor: toRef(props, 'getEventColor'), disabled: false }),
)

const editLabel = computed(() => dsConfig.calendar.editEventText())
const deleteLabel = computed(() => dsConfig.calendar.deleteEventText())
const closeLabel = computed(() => dsConfig.actions.closeText())

// Texts: the day or the days of the event, and its time or "All day"
const dateFormatter = computed(() => new Intl.DateTimeFormat(props.locale, { dateStyle: 'full' }))

const dateLabel = computed(() => {
    const start = parseISODate(props.event.start)
    const end = props.event.end ? parseISODate(props.event.end) : null

    if (!start) return ''

    return end && props.event.end! > props.event.start
        ? dateFormatter.value.formatRange(start, end)
        : dateFormatter.value.format(start)
})

const timeLabel = computed(() => {
    if (isFullCalendarBar(props.event)) return dsConfig.calendar.allDayText()

    return props.event.endTime ? `${props.event.time} – ${props.event.endTime}` : (props.event.time ?? '')
})

// Editing and deleting are done by whoever listens, as they may need a request
const close = () => emit('close')
const edit = () => emit('edit', props.event)
const remove = () => emit('delete', props.event)

// Below the event and centered on it. Above it when there is no room below, and shifted when it would go out on the
// sides, so it always stays inside the calendar.
const place = () => {
    const element = panel.value
    const container = element?.offsetParent as HTMLElement | null

    if (!element || !container) return

    const { anchor } = props
    const gap = 4
    const width = element.offsetWidth
    const height = element.offsetHeight
    const below = anchor.top + anchor.height + gap
    const above = anchor.top - height - gap
    const top = below + height > container.clientHeight && above >= 0 ? above : below

    style.value = {
        top: `${Math.max(Math.min(top, container.clientHeight - height), 0)}px`,
        left: `${Math.max(Math.min(anchor.left + (anchor.width - width) / 2, container.clientWidth - width), 0)}px`,
    }
}

onMounted(place)
watch(
    () => props.anchor,
    () => nextTick(place),
)

onClickOutside(panel, close)
</script>
