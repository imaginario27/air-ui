<template>
    <div
        :class="[
            'w-full',
            isFullScreen ? 'h-screen py-[10vw] md:py-[20vw]' : 'py-6',
            'px-content-side-padding',
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
                :icon="resolvedErrorMapping.icon ?? icon"
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
                <Heading
                    :title="resolvedErrorMapping.title"
                    :overtitle="showErrorCode ? statusCode.toString() : ''"
                    :align="alignContent"
                    :size="HeadingSize.MD"
                    :isMobileCentered
                    headingTag="h1"
                />

                <p
                    :class="[
                        'text-text-neutral-subtle',
                        'font-semibold',
                        textAlignmentClass,
                        'leading-6',
                    ]"
                >
                    {{ resolvedErrorMapping.message }}
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
                    'mb-4 md:mb-10', // Visual fix to push content a bit up
                ]"
            >
                <ActionButton
                    v-if="!$slots['actions']"
                    :actionType="ButtonActionType.LINK"
                    :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
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
// Props
const props = defineProps({
    statusCode: {
        type: Number,
        required: true,
    },
    errorMappings: {
        type: Array as PropType<ErrorMapping[]>,
        default: () => [],
    },
    setPageTitle: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    showIcon: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    showErrorCode: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    icon: {
        type: String as PropType<string>,
        default: 'mdi:alert-circle-outline',
    },
    backToHomeText: {
        type: String as PropType<string>,
        default: 'Back to home page',
    },
    backToHomeIcon: {
        type: String as PropType<string>,
        default: 'mdi:home-outline',
    },
    homeRoute: {
        type: String as PropType<string>,
        default: '/',
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
        default: Align.CENTER,
        validator: (value: Align) => Object.values(Align).includes(value),
    },
    isMobileCentered: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
})

// Runtime constants
const config = useRuntimeConfig()
const { public: { appName } } = config

// Constants
const defaultErrorMappings: ErrorMapping[] = [
    // 4xx Client Errors
    {
        statusCode: 400,
        title: 'Bad request',
        message: 'The request could not be understood by the server due to malformed syntax.',
    },
    {
        statusCode: 401,
        title: 'Unauthorized',
        message: 'You are not authorized to access this resource. Please log in.',
    },
    {
        statusCode: 403,
        title: 'Forbidden',
        message: 'You do not have permission to access this page.',
    },
    {
        statusCode: 404,
        title: 'Page not found',
        message: 'The page you are looking for does not exist or may have been moved.',
    },
    {
        statusCode: 405,
        title: 'Method not allowed',
        message: 'The method is not allowed for the requested URL.',
    },
    {
        statusCode: 408,
        title: 'Request timeout',
        message: 'The server timed out waiting for the request.',
    },
    {
        statusCode: 429,
        title: 'Too many requests',
        message: 'You have made too many requests in a short period of time. Please try again later.',
    },

    // 5xx Server Errors
    {
        statusCode: 500,
        title: 'Internal server error',
        message: 'Something went wrong on our end. Please try again later.',
    },
    {
        statusCode: 501,
        title: 'Not implemented',
        message: 'The server does not support the functionality required to fulfill the request.',
    },
    {
        statusCode: 502,
        title: 'Bad gateway',
        message: 'The server received an invalid response from the upstream server.',
    },
    {
        statusCode: 503,
        title: 'Service unavailable',
        message: 'The server is temporarily unable to handle the request. Please try again later.',
    },
    {
        statusCode: 504,
        title: 'Gateway timeout',
        message: 'The upstream server failed to send a request in time.',
    },
    {
        statusCode: 505,
        title: 'HTTP version not supported',
        message: 'The server does not support the HTTP protocol version used in the request.',
    },

    // Fallback for unknown errors
    {
        statusCode: -1,
        title: 'Unexpected error',
        message: 'An unknown error occurred. Please try again.',
    }
]


// Computed
const resolvedErrorMapping = computed(() => {
    const code = Number(props.statusCode)

    const combined = [...props.errorMappings, ...defaultErrorMappings]

    return (
        combined.find(mapping => mapping.statusCode === code) ??
        combined.find(mapping => mapping.statusCode === -1)!
    )
})

const pageTitleText = computed(() => resolvedErrorMapping.value.title)

watchEffect(() => {
    if (props.setPageTitle) {
        document.title = pageTitle(pageTitleText.value, appName as string)
    }
})

// Alignment classes
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
