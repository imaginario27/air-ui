<template>
    <div
        :class="[
            'w-full',
            isFullScreen && 'h-screen',
            'px-content-side-padding',
            'py-[10vw] md:py-[20vw]',
            'flex',
            orientation === Orientation.VERTICAL ? 'flex-col' : 'flex-col md:flex-row',
            'gap-9',
            'items-center',
            'justify-center',
        ]"
    >
        <!-- Slot for images, illustrations or other visual elements -->
        <slot name="visual-left" />

        <!-- Body -->
        <div
            :class="[
                'w-full',
                'gap-9',
                'flex',
                'flex-col',
                contentAlignmentClass,
            ]"
        >
            <slot name="visual-top" />

            <ContainedIcon
                v-if="!$slots['visual-top'] && showIcon"
                :color="ColorAccent.DANGER"
                :icon
                :size="IconContainerSize.XXL"
            />

            <div 
                v-if="!$slots['description']"
                :class="[
                    'flex',
                    'flex-col',
                    'gap-4',
                    contentAlignmentClass,
                    'w-full',
                    'max-w-[600px]',
                ]"
            >
                <!-- 
                    Overtitle will only display if useGenericErrorTitle is true. 
                    Otherwise, it will not be displayed because the error code is shown as the title 
                -->
                <Heading
                    :title="errorTitle"
                    :overtitle="useGenericErrorTitle ? error.statusCode.toString() : ''"
                    :align="alignContent"
                    :size="HeadingSize.MD"
                    :isMobileCentered
                />

                <p 
                    :class="[
                        'text-text-neutral-subtle',
                        'font-semibold',
                        textAlignmentClass,
                        'leading-6',
                    ]"
                >
                    {{
                        error.statusCode === 404
                            ? pageNotFoundMessage
                            : error.message ?? genericErrorMessage
                    }}
                </p>
            </div>

            <slot name="description" />

            <!-- Actions -->
            <div 
                :class="[
                    'w-full', 
                    'flex', 
                    'gap-3', 
                    actionsAlignmentClass, 
                    'flex-col', 
                    'md:flex-row',
                    'mb-4 md:mb-10' // Visual fix to push content a bit up
                ]"
            >
                <ActionButton
                    v-if="!$slots['actions']"
                    :actionType="ButtonActionType.LINK"
                    :text="backToHomeText"
                    class="w-full md:w-auto"
                    :icon="backToHomeIcon"
                    :iconPosition="IconPosition.LEFT"
                    :to="homeRoute"
                />

                <slot name="actions" />
            </div>
        </div>

        <!-- Slot for images, illustrations or other visual elements -->
        <slot name="visual-right" />
    </div>
</template>
<script setup lang="ts">
// Imports
import type { NuxtError } from "#app"

// Props
const props = defineProps({
    error: {
        type: Object as PropType<NuxtError>,
        required: true,
    },
    showIcon: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    icon: {
        type: String as PropType<any>,
        default: "mdiAlertCircleOutline",
    },
    pageNotFoundTitle: {
        type: String as PropType<string>,
        default: "Page not found",
    },
    pageNotFoundMessage: {
        type: String as PropType<string>,
        default: "The page you are looking for does not exist or may have been moved. Please try with another page.",
    },
    useGenericErrorTitle: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    genericErrorTitle: {
        type: String as PropType<string>,
        default: "Oops! Something went wrong",
    },
    genericErrorMessage: {
        type: String as PropType<string>,
        default: "Something went wrong on our end. Please try again later.",
    },
    backToHomeText: {
        type: String as PropType<string>,
        default: "Back to home page",
    },
    backToHomeIcon: {
        type: String as PropType<string>,
        default: "mdiHomeOutline",
    },
    homeRoute: {
        type: String as PropType<string>,
        default: "/",
    },
    isFullScreen: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    orientation: {
        type: String as PropType<Orientation>,
        default: Orientation.HORIZONTAL,
        validator: (value: Orientation) => Object.values(Orientation).includes(value),
    },
    alignContent: {
        type: String as PropType<Align>,
        default: Align.LEFT,
        validator: (value: Align) => Object.values(Align).includes(value),
    },
    isMobileCentered: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
})

// Computed
const errorTitle = computed(() => {
    if (props.useGenericErrorTitle) {
        return props.genericErrorTitle
    }

    if (props.error.statusCode === 404 || props.error.statusCode === 400) {
        return props.pageNotFoundTitle
    }

    return String(props.error.statusCode)
})

const pageTitleText = computed(() => errorTitle.value)

// Dynamically set the page title with a watcher (only for error page)
watchEffect(() => {
    document.title = pageTitle(pageTitleText.value, App.NAME)
})

// Computed classes
const contentAlignmentClass = computed(() => {
    const base = {
        [Align.LEFT]: 'md:items-start',
        [Align.CENTER]: 'md:items-center',
        [Align.RIGHT]: 'md:items-end',
    }

    return [
        props.isMobileCentered ? 'items-center' : '',
        base[props.alignContent as Align] || 'md:items-center',
    ].join(' ').trim()
})

const actionsAlignmentClass = computed(() => {
    const base = {
        [Align.LEFT]: 'md:items-start md:justify-start',
        [Align.CENTER]: 'md:items-center md:justify-center',
        [Align.RIGHT]: 'md:items-end md:justify-end',
    }

    return [
        props.isMobileCentered ? 'items-center justify-center' : '',
        base[props.alignContent as Align] || 'md:items-center md:justify-center',
    ].join(' ').trim()
})

const textAlignmentClass = computed(() => {
    const base = {
        [Align.LEFT]: 'md:text-left',
        [Align.CENTER]: 'md:text-center',
        [Align.RIGHT]: 'md:text-right',
    }

    return [
        props.isMobileCentered ? 'text-center' : '',
        base[props.alignContent as Align] || 'md:text-center',
    ].join(' ').trim()
})

</script>
