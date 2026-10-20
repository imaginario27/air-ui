export interface DesignSystemConfig {
    forms: {
        optionalLabelText: () => string
        selectPlaceholderText: () => string
        searchText: () => string
        noResultsText: () => string
        loadingOptionsText: () => string
        clearSelectionText: () => string
        clearSearchText: () => string
        togglePasswordVisibilityText: () => string
        suffixActionText: () => string
        sliderMinText: () => string
        sliderMaxText: () => string
        signHereText: () => string
        clearSignatureText: () => string
        tagsPlaceholderText: () => string
        fileUpload: {
            dragDropText: () => string
            selectFilesText: () => string
            uploadingText: () => string
            uploadedText: () => string
            uploadFailedText: () => string
            removeFileText: () => string
            selectFileText: () => string
            dragDropSingleText: () => string
            replaceFileText: () => string
            replaceDescriptionText: () => string
            allFileTypesText: () => string
            upToText: () => string
            invalidFilesText: () => string
            pendingText: () => string
            retryUploadText: () => string
        }
        repeater: {
            addText: () => string
            removeText: () => string
            moveUpAriaText: () => string
            moveDownAriaText: () => string
            moveUpText: () => string
            moveDownText: () => string
            dragHandleAriaText: () => string
        }
        rules: {
            itemAriaText: () => string
            operatorAriaText: () => string
            valueAriaText: () => string
            addText: () => string
            removeText: () => string
            moveUpAriaText: () => string
            moveDownAriaText: () => string
            dragHandleAriaText: () => string
            itemPlaceholderText: () => string
            operatorPlaceholderText: () => string
            valuePlaceholderText: () => string
        }
    }
    actions: {
        cancelText: () => string
        clearAllText: () => string
        closeText: () => string
        clearText: () => string
        deleteText: () => string
        removeText: () => string
        processingText: () => string
        goBackText: () => string
        tryAgainText: () => string
        copyText: () => string
        renameText: () => string
        moreOptionsText: () => string
        backToHomeText: () => string
    }
    common: {
        loadingText: () => string
        notDefinedText: () => string
        copiedText: () => string
        copyFailedText: () => string
        dropHereText: () => string
    }
    pagination: {
        resultTextMultiplePages: () => string
        resultTextSinglePage: () => string
        resultTextSingleItem: () => string
        previousPageText: () => string
        nextPageText: () => string
        pageText: () => string
        rowsText: () => string
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
    loaders: {
        errorTitleText: () => string
        errorDescriptionText: () => string
        retryLimitReachedText: () => string
        retryInText: () => string
    }
    tables: {
        toggleSortText: () => string
    }
    navigation: {
        openSidebarText: () => string
        closeSidebarText: () => string
        collapseSidebarText: () => string
        expandSidebarText: () => string
        openMobileMenuText: () => string
        breadcrumbText: () => string
        tableOfContentsText: () => string
    }
    cards: {
        selectText: () => string
        selectedText: () => string
        detailsText: () => string
    }
    notifications: {
        removeText: () => string
        emptyText: () => string
        loadingText: () => string
        titleText: () => string
        viewAllText: () => string
        markAllAsReadText: () => string
        allText: () => string
        unreadText: () => string
    }
    treeView: {
        loadErrorText: () => string
        labelText: () => string
    }
    accessibility: {
        toggleText: () => string
        toggleOptionsText: () => string
        optionsText: () => string
        selectStepText: () => string
        angleSliderText: () => string
        ratingText: () => string
        ratingValueText: () => string
        qrCodeText: () => string
        progressText: () => string
        navigationButtonText: () => string
        tabDecorationText: () => string
        avatarText: () => string
        spinnerText: () => string
        signaturePadText: () => string
        pinCodeText: () => string
        sliderText: () => string
        sliderThumbText: () => string
        sliderThumbIndexText: () => string
        ratingStarText: () => string
        ratingStarsText: () => string
    }
    glow: {
        card: GlowSettings
        modal: GlowSettings
        button: GlowSettings
        input: GlowSettings
        fileUpload: GlowSettings
    }
}
