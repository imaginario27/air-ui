<template>
    <div>
        <!-- Switchers -->
        <div 
            v-if="isCodePreviewEnabled || isPlaygroundEnabled"
            :class="[
                'w-full',
                'flex',
                'gap-6',
                'mb-2',
                'justify-end',
            ]"
        >
            <SwitchField 
                v-if="isCodePreviewEnabled"
                id="show-code"
                v-model="showCode"
                label="View code"
                checkboxWrapperClass="!w-fit"
                labelClass="font-semibold"
                class="!w-fit"
            />
            <SwitchField 
                v-if="options.length && isPlaygroundEnabled"
                id="show-playground"
                v-model="showPlayground"
                label="Show playground"
                checkboxWrapperClass="!w-fit"
                labelClass="font-semibold"
                class="!w-fit"
            />
        </div>
        
        <!-- Main container wrapper -->
        <div
            ref="resizeHostRef"
            :class="[
                'w-full',
                'flex',
                'relative',
                'items-stretch',
            ]"
        >
            <!-- Main wrapper -->
            <div
                ref="mainWrapperRef"
                :class="[
                    'flex flex-col',
                    'w-full',
                    'border border-border-neutral-subtle',
                    hasActiveResizeHandle
                        ? 'rounded-l rounded-r-none border-r-0'
                        : 'rounded',
                ]"
                :style="mainWrapperStyle"
            >
            <div 
                v-if="showPlayground && options.length && isPlaygroundEnabled"
                :class="[
                    'flex flex-col',
                    'w-full',
                    'border-b border-border-neutral-subtle',
                    'p-4',
                    'gap-4',
                ]"
            >
                <span class="font-semibold">
                    Props settings
                </span>
                <div
                    :class="[
                        'grid gap-4',
                        'grid-cols-1',
                        'md:grid-cols-2',
                        'lg:grid-cols-3',
                    ]"
                >
                    <template 
                        v-for="option in options.filter(option => !props.propsSettingsExcludedProps.includes(option.name))" 
                        :key="option.name"
                    >
                        <InputField 
                            v-if="option.type === 'string' || option.type === 'number'"
                            :id="option.name"
                            v-model="componentProps[option.name]"
                            :label="option.name"
                            placeholder="Write something"
                            :type="option.inputType"
                            :maxLength="50"
                            permitNegativeNumber
                        />
                        <SelectField 
                            v-else-if="option.type === 'array'"
                            :id="option.name"
                            v-model="componentProps[option.name]"
                            :label="option.name"
                            :options="option.options"
                        />
                        <SwitchField 
                            v-else-if="option.type === 'boolean'"
                            :id="option.name"
                            v-model="componentProps[option.name]"
                            :legend="option.name"
                            checkboxWrapperClass="!justify-start"
                        />
                    </template>
                </div>
            </div>

            <!-- Component preview wrapper -->
            <div 
                v-if="!showCode"
                :class="[
                    'flex',
                    'relative',
                    'items-center',
                    'w-full',
                    'items-center justify-center',
                    !showCode ? (hasPreviewContainerPadding ? 'py-20 px-8' : 'p-0') : 'p-8',
                    'border-b border-border-neutral-subtle',
                    componentPreviewClass,
                    'rounded',
                ]"
            >
                <template v-if="props.hasResizeHandler">
                    <iframe
                        ref="previewIframeRef"
                        :srcdoc="previewIframeSrcDoc"
                        class="w-full border-0 bg-transparent"
                        :style="previewIframeStyle"
                        title="Component preview"
                        @load="onPreviewIframeLoad"
                    />

                    <!-- Hidden source node moved into iframe document -->
                    <div class="hidden" aria-hidden="true">
                        <div
                            ref="iframePreviewContentRef"
                            :class="[
                                'flex',
                                'items-center',
                                'w-full',
                                'items-center justify-center',
                                isPreviewContentBoxed && 'p-4 md:p-8 border border-border-neutral-subtle rounded bg-background-container-surface',
                            ]"
                            :style="previewContentStyle"
                        >
                            <component 
                                :is="component" 
                                v-bind="{
                                    ...componentProps,
                                    ...componentEvents
                                }"
                            >
                                <template
                                    v-for="slotName in Object.keys(slots || {})"
                                    :key="slotName"
                                    v-slot:[slotName]="slotProps"
                                >
                                    <template v-if="slotComponentMap[slotName]">
                                        <!-- If multiple slots components -->
                                        <template v-if="Array.isArray(slotComponents?.[slotName]?.props) && slotComponents?.[slotName]?.multiple">
                                            <component
                                                :is="slotComponentMap[slotName]"
                                                v-for="(itemProps, idx) in slotComponents?.[slotName]?.props"
                                                :key="idx"
                                                v-bind="{
                                                    ...itemProps,
                                                    ...mapSlotBindings(slotComponents?.[slotName]?.slotProps || {}, slotProps),
                                                }"
                                            />
                                        </template>
                                        
                                        <!-- If single slot component  -->
                                        <component
                                            :is="slotComponentMap[slotName]"
                                            v-else
                                            v-bind="{
                                                ...slotComponents?.[slotName]?.props,
                                                ...mapSlotBindings(slotComponents?.[slotName]?.slotProps || {}, slotProps),
                                            }"
                                        />
                                    </template>
                                </template>
                            </component>
                        </div>
                    </div>
                </template>

                <div
                    v-else
                    :class="[
                        'flex',
                        'items-center',
                        'w-full',
                        'items-center justify-center',
                        isPreviewContentBoxed && 'p-4 md:p-8 border border-border-neutral-subtle rounded bg-background-container-surface',
                    ]"
                    :style="previewContentStyle"
                >
                    <component 
                        :is="component" 
                        v-bind="{
                            ...componentProps,
                            ...componentEvents
                        }"
                    >
                        <template
                            v-for="slotName in Object.keys(slots || {})"
                            :key="slotName"
                            v-slot:[slotName]="slotProps"
                        >
                            <template v-if="slotComponentMap[slotName]">
                                <!-- If multiple slots components -->
                                <template v-if="Array.isArray(slotComponents?.[slotName]?.props) && slotComponents?.[slotName]?.multiple">
                                    <component
                                        :is="slotComponentMap[slotName]"
                                        v-for="(itemProps, idx) in slotComponents?.[slotName]?.props"
                                        :key="idx"
                                        v-bind="{
                                            ...itemProps,
                                            ...mapSlotBindings(slotComponents?.[slotName]?.slotProps || {}, slotProps),
                                        }"
                                    />
                                </template>
                                
                                <!-- If single slot component  -->
                                <component
                                    :is="slotComponentMap[slotName]"
                                    v-else
                                    v-bind="{
                                        ...slotComponents?.[slotName]?.props,
                                        ...mapSlotBindings(slotComponents?.[slotName]?.slotProps || {}, slotProps),
                                    }"
                                />
                            </template>
                        </template>
                    </component>
                </div>
            </div>

            <!-- Code preview -->
            <div 
                v-if="showCode"
                :class="[
                        'relative',
                        'dark', // Forces dark mode
                        'component-code-pre',
                        'bg-background-neutral-subtlest',
                        'p-4',
                        'text-sm font-mono',
                        showPlayground ? 'rounded-b border-b border-border-neutral-subtle' : 'rounded',
                    ]"
            >
                <CopyButton 
                    :textToCopy="rawCode"
                    :size="ButtonSize.SM"
                    icon="mdi:content-copy"
                    class="absolute right-0 top-0 m-2"
                />
                <div
                    :class="[
                        'p-2',
                        'overflow-x-auto',
                    ]"
                >
                    <div v-html="code" />
                </div>
            </div>

            </div>

            <!-- Resize handler (preview only) -->
            <div
                v-if="hasActiveResizeHandle"
                ref="resizeHandleRef"
                :class="[
                    'w-6',
                    'shrink-0',
                    'border border-border-neutral-subtle',
                    'rounded-r',
                    'cursor-col-resize',
                    'select-none',
                    'flex items-center justify-center',
                    'bg-background-container-surface',
                    isResizing && 'bg-background-neutral-subtlest',
                ]"
                @mousedown="startResize"
                @touchstart="startResize"
            >
                <div 
                    :class="[
                        'w-1.5',
                        'h-16',
                        'rounded-full',
                        'bg-background-neutral-subtle',
                    ]" />
            </div>

            <!-- Drag shield prevents iframe from stealing pointer events while resizing -->
            <div
                v-if="hasActiveResizeHandle && isResizing"
                :class="[
                    'absolute inset-0 z-30',
                    'cursor-col-resize',
                    'touch-none select-none',
                ]"
                @mouseup="stopResize"
                @touchend="stopResize"
            />

        </div>
    </div>
