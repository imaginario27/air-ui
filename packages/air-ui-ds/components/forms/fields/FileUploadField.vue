<template>
    <div :class="['flex flex-col', 'w-full', 'gap-2']">
        <label v-if="label" :for="id" :class="['text-sm', 'font-semibold', 'text-left', hasError && 'text-text-error']">
            {{ label }}
            <span v-if="!required && showOptionalLabel" class="font-normal text-text-neutral-subtler">
                {{ optionalLabelText }}
            </span>
        </label>

        <!-- Help Text (top) -->
        <HelpText v-if="helpTextPosition === Position.TOP" :text="helpText" :error="error" />

        <div class="flex w-full gap-4">
            <div
                v-if="showPreview && previewImageUrl"
                :class="[
                    'flex flex-col items-center gap-2',
                    'border border-border-default rounded-lg p-2',
                    'bg-background-neutral-subtle',
                    previewContainerClasses,
                ]"
            >
                <img
                    :src="previewImageUrl"
                    :alt="label || ariaLabel || 'Preview'"
                    class="w-full h-full object-cover rounded-md"
                    @error="handlePreviewError"
                />
            </div>

            <div :class="['flex flex-col gap-2', showPreview && previewImageUrl ? 'flex-1' : 'w-full']">
                <Dropzone
                    v-model="selectedFiles"
                    v-model:total-progress="localTotalProgress"
                    :title="computedTitleText"
                    :aria-label="!label ? ariaLabel : undefined"
                    :description="computedDescriptionText"
                    :singleFileTitleText="resolvedSingleFileTitleText"
                    :icon
                    :buttonText="computedButtonText"
                    :singleFileButtonText="resolvedSingleFileButtonText"
                    :upToText="resolvedUpToText"
                    :allFilesTypeText="resolvedAllFilesTypeText"
                    :disabled
                    :multiple
                    :accept
                    :maxFileSize
                    :maxFiles
                    :fileUploadErrorMessage="resolvedFileUploadErrorMessage"
                    :itemsLayout
                    :state
                    :selectFileStrategy
                    :showSelectButton
                    :showClearAllButton
                    :clearAllButtonText="resolvedClearAllButtonText"
                    :fileTypeIconMap
                    :useServerUpload
                    :uploadUrl
                    :deleteUrl
                    :uploadHeaders
                    :uploadAdditionalData
                    :uploadWithCredentials
                    :uploadingStatusText="resolvedUploadingStatusText"
                    :successStatusText="resolvedSuccessStatusText"
                    :errorStatusText="resolvedErrorStatusText"
                    :pendingStatusText="resolvedPendingStatusText"
                    :retryIcon
                    :removeIcon
                    :retryButtonStyleType
                    :removeButtonStyleType
                    :retryIconClass
                    :removeIconClass
                    :retryButtonClass
                    :removeButtonClass
                    :maxItemsContainerHeight
                    :containerClass
                    :dropzoneClass="computedDropzoneClass"
                    :titleClass
                    :descriptionClass
                    :iconClass
                    :actionsClass
                    :listClass
                    :gridClass
                    :fileItemClass
                    :fileNameClass
                    :fileMetaClass
                    :retryAriaLabel="resolvedRetryAriaLabel"
                    :removeAriaLabel="resolvedRemoveAriaLabel"
                    :transparent
                    @error="handleDropzoneError"
                    @file-added="(file: File) => emit('file-added', file)"
                    @file-removed="(file: File) => emit('file-removed', file)"
                    @clear-all="(files: File[]) => emit('clear-all', files)"
                />

                <!-- Help Text (bottom) -->
                <HelpText v-if="helpTextPosition === Position.BOTTOM" :text="helpText" :error="error" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Imports
import fallbackPreviewThumbnail from '@/assets/images/placeholders/missing-image-placeholder.png'

