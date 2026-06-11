<template>
    <div :class="['flex flex-col', 'w-full', 'gap-2']">
        <label
            v-if="label"
            :for="id"
            :class="[
                'text-sm', 
                'font-semibold', 
                'text-left', 
                hasError && 'text-text-error'
            ]"
        >
            {{ label }}
        </label>

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
                >
            </div>

            <div
                :class="[
                    'flex flex-col gap-2',
                    showPreview && previewImageUrl
                        ? 'flex-1'
                        : 'w-full',
                ]"
            >
                <Dropzone
                    v-model="selectedFiles"
                    v-model:total-progress="localTotalProgress"
                    :title="computedTitleText"
                    :aria-label="!label ? ariaLabel : undefined"
                    :description="computedDescriptionText"
                    :singleFileTitleText
                    :icon
                    :buttonText="computedButtonText"
                    :singleFileButtonText
                    :upToText
                    :allFilesTypeText
                    :disabled
                    :multiple
                    :accept
                    :maxFileSize
                    :maxFiles
                    :fileUploadErrorMessage
                    :itemsLayout
                    :state
                    :selectFileStrategy
                    :showSelectButton
                    :showClearAllButton
                    :clearAllButtonText
                    :fileTypeIconMap
                    :useServerUpload
                    :uploadUrl
                    :deleteUrl
                    :uploadHeaders
                    :uploadAdditionalData
                    :uploadWithCredentials
                    :uploadingStatusText
                    :successStatusText
                    :errorStatusText
                    :pendingStatusText
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
                    :dropzoneClass
                    :titleClass
                    :descriptionClass
                    :iconClass
                    :actionsClass
                    :listClass
                    :gridClass
                    :fileItemClass
                    :fileNameClass
                    :fileMetaClass
                    :retryAriaLabel
                    :removeAriaLabel
                    @error="handleDropzoneError"
                    @file-added="(file: File) => emit('file-added', file)"
                    @file-removed="(file: File) => emit('file-removed', file)"
                    @clear-all="(files: File[]) => emit('clear-all', files)"
                />

                <p
                    v-if="hasError || helpText"
                    :class="[
                        'text-xs text-left',
                        hasError ? 'text-text-error' : 'text-text-neutral-subtle',
                    ]"
                >
                    {{ hasError ? error : helpText }}
                </p>
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
    title: {
        type: String as PropType<string>,
        default: 'Drag and drop files here',
    },
    helpText: String as PropType<string>,
    icon: {
        type: String as PropType<string>,
        default: 'mdi:cloud-upload-outline',
    },
    buttonText: {
        type: String as PropType<string>,
        default: 'Select files',
    },
    singleFileTitleText: {
        type: String as PropType<string>,
        default: 'Drag and drop a file here',
    },
    replaceTitleText: {
        type: String as PropType<string>,
        default: 'Upload a new file to replace current one',
    },
    singleFileButtonText: {
        type: String as PropType<string>,
        default: 'Select file',
    },
    replaceButtonText: {
        type: String as PropType<string>,
        default: 'Replace file',
    },
    upToText: {
        type: String as PropType<string>,
        default: 'up to',
    },
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
    fileUploadErrorMessage: {
        type: String as PropType<string>,
        default: 'The size or format of one ore more files is incorrect.',
    },
    allFilesTypeText: {
        type: String as PropType<string>,
        default: 'All file types',
    },
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
    clearAllButtonText: {
        type: String as PropType<string>,
        default: 'Clear all',
    },
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
    uploadingStatusText: {
        type: String as PropType<string>,
        default: 'Uploading',
    },
    successStatusText: {
        type: String as PropType<string>,
        default: 'Uploaded',
    },
    errorStatusText: {
        type: String as PropType<string>,
        default: 'Upload failed',
    },
    pendingStatusText: {
        type: String as PropType<string>,
        default: 'Pending',
    },
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
    retryAriaLabel: {
        type: String as PropType<string>,
        default: 'Retry upload',
    },
    removeAriaLabel: {
        type: String as PropType<string>,
        default: 'Remove file',
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

// Toast
const { $toast } = useNuxtApp()

// States
const localTotalProgress = ref(props.totalProgress)

// Computed
const hasError = computed(() => props.error !== '')

const acceptedFileTypes = computed(() => {
    const acceptList = Array.isArray(props.accept) ? props.accept : [props.accept]

    if (acceptList.includes('*')) return props.allFilesTypeText

    return acceptList
        .map(entry => {
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
    const isReplacingExisting =
        props.showPreview &&
        props.previewImageUrl &&
        selectedFiles.value.length === 0

    if (isReplacingExisting) {
        return props.replaceTitleText
    }

    return props.multiple ? props.title : props.singleFileTitleText
})

const computedButtonText = computed(() => {
    const isReplacingExisting =
        props.showPreview &&
        props.previewImageUrl &&
        selectedFiles.value.length === 0

    if (isReplacingExisting) {
        return props.replaceButtonText
    }

    return props.multiple ? props.buttonText : props.singleFileButtonText
})

const computedDescriptionText = computed(() => {
    return `${acceptedFileTypes.value} ${props.upToText} ${props.maxFileSize}MB`
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
    const resolvedMessage = message || props.fileUploadErrorMessage

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
    { deep: true }
)

watch(
    () => props.totalProgress,
    (value) => {
        localTotalProgress.value = value
    }
)

watch(localTotalProgress, (value) => {
    emit('update:totalProgress', value)
})
</script>