</template>
<script setup lang="ts">
// Imports
// import { createHighlighter } from 'shiki'

// Props
const props = defineProps({
    srcDir: String as PropType<string>,
    items: Object as PropType<{ [key: string]: SelectOption[] }>,
    props: Object as PropType<{ [key: string]: any }>,
    slots: Object as PropType<{ [key: string]: any }>,
    slotComponents: {
        type: Object as PropType<Record<string, {
            srcDir: string
            props?: Record<string, any>,
            slotProps?: Record<string, string>,
            multiple?: boolean, // Loop slot components
            componentSource?: 'docs' | 'design-system',
        }>>,
        default: () => ({}),
    },
    model: Object as PropType<{ [key: string]: string[] }>,
    emits: Object as PropType<{ [key: string]: string }>,
    previewBackground: {
        type: String as PropType<'white' | 'neutral-subtle'>,
        default: 'neutral-subtle'
    },
    previewContentMaxWidth: Number as PropType<number>,
    isPreviewContentBoxed: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    hasPreviewContainerPadding: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    propsSettingsExcludedProps: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    isCodePreviewEnabled: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    isPlaygroundEnabled: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    external: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    externalTypes: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    componentSource: {
        type: String as PropType<'docs' | 'design-system'>,
        default: 'design-system',
    },
    renderOriginalCode: {
        type: String as PropType<'false' | 'full' | 'template' | 'script'>,
        default: 'false',
    },
    hasResizeHandler: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    enums: {
        type: Object as PropType<Record<string, string>>,
        default: () => ({}),
    },
})

