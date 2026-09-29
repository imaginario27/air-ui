export interface DesignSystemConfig {
    forms: {
        optionalLabelText: () => string
        selectPlaceholderText: () => string
        searchText: () => string
        noResultsText: () => string
        loadingOptionsText: () => string
        clearSelectionText: () => string
        clearSearchText: () => string
        fileUpload: {
            dragDropText: () => string
            selectFilesText: () => string
            uploadingText: () => string
            uploadedText: () => string
            uploadFailedText: () => string
            removeFileText: () => string
        }
    }
    actions: {
        cancelText: () => string
        clearAllText: () => string
        closeText: () => string
    }
    common: {
        loadingText: () => string
    }
}
