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
    pagination: {
        resultTextMultiplePages: () => string
        resultTextSinglePage: () => string
        resultTextSingleItem: () => string
        previousPageText: () => string
        nextPageText: () => string
        pageText: () => string
    }
    gallery: {
        loadMoreText: () => string
    }
    lightbox: {
        dialogText: () => string
        openImageText: () => string
        fullscreenText: () => string
    }
    calendar: {
        previousMonthText: () => string
        nextMonthText: () => string
        previousYearText: () => string
        nextYearText: () => string
        openText: () => string
        doneText: () => string
        clearText: () => string
        placeholderText: () => string
        monthPlaceholderText: () => string
        weekPlaceholderText: () => string
        dateTimePlaceholderText: () => string
        weekText: () => string
        weekAbbreviationText: () => string
        todayText: () => string
        moreText: () => string
        dayText: () => string
        monthText: () => string
        yearText: () => string
        agendaText: () => string
        viewText: () => string
        allDayText: () => string
        noEventsText: () => string
        editEventText: () => string
        deleteEventText: () => string
        previousText: () => string
        nextText: () => string
    }
    timePicker: {
        openText: () => string
        placeholderText: () => string
        hoursText: () => string
        minutesText: () => string
        secondsText: () => string
        periodText: () => string
    }
    slides: {
        previousText: () => string
        nextText: () => string
        goToSlideText: () => string
    }
    glow: {
        card: GlowSettings
        button: GlowSettings
        input: GlowSettings
    }
}