// States
const code = ref('')
const rawCode = ref('')
const showCode = ref(false)
const showPlayground = ref(false)
const isResizing = ref(false)
const resizeHostRef = ref<HTMLElement | null>(null)
const resizeHandleRef = ref<HTMLElement | null>(null)
const mainWrapperRef = ref<HTMLElement | null>(null)
const mainWrapperWidth = ref<number | null>(null)
const resizeOriginX = ref(0)
const resizeOriginWidth = ref(0)
const previewIframeRef = ref<HTMLIFrameElement | null>(null)
const iframePreviewContentRef = ref<HTMLElement | null>(null)
const previewIframeHeight = ref<number | null>(null)

const RESIZE_HANDLER_WIDTH = 32
const MIN_RESIZABLE_WIDTH = 320

const previewIframeSrcDoc = `<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
        html, body {
            margin: 0;
            padding: 0;
            background: transparent;
        }

        #component-code-iframe-root {
            width: 100%;
        }
    </style>
</head>
<body>
    <div id="component-code-iframe-root"></div>
</body>
</html>`

let iframeContentObserver: MutationObserver | null = null
let iframeResizeObserver: ResizeObserver | null = null
let previewHeightRafId: number | null = null

const schedulePreviewIframeHeightUpdate = () => {
    if (!hasActiveResizeHandle.value) {
        return
    }

    if (previewHeightRafId !== null) {
        cancelAnimationFrame(previewHeightRafId)
    }

    previewHeightRafId = requestAnimationFrame(() => {
        previewHeightRafId = null
        updatePreviewIframeHeight()
    })
}

const getClientX = (event: MouseEvent | TouchEvent) => {
    if ('touches' in event) {
        return event.touches[0]?.clientX ?? event.changedTouches[0]?.clientX ?? 0
    }

    return event.clientX
}

const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max)
}

const stopResize = () => {
    if (!isResizing.value) {
        return
    }

    isResizing.value = false

    globalThis.removeEventListener('mousemove', onResizeMove)
    globalThis.removeEventListener('mouseup', stopResize)
    globalThis.removeEventListener('touchmove', onResizeMove)
    globalThis.removeEventListener('touchend', stopResize)

    document.body.style.removeProperty('user-select')
    document.body.style.removeProperty('cursor')
}

const onResizeMove = (event: MouseEvent | TouchEvent) => {
    if (!isResizing.value) {
        return
    }

    if ('buttons' in event && event.buttons === 0) {
        stopResize()
        return
    }

    if ('touches' in event) {
        event.preventDefault()
    }

    const hostWidth = resizeHostRef.value?.getBoundingClientRect().width ?? resizeOriginWidth.value
    const handleWidth = resizeHandleRef.value?.getBoundingClientRect().width ?? RESIZE_HANDLER_WIDTH
    const maxWidth = Math.max(hostWidth - handleWidth, MIN_RESIZABLE_WIDTH)

    const deltaX = getClientX(event) - resizeOriginX.value
    const nextWidth = clamp(resizeOriginWidth.value + deltaX, MIN_RESIZABLE_WIDTH, maxWidth)

    // Return to fluid full width when reaching the available max.
    if (nextWidth >= maxWidth - 1) {
        mainWrapperWidth.value = null
    } else {
        mainWrapperWidth.value = nextWidth
    }

    if (hasActiveResizeHandle.value) {
        schedulePreviewIframeHeightUpdate()
    }
}

