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
    pagination: {
        resultTextMultiplePages: () => 'Showing {from} to {to} of {total} results',
        resultTextSinglePage: () => 'Showing {total} results',
        resultTextSingleItem: () => 'Showing {total} result',
        previousPageText: () => 'Previous page',
        nextPageText: () => 'Next page',
        pageText: () => 'Page {page}',
    },
    gallery: {
        loadMoreText: () => 'Load more',
    },
    lightbox: {
        dialogText: () => 'Image lightbox',
        openImageText: () => 'Open image',
        fullscreenText: () => 'Toggle fullscreen',
    },
    slides: {
        previousText: () => 'Previous slide',
        nextText: () => 'Next slide',
        goToSlideText: () => 'Go to slide',
    },
})

export const useDSConfig = () => dsConfig
