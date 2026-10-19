const glowDefaults = (overrides: Partial<GlowSettings> = {}): GlowSettings => ({
    colorMode: GlowColorMode.NONE,
    trigger: GlowTrigger.ALWAYS,
    type: GlowType.OUTER,
    opacity: 40,
    size: null,
    ...overrides,
})

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
    calendar: {
        previousMonthText: () => 'Previous month',
        nextMonthText: () => 'Next month',
        previousYearText: () => 'Previous year',
        nextYearText: () => 'Next year',
        openText: () => 'Open calendar',
        doneText: () => 'Done',
        clearText: () => 'Clear',
        placeholderText: () => 'Select a date',
        monthPlaceholderText: () => 'Select a month',
        weekPlaceholderText: () => 'Select a week',
        dateTimePlaceholderText: () => 'Select a date and time',
        weekText: () => 'Week',
        weekAbbreviationText: () => 'Wk',
        todayText: () => 'Today',
        moreText: () => 'more',
        dayText: () => 'Day',
        monthText: () => 'Month',
        yearText: () => 'Year',
        agendaText: () => 'Agenda',
        viewText: () => 'Calendar view',
        allDayText: () => 'All day',
        noEventsText: () => 'No events',
        editEventText: () => 'Edit event',
        deleteEventText: () => 'Delete event',
        previousText: () => 'Previous',
        nextText: () => 'Next',
    },
    timePicker: {
        openText: () => 'Open time picker',
        placeholderText: () => 'Select a time',
        hoursText: () => 'Hours',
        minutesText: () => 'Minutes',
        secondsText: () => 'Seconds',
        periodText: () => 'AM/PM',
    },
    slides: {
        previousText: () => 'Previous slide',
        nextText: () => 'Next slide',
        goToSlideText: () => 'Go to slide',
    },
    glow: {
        card: glowDefaults(),
        modal: glowDefaults({ type: GlowType.INNER }),
        button: glowDefaults(),
        // Form fields glow along the inside of their box while they have focus
        input: glowDefaults({ trigger: GlowTrigger.FOCUS, type: GlowType.INNER }),
        // The drag area has no focusable box, so it also glows on hover
        fileUpload: glowDefaults({ trigger: GlowTrigger.HOVER_FOCUS, type: GlowType.INNER }),
    },
})

export const useDSConfig = () => dsConfig