const startResize = (event: MouseEvent | TouchEvent) => {
    if (!hasActiveResizeHandle.value) {
        return
    }

    if ('button' in event && event.button !== 0) {
        return
    }

    event.preventDefault()

    const currentWidth = mainWrapperRef.value?.getBoundingClientRect().width ?? 0

    if (!currentWidth) {
        return
    }

    const hostWidth = resizeHostRef.value?.getBoundingClientRect().width ?? currentWidth
    const handleWidth = resizeHandleRef.value?.getBoundingClientRect().width ?? RESIZE_HANDLER_WIDTH

    resizeOriginX.value = getClientX(event)
    resizeOriginWidth.value = mainWrapperWidth.value ?? currentWidth
    isResizing.value = true

    // Clamp start width if layout changed before dragging.
    resizeOriginWidth.value = clamp(
        resizeOriginWidth.value,
        MIN_RESIZABLE_WIDTH,
        Math.max(hostWidth - handleWidth, MIN_RESIZABLE_WIDTH),
    )

    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'col-resize'

    globalThis.addEventListener('mousemove', onResizeMove)
    globalThis.addEventListener('mouseup', stopResize)
    globalThis.addEventListener('touchmove', onResizeMove, { passive: false })
    globalThis.addEventListener('touchend', stopResize)
}

const disconnectIframeObservers = () => {
    iframeContentObserver?.disconnect()
    iframeContentObserver = null

    iframeResizeObserver?.disconnect()
    iframeResizeObserver = null

    if (previewHeightRafId !== null) {
        cancelAnimationFrame(previewHeightRafId)
        previewHeightRafId = null
    }
}

const copyPreviewStylesToIframe = (iframeDocument: Document) => {
    if (iframeDocument.head.querySelector('meta[data-component-code-styles="true"]')) {
        return
    }

    const marker = iframeDocument.createElement('meta')
    marker.dataset.componentCodeStyles = 'true'
    iframeDocument.head.appendChild(marker)

    const styleNodes = document.querySelectorAll('link[rel="stylesheet"], style')

    styleNodes.forEach(node => {
        iframeDocument.head.appendChild(node.cloneNode(true))
    })
}

const syncIframeTheme = (iframeDocument: Document) => {
    iframeDocument.documentElement.classList.toggle('dark', isDark.value)
    iframeDocument.body.classList.toggle('dark', isDark.value)
    iframeDocument.documentElement.style.colorScheme = isDark.value ? 'dark' : 'light'

    const dataTheme = document.documentElement.dataset.theme

    if (dataTheme) {
        iframeDocument.documentElement.dataset.theme = dataTheme
    } else {
        delete iframeDocument.documentElement.dataset.theme
    }
}

const updatePreviewIframeHeight = () => {
    if (!hasActiveResizeHandle.value) {
        return
    }

    const iframe = previewIframeRef.value
    const iframeDocument = iframe?.contentDocument

    if (!iframe || !iframeDocument) {
        return
    }

    const root = iframeDocument.getElementById('component-code-iframe-root')

    if (!root) {
        return
    }

    // Measure only the content wrapper. body/documentElement scrollHeight
    // report the iframe's viewport height (which we set ourselves), so they
    // would pin the height to its previous larger value when widening.
    previewIframeHeight.value = Math.max(
        Math.ceil(root.getBoundingClientRect().height),
        root.scrollHeight,
    )
}

const observePreviewIframeContent = () => {
    const iframe = previewIframeRef.value
    const iframeDocument = iframe?.contentDocument
    const root = iframeDocument?.getElementById('component-code-iframe-root')

    if (!iframe || !iframeDocument || !root) {
        return
    }

    if (!iframeContentObserver && typeof MutationObserver !== 'undefined') {
        iframeContentObserver = new MutationObserver(() => {
            schedulePreviewIframeHeightUpdate()
        })

        iframeContentObserver.observe(root, {
            subtree: true,
            childList: true,
            attributes: true,
            characterData: true,
        })
    }

    if (!iframeResizeObserver && typeof ResizeObserver !== 'undefined') {
        iframeResizeObserver = new ResizeObserver(() => {
            schedulePreviewIframeHeightUpdate()
        })
    }

    // Observe only the content wrapper — observing body/documentElement would
    // fire on every iframe viewport resize (which we trigger ourselves) and
    // can mask real content shrink events.
    iframeResizeObserver?.observe(root)
}

