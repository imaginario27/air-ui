const dsConfig = reactive<DesignSystemConfig>({
    forms: {
        optionalLabelText: () => '(optional)',
        selectPlaceholderText: () => 'Select an option',
        searchText: () => 'Search...',
        noResultsText: () => 'No results found',
        loadingOptionsText: () => 'Loading options...',
        clearSelectionText: () => 'Clear selection',
        clearSearchText: () => 'Clear search',
        fileUpload: {
            dragDropText: () => 'Drag and drop files here',
            selectFilesText: () => 'Select files',
            uploadingText: () => 'Uploading',
            uploadedText: () => 'Uploaded',
            uploadFailedText: () => 'Upload failed',
            removeFileText: () => 'Remove file',
        },
    },
    actions: {
        cancelText: () => 'Cancel',
        clearAllText: () => 'Clear all',
        closeText: () => 'Close',
    },
    common: {
        loadingText: () => 'Loading...',
    },
})

export const useDSConfig = () => dsConfig