// Props
const props = defineProps({
    id: {
        type: String as PropType<string>,
        required: true,
    },
    label: String as PropType<string>,
    ariaLabel: String as PropType<string>,
    title: String as PropType<string>,
    helpText: String as PropType<string>,
    helpTextPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    icon: {
        type: String as PropType<string>,
        default: 'mdi:cloud-upload-outline',
    },
    buttonText: String as PropType<string>,
    singleFileTitleText: String as PropType<string>,
    replaceTitleText: String as PropType<string>,
    singleFileButtonText: String as PropType<string>,
    replaceButtonText: String as PropType<string>,
    upToText: String as PropType<string>,
    modelValue: {
        type: Array as () => File[],
        default: () => [],
    },
    validator: {
        type: Function as PropType<(value: unknown) => string | null>,
        default: () => null,
    },
    error: {
        type: String as PropType<string>,
        default: '',
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    required: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showOptionalLabel: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    optionalLabel: {
        type: String as PropType<string>,
        default: undefined,
    },
    multiple: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    accept: {
        type: [String, Array] as PropType<string | string[]>,
        default: '*',
    },
    maxFileSize: {
        type: Number as PropType<number>,
        default: 5,
    },
    maxFiles: {
        type: Number as PropType<number>,
        default: 1,
    },
    fileUploadErrorMessage: String as PropType<string>,
    allFilesTypeText: String as PropType<string>,
    showPreview: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    previewImageUrl: String as PropType<string>,
    previewContainerClasses: {
        type: String as PropType<string>,
        default: 'w-[120px] h-[120px] min-w-[120px]',
    },
    itemsLayout: {
        type: String as PropType<DropzoneLayout>,
        default: DropzoneLayout.LIST,
        validator: (value: DropzoneLayout) => Object.values(DropzoneLayout).includes(value),
    },
    state: {
        type: String as PropType<DropzoneState>,
        default: DropzoneState.DEFAULT,
        validator: (value: DropzoneState) => Object.values(DropzoneState).includes(value),
    },
    selectFileStrategy: {
        type: String as PropType<FileSelectStrategy>,
        default: FileSelectStrategy.MERGE,
        validator: (value: FileSelectStrategy) => Object.values(FileSelectStrategy).includes(value),
    },
    showSelectButton: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    showClearAllButton: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    clearAllButtonText: String as PropType<string>,
    fileTypeIconMap: {
        type: Object as PropType<Record<string, string>>,
        default: () => ({}),
    },
    totalProgress: {
        type: Number as PropType<number>,
        default: 0,
    },
    useServerUpload: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    uploadUrl: String as PropType<string>,
    deleteUrl: String as PropType<string>,
    uploadHeaders: {
        type: Object as PropType<Record<string, string>>,
        default: () => ({}),
    },
    uploadAdditionalData: {
        type: Object as PropType<Record<string, string | Blob | number | boolean>>,
        default: () => ({}),
    },
    uploadWithCredentials: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    uploadingStatusText: String as PropType<string>,
    successStatusText: String as PropType<string>,
    errorStatusText: String as PropType<string>,
    pendingStatusText: String as PropType<string>,
    retryIcon: {
        type: String as PropType<string>,
        default: 'mdi:refresh',
    },
    removeIcon: {
        type: String as PropType<string>,
        default: 'mdi:close',
    },
    retryButtonStyleType: {
        type: String as PropType<ButtonStyleType>,
        default: ButtonStyleType.NEUTRAL_FILLED,
    },
    removeButtonStyleType: {
        type: String as PropType<ButtonStyleType>,
        default: ButtonStyleType.DELETE_FILLED,
    },
    retryIconClass: [String, Array] as PropType<string | string[]>,
    removeIconClass: [String, Array] as PropType<string | string[]>,
    retryButtonClass: String as PropType<string>,
    removeButtonClass: String as PropType<string>,
    maxItemsContainerHeight: Number as PropType<number>,
    containerClass: String as PropType<string>,
    dropzoneClass: String as PropType<string>,
    titleClass: String as PropType<string>,
    descriptionClass: String as PropType<string>,
    iconClass: [String, Array] as PropType<string | string[]>,
    actionsClass: String as PropType<string>,
    listClass: String as PropType<string>,
    gridClass: String as PropType<string>,
    fileItemClass: String as PropType<string>,
    fileNameClass: String as PropType<string>,
    fileMetaClass: String as PropType<string>,
    retryAriaLabel: String as PropType<string>,
    removeAriaLabel: String as PropType<string>,
    transparent: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    glowColorMode: {
        type: String as PropType<GlowColorMode>,
        validator: (value: GlowColorMode) => Object.values(GlowColorMode).includes(value),
    },
    glowTrigger: {
        type: String as PropType<GlowTrigger>,
        validator: (value: GlowTrigger) => Object.values(GlowTrigger).includes(value),
    },
    glowType: {
        type: String as PropType<GlowType>,
        validator: (value: GlowType) => Object.values(GlowType).includes(value),
    },
    glowOpacity: {
        type: Number as PropType<number>,
        validator: (value: number) => value >= 0 && value <= 100,
    },
    glowSize: {
        type: Number as PropType<number | null>,
        validator: (value: number | null) => value === null || value >= 0,
    },
})

// Emits
const emit = defineEmits([
    'update:modelValue',
    'update:error',
    'update:totalProgress',
    'error',
    'file-added',
    'file-removed',
    'clear-all',
])

// Validation
const validationMode = useInjectedValidationMode()

// Composables
const dsConfig = useDSConfig()
const resolvedSingleFileTitleText = computed(
    () => props.singleFileTitleText ?? dsConfig.forms.fileUpload.dragDropSingleText(),
)
const resolvedReplaceTitleText = computed(
    () => props.replaceTitleText ?? dsConfig.forms.fileUpload.replaceDescriptionText(),
)
const resolvedSingleFileButtonText = computed(
    () => props.singleFileButtonText ?? dsConfig.forms.fileUpload.selectFileText(),
)
const resolvedReplaceButtonText = computed(() => props.replaceButtonText ?? dsConfig.forms.fileUpload.replaceFileText())
const resolvedUpToText = computed(() => props.upToText ?? dsConfig.forms.fileUpload.upToText())
const resolvedFileUploadErrorMessage = computed(
    () => props.fileUploadErrorMessage ?? dsConfig.forms.fileUpload.invalidFilesText(),
)
const resolvedAllFilesTypeText = computed(() => props.allFilesTypeText ?? dsConfig.forms.fileUpload.allFileTypesText())
const resolvedPendingStatusText = computed(() => props.pendingStatusText ?? dsConfig.forms.fileUpload.pendingText())
const resolvedRetryAriaLabel = computed(() => props.retryAriaLabel ?? dsConfig.forms.fileUpload.retryUploadText())

// Toast
const { $toast } = useNuxtApp()

// States
const localTotalProgress = ref(props.totalProgress)

// Computed
const hasError = computed(() => props.error !== '')

// Glow: only the drag area glows (not the label or the help text)
const { glowClass } = useFieldGlow(props, hasError, 'fileUpload')
const computedDropzoneClass = computed(() => [...glowClass.value, props.dropzoneClass].filter(Boolean).join(' '))
const optionalLabelText = computed(() => props.optionalLabel ?? dsConfig.forms.optionalLabelText())
const resolvedTitle = computed(() => props.title ?? dsConfig.forms.fileUpload.dragDropText())
const resolvedButtonText = computed(() => props.buttonText ?? dsConfig.forms.fileUpload.selectFilesText())
const resolvedUploadingStatusText = computed(
    () => props.uploadingStatusText ?? dsConfig.forms.fileUpload.uploadingText(),
)
const resolvedSuccessStatusText = computed(() => props.successStatusText ?? dsConfig.forms.fileUpload.uploadedText())
const resolvedErrorStatusText = computed(() => props.errorStatusText ?? dsConfig.forms.fileUpload.uploadFailedText())
const resolvedRemoveAriaLabel = computed(() => props.removeAriaLabel ?? dsConfig.forms.fileUpload.removeFileText())
const resolvedClearAllButtonText = computed(() => props.clearAllButtonText ?? dsConfig.actions.clearAllText())

const acceptedFileTypes = computed(() => {
    const acceptList = Array.isArray(props.accept) ? props.accept : [props.accept]

    if (acceptList.includes('*')) return resolvedAllFilesTypeText.value

    return acceptList
        .map((entry) => {
            if (entry.startsWith('.')) return entry.slice(1).toUpperCase()

            const [typePart, slashPart] = entry.split('/')

            if (slashPart) {
                if (slashPart === '*') return (typePart ?? entry).toUpperCase()
                return slashPart.replace(/^vnd\.[^.]+\./, '').toUpperCase()
            }

            return entry.toUpperCase()
        })
        .join(', ')
})

const computedTitleText = computed(() => {
    const isReplacingExisting = props.showPreview && props.previewImageUrl && selectedFiles.value.length === 0

    if (isReplacingExisting) {
        return resolvedReplaceTitleText.value
    }

    return props.multiple ? resolvedTitle.value : resolvedSingleFileTitleText.value
})

const computedButtonText = computed(() => {
    const isReplacingExisting = props.showPreview && props.previewImageUrl && selectedFiles.value.length === 0

    if (isReplacingExisting) {
        return resolvedReplaceButtonText.value
    }

    return props.multiple ? resolvedButtonText.value : resolvedSingleFileButtonText.value
})

const computedDescriptionText = computed(() => {
    return `${acceptedFileTypes.value} ${resolvedUpToText.value} ${props.maxFileSize}MB`
})

const selectedFiles = computed({
    get: () => props.modelValue,
    set: (newFiles: File[]) => {
        emit('update:modelValue', [...newFiles])

        if (props.required) {
            runValidation(newFiles)
        }
    },
})

// Methods
const runValidation = (value: unknown = props.modelValue) => {
    if (!props.required || !props.validator) return

    const result = props.validator(value)
    emit('update:error', result ?? '')
}

const handleDropzoneError = (message: string) => {
    const resolvedMessage = message || resolvedFileUploadErrorMessage.value

    emit('error', resolvedMessage)
    $toast.error(resolvedMessage, { toastId: 'files-error' })
}

const handlePreviewError = (event: Event) => {
    const target = event.target as HTMLImageElement
    target.src = fallbackPreviewThumbnail
}

// Watchers
watch(
    () => props.modelValue,
    (newFiles) => {
        if (props.required && validationMode.value === FormValidationMode.BLUR) {
            runValidation(newFiles)
        }
    },
    { deep: true },
)

watch(
    () => props.totalProgress,
    (value) => {
        localTotalProgress.value = value
    },
)

watch(localTotalProgress, (value) => {
    emit('update:totalProgress', value)
})
</script>