const syncPreviewToIframe = async () => {
    if (!hasActiveResizeHandle.value) {
        return
    }

    const iframeDocument = previewIframeRef.value?.contentDocument
    const previewContent = iframePreviewContentRef.value

    if (!iframeDocument || !previewContent) {
        return
    }

    const root = iframeDocument.getElementById('component-code-iframe-root')

    if (!root) {
        return
    }

    copyPreviewStylesToIframe(iframeDocument)
    syncIframeTheme(iframeDocument)

    if (previewContent.parentNode !== root) {
        root.appendChild(previewContent)
    }

    await nextTick()
    schedulePreviewIframeHeightUpdate()
    observePreviewIframeContent()
}

const onPreviewIframeLoad = () => {
    void syncPreviewToIframe()
}

onBeforeUnmount(() => {
    stopResize()
    disconnectIframeObservers()
})

// Dynamic component
const designSystemComponents = import.meta.glob<{ default: Component }>(
    '@air-ui/components/**/*.vue'
)

const docsComponents = import.meta.glob<{ default: Component }>(
    '/components/**/*.vue'
)

const designSystemComponentsRaw = import.meta.glob('@air-ui/components/**/*.vue', {
    query: '?raw',
    import: 'default',
}) as Record<string, () => Promise<string>>

const docsComponentsRaw = import.meta.glob('/components/**/*.vue', {
    query: '?raw',
    import: 'default',
}) as Record<string, () => Promise<string>>

const componentsMap = computed(() => {
    return props.componentSource === 'design-system'
        ? designSystemComponents
        : docsComponents
})

const componentsRawMap = computed(() => {
    return props.componentSource === 'design-system'
        ? designSystemComponentsRaw
        : docsComponentsRaw
})

// Dynamic component resolver
const component = defineAsyncComponent(() => {
    const normalizedPath = props.srcDir?.replace(/^\/+/, '') || ''

    const matchedPath = Object.keys(componentsMap.value).find(path =>
        path.endsWith(normalizedPath)
    )

    const loader = matchedPath ? componentsMap.value[matchedPath] : null

    if (loader) {
        return loader().then(mod => mod.default || mod)
    }

    console.warn(`[component previewer] Component not found: ${props.srcDir}`)

    return Promise.resolve(defineComponent({
        name: 'FallbackMessage',
        render() {
            return h('div', {
                class: 'px-2 py-1 rounded-sm bg-background-neutral-subtlest border border-border-neutral-subtle',
            }, [
                h('span', {
                    class: 'text-semibold text-text-neutral-subtle',
                }, `Component not found: ${props.srcDir}`),
            ])
        },
    }))
})

// Component Props 
const componentProps = reactive({
    ...Object.fromEntries(Object.entries(props.props || {}).map(([key, value]) => {
        return [key, value]
    }))
})

// Component Event Bindings
const componentEvents = computed(() => {
    const events: Record<string, any> = {}

    if (componentProps.modelValue !== undefined) {
        events['onUpdate:modelValue'] = (e: any) => {
            setComponentProp('modelValue', e)
        }
    }

    for (const [key] of Object.entries(props.model || {})) {
        events[`onUpdate:${key}`] = (e: any) => {
            setComponentProp(key, e)
        }
    }

    return events
})


const setComponentProp = (name: string, value: any) => {
    const index = props.external?.indexOf(name)
    const expectedType = props.externalTypes?.[index]

    if (expectedType === 'number') {
        componentProps[name] = Number(value)
    } else if (expectedType === 'boolean') {
        componentProps[name] = value === true || value === 'true'
    } else {
        componentProps[name] = value
    }
}

// Dynamic slot component
const slotComponentMap = computed(() => {
    const map: Record<string, Component | null> = {}

    for (const [slotName, slotData] of Object.entries(props.slotComponents || {})) {
        const sourceMap = (slotData.componentSource === 'docs')
            ? docsComponents
            : designSystemComponents

        const matchedPath = Object.keys(sourceMap).find(key =>
            key.endsWith(slotData.srcDir)
        )

        const loader = matchedPath ? sourceMap[matchedPath] : null

        if (loader) {
            map[slotName] = defineAsyncComponent(() => loader().then(m => m.default || m))
        } else {
            map[slotName] = defineComponent({
                name: 'FallbackMessageWrapper',
                render() {
                    return h(resolveComponent('FallbackMessage'), {
                        message: `Slot component not found: ${slotData.srcDir}`,
                    })
                },
            })
        }
    }

    return map
})


// Options for props settings 
const options = computed(() => {
    if (!props.props) return []

    return Object.entries(props.props).map(([name, value]) => {
        const itemOptions = props.items?.[name]

        // Default type mapping
        let optionType: 'string' | 'array' | 'boolean' | 'number' = 'string'
        let inputType: AllowedInputType = 'text'

        if (typeof value === 'boolean') {
            optionType = 'boolean'
        } else if (typeof value === 'number') {
            optionType = 'number'
            inputType = 'number'
        } else if (Array.isArray(itemOptions)) {
            optionType = 'array'
        }

        return {
            name,
            type: optionType,
            inputType,
            options: itemOptions || [],
        }
    })
})


// Map slot-provided values to component bindings (slot props or events)
const mapSlotBindings = (
    bindings: Record<string, string>, // Mapping of slotPropKey => binding target (prop name or event like @click)
    slotProps: Record<string, any>, // Slot props passed by the parent component
) => {
    const result: Record<string, any> = {}

    // Iterate through all binding entries
    for (const [slotPropKey, targetBinding] of Object.entries(bindings)) {
        const slotValue = slotProps?.[slotPropKey]

        // If the binding is an event (starts with "@")
        if (targetBinding.startsWith('@')) {
            // Convert "@eventName" to "onEventName" format
            const eventName = targetBinding.slice(1)
            result[`on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`] = slotValue
        } else {
            // Otherwise treat it as a regular prop binding
            result[targetBinding] = slotValue
        }
    }

    return result
}

// Composable 
/* Color mode disabled - CUrrently dark mode forced*/
/* const colorMode = useColorMode() */
const darkModeStore = useDarkMode()
const { isDark } = darkModeStore
const { $prettier } = useNuxtApp()

// Shiki highlighter
const highlighter = await useDocsShikiHighlighter()

// Utility to escape code for HTML display
const escapeHtml = (str: string) =>
    str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')

type OriginalCodeRenderMode = 'false' | 'full' | 'template' | 'script'

const normalizeOriginalCodeRenderMode = (mode: unknown): OriginalCodeRenderMode => {
    const normalizedMode = String(mode ?? 'false').toLowerCase()

    if (normalizedMode === 'full' || normalizedMode === 'template' || normalizedMode === 'script') {
        return normalizedMode
    }

    return 'false'
}

const getOriginalSource = async () => {
    const normalizedPath = props.srcDir?.replace(/^\/+/, '')

    if (!normalizedPath) {
        return ''
    }

    const matchedPath = Object.keys(componentsRawMap.value).find(path =>
        path.endsWith(normalizedPath)
    )

    const loader = matchedPath ? componentsRawMap.value[matchedPath] : null

    if (!loader) {
        console.warn(`[component previewer] Raw component source not found: ${props.srcDir}`)
        return ''
    }

    return await loader()
}

const getOriginalCodeBlock = async (mode: OriginalCodeRenderMode) => {
    if (mode === 'false') {
        return ''
    }

    const source = await getOriginalSource()

    if (!source) {
        return ''
    }

    if (mode === 'full') {
        return source.trim()
    }

    if (mode === 'template') {
        const templateMatch = source.match(/<template\b[\s\S]*?<\/template>/i)
        return templateMatch?.[0]?.trim() || ''
    }

    const scriptMatches = source.match(/<script\b[\s\S]*?<\/script>/gi)
    return scriptMatches?.map(block => block.trim()).join('\n\n') || ''
}

// Sets the correct enum value based on the provided enums mapping
const toEnumKey = (value: unknown) => {
    return String(value)
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, '_') // hyphens/spaces -> underscore
        .replace(/^_+|_+$/g, '') // trim underscores
        .toUpperCase()
}

// Code generation for <pre>
const generateCode = async () => {
    const originalCodeMode = normalizeOriginalCodeRenderMode(props.renderOriginalCode)
    const originalCodeBlock = await getOriginalCodeBlock(originalCodeMode)

    if (originalCodeBlock) {
        const formattedOriginalSource = await $prettier.format(originalCodeBlock, {
            singleAttributePerLine: true,
            parser: 'vue',
            htmlWhitespaceSensitivity: 'ignore',
            tabWidth: 4,
            useTabs: false,
            semi: false,
        })

        rawCode.value = formattedOriginalSource

        code.value = highlighter.codeToHtml(formattedOriginalSource, {
            lang: 'vue',
            theme: 'github-dark',
        })

        return
    }

    const componentName = props.srcDir?.split('/').pop()?.replace('.vue', '') || 'Component'

    // Props that should be externalized into <script setup> variables
    const externalProps = props.external || []
    const externalTypes = props.externalTypes || []

    // 1. Generate <script setup> block only if needed
    let scriptBlock = ''
    if (externalProps.length) {
        const scriptLines = externalProps.map((key, index) => {
            // Add generic type if specified (e.g., ref<string[]>)
            const type = externalTypes[index] ? `<${externalTypes[index]}>` : ''

            // Use `value` for modelValue (common convention), otherwise use the prop key
            const varName = key === 'modelValue' ? 'value' : key

            // Get the actual value to assign:
            // Try componentProps first, fallback to slotComponent props if array
            const value =
                componentProps[key] ??
                (Array.isArray(props.slotComponents?.[key]?.props)
                    ? props.slotComponents?.[key]?.props
                    : [])

            // Add inside the externalProps.map loop:
            let rawValue = value

            // Force correct initial value based on externalTypes
            if (type === '<boolean>') {
                rawValue = value === true || value === 'true'
            } else if (type === '<string>') {
                rawValue = String(value)
            } else if (type === '<number>') {
                rawValue = Number(value)
                if (isNaN(rawValue)) rawValue = 0
            } else if (type === '<any[]>') {
                rawValue = Array.isArray(value) ? value : []
            }

            const valueStr = typeof rawValue === 'object'
                ? JSON.stringify(rawValue, null, 4)
                : JSON.stringify(rawValue)

            return `const ${varName} = ref${type}(${valueStr})`
        })

        // Wrap all lines in a <script setup> block
        scriptBlock = `<script setup lang="ts">
${scriptLines.join('\n')}
<\/script>`
    }

    // 2. Generate <template> block
    const propLines = options.value.map(option => {
        const name = option.name
        const value = componentProps[name]

        // If the prop is marked as external, bind to the corresponding ref variable
        if (externalProps.includes(name)) {
            const varName = name === 'modelValue' ? 'value' : name
            return name === 'modelValue'
                ? `    v-model="${varName}"`
                : `    :${name}="${varName}"`
        }

        // If prop is defined as enum
        if (props.enums?.[name]) {
            const enumName = props.enums[name]
            const enumKey = toEnumKey(value)

            return `    :${name}="${enumName}.${enumKey}"`
        }

        // If the value is a string, bind as normal string attribute (escaped)
        if (typeof value === 'string') {
            return `    ${name}="${escapeHtml(value)}"`
        }

        // If boolean or number, bind as dynamic prop (colon syntax)
        if (typeof value === 'boolean') {
            // true → shorthand
            if (value === true) {
                return `    ${name}`
            }

            // false → explicit binding
            return `    :${name}="false"`
        }

        // For objects or arrays, stringify and escape the value
        return `    :${name}="${escapeHtml(JSON.stringify(value))}"`
    })

    // Use explicit handler from props.emits or default to empty function
    const eventLines = Object.keys(props.emits || {}).map(event => {
        return `    @${event}="${props.emits?.[event] ?? '() => {}'}"`
    })

    const allLines = [...propLines, ...eventLines]

    let templateBlock = ''

    // If component uses slots, use an open tag with children instead of self-closing
    if (!templateBlock && props.slots && Object.keys(props.slots).length > 0) {
        // Opening tag
        templateBlock += `<template>
  <${componentName}
${allLines.join('\n')}
  >`

        // Slots - Renders the slot component with possible bindings as code
        for (const slotName of Object.keys(props.slots || {})) {
            const hasSlotComponent = props.slotComponents?.[slotName]

            if (slotName === 'default') {
                if (hasSlotComponent) {
                    const slotComp = props.slotComponents[slotName]
                    if (!slotComp) return
                    const compName = slotComp.srcDir.split('/').pop()?.replace('.vue', '')

                    // If multiple slot components: render with v-for
                    if (Array.isArray(slotComp.props) && slotComp.multiple) {
                        const varName = String(slotName) === 'items' ? 'items' : `${slotName}Data`

                        // Register variable as external for <script setup>
                        externalProps.push(varName)
                        externalTypes.push('any[]')

                        templateBlock += `\n        <${compName}
                            v-for="(item, index) in ${varName}"
                            :key="index"
                            v-bind="item"
                        />`
                    } else {
                        // Single slot component: bind static + dynamic props
                        const staticProps = Object.entries(slotComp.props || {})
                        const boundSlotProps = Object.entries(slotComp.slotProps || {})

                        const propsString = [
                            ...staticProps.map(([k, v]) =>
                                typeof v === 'string' ? `${k}="${v}"` : `:${k}='${JSON.stringify(v)}'`
                            ),
                            ...boundSlotProps.map(([slotKey, directive]) => `${directive}="${slotKey}"`),
                        ].join(' ')

                        templateBlock += `\n        <${compName} ${propsString} />`
                    }
                } else {
                    // If no slot component provided, use raw slot content (string fallback)
                    templateBlock += `\n    ${props.slots[slotName]}`
                }
            } else {
                const slotComp = props.slotComponents?.[slotName]
                const compName = slotComp?.srcDir.split('/').pop()?.replace('.vue', '')

                // Extract scoped slot bindings
                const slotPropsBindings = slotComp?.slotProps || {}
                const scopedSlotKeys = Object.keys(slotPropsBindings)

                // Begin <template #slotName> with optional slot prop destructure
                if (scopedSlotKeys.length > 0) {
                    templateBlock += `\n    <template #${slotName}="{ ${scopedSlotKeys.join(', ')} }">`
                } else {
                    templateBlock += `\n    <template #${slotName}>`
                }

                // If it's an array of slot components
                if (Array.isArray(slotComp?.props) && slotComp?.multiple) {
                    const varName = slotName === 'items' ? 'items' : `${slotName}Data`
                    externalProps.push(varName)
                    externalTypes.push('any[]')

                    templateBlock += `\n        <${compName}
                        v-for="(item, index) in ${varName}"
                        :key="index"
                        v-bind="item"
                    />`
                }

                // Single slot component with bindings
                else if (slotComp) {
                    const staticProps = Object.entries(slotComp.props || {})
                    const boundSlotProps = Object.entries(slotPropsBindings)

                    const propsString = [
                        ...staticProps.map(([k, v]) =>
                            typeof v === 'string'
                                ? `${k}="${v}"`
                                : `:${k}='${JSON.stringify(v)}'`
                        ),
                        ...boundSlotProps.map(([slotKey, binding]) => {
                            return `${binding}="${slotKey}"`
                        }),
                    ].join(' ')

                    templateBlock += `\n        <${compName} ${propsString} />`
                } else {
                    // If no component, use raw fallback string content
                    templateBlock += `\n        ${props.slots[slotName]}`
                }

                templateBlock += `\n    </template>`
            }
        }

        // Closing tag
        templateBlock += `
  </${componentName}>
</template>`
    } else if (!templateBlock) {
        // Self-closing version if no slots
        templateBlock += `<template>
  <${componentName}
${allLines.join('\n')}
  />
</template>`
    }

    // 3. Combine source blocks
    // If a <script setup> block exists (external props used), include it after the template
    const source = scriptBlock
        ? `${templateBlock}\n\n${scriptBlock}`
        : templateBlock

    // Format the combined source using Prettier for consistent output
    const formattedSource = await $prettier.format(source, {
        singleAttributePerLine: true,
        parser: 'vue',
        htmlWhitespaceSensitivity: 'ignore',
        tabWidth: 4,
        useTabs: false,
        semi: false,
    })

    // Set raw code for copying
    rawCode.value = formattedSource

    // Use Shiki to highlight the formatted Vue code as HTML
    code.value = highlighter.codeToHtml(formattedSource, {
        lang: 'vue',
        theme: 'github-dark', // Original: theme: colorMode.value === 'dark' ? 'github-dark' : 'github-light',
    })
}

// Run once and when theme changes
watchEffect(generateCode)

// Computed classes
const componentPreviewClass = computed(() => {
    const variant = {
        ['white']: isDark.value ? 'bg-neutral-900/50' : 'bg-background-container-surface',
        ['neutral-subtle']: isDark.value ? 'bg-neutral-900/50' : 'bg-neutral-50',
    }

    return variant[props.previewBackground] || (isDark.value ? 'bg-neutral-900' : 'bg-neutral-50')
})

const previewContentStyle = computed(() => {
    if (!props.previewContentMaxWidth) return undefined

    return {
        maxWidth: `${props.previewContentMaxWidth}px`,
    }
})

const hasActiveResizeHandle = computed(() => {
    return props.hasResizeHandler && !showCode.value
})

const previewIframeStyle = computed(() => {
    if (!hasActiveResizeHandle.value) {
        return undefined
    }

    return {
        height: `${previewIframeHeight.value ?? 1}px`,
    }
})

const mainWrapperStyle = computed(() => {
    if (!hasActiveResizeHandle.value || !mainWrapperWidth.value) {
        return undefined
    }

    return {
        width: `${mainWrapperWidth.value}px`,
    }
})

watch(hasActiveResizeHandle, async isActive => {
    if (!isActive) {
        disconnectIframeObservers()
        previewIframeHeight.value = null
        return
    }

    await nextTick()
    await syncPreviewToIframe()
})

watch(isDark, async () => {
    if (!hasActiveResizeHandle.value) {
        return
    }

    await syncPreviewToIframe()
})
</script>