import { useDSConfig } from '@/composables/useDSConfig'

describe('useDSConfig', () => {
    it('returns no glow by default, and an inner glow on focus for inputs', () => {
        const { glow } = useDSConfig()
        const base = { colorMode: 'none', opacity: 40, size: null }

        expect(glow.card).toEqual({ ...base, trigger: 'always', type: 'outer' })
        expect(glow.modal).toEqual({ ...base, trigger: 'always', type: 'inner' })
        expect(glow.button).toEqual({ ...base, trigger: 'always', type: 'outer' })
        expect(glow.input).toEqual({ ...base, trigger: 'focus', type: 'inner' })
        expect(glow.fileUpload).toEqual({ ...base, trigger: 'hoverFocus', type: 'inner' })
    })

    it('returns expected default options', () => {
        const config = useDSConfig()

        expect(config.forms.optionalLabelText()).toBe('(optional)')
        expect(config.forms.selectPlaceholderText()).toBe('Select an option')
        expect(config.forms.searchText()).toBe('Search...')
        expect(config.forms.noResultsText()).toBe('No results found')
        expect(config.forms.loadingOptionsText()).toBe('Loading options...')
        expect(config.forms.clearSelectionText()).toBe('Clear selection')
        expect(config.forms.clearSearchText()).toBe('Clear search')
        expect(config.forms.fileUpload.dragDropText()).toBe('Drag and drop files here')
        expect(config.forms.fileUpload.selectFilesText()).toBe('Select files')
        expect(config.forms.fileUpload.uploadingText()).toBe('Uploading')
        expect(config.forms.fileUpload.uploadedText()).toBe('Uploaded')
        expect(config.forms.fileUpload.uploadFailedText()).toBe('Upload failed')
        expect(config.forms.fileUpload.removeFileText()).toBe('Remove file')
        expect(config.actions.cancelText()).toBe('Cancel')
        expect(config.actions.clearAllText()).toBe('Clear all')
        expect(config.actions.closeText()).toBe('Close')
        expect(config.common.loadingText()).toBe('Loading...')
        expect(config.pagination.resultTextMultiplePages()).toBe('Showing {from} to {to} of {total} results')
        expect(config.pagination.resultTextSinglePage()).toBe('Showing {total} results')
        expect(config.pagination.resultTextSingleItem()).toBe('Showing {total} result')
        expect(config.pagination.previousPageText()).toBe('Previous page')
        expect(config.pagination.nextPageText()).toBe('Next page')
        expect(config.pagination.pageText()).toBe('Page {page}')
        expect(config.gallery.loadMoreText()).toBe('Load more')
        expect(config.lightbox.dialogText()).toBe('Image lightbox')
        expect(config.lightbox.openImageText()).toBe('Open image')
        expect(config.lightbox.fullscreenText()).toBe('Toggle fullscreen')
        expect(config.calendar.previousMonthText()).toBe('Previous month')
        expect(config.calendar.nextMonthText()).toBe('Next month')
        expect(config.calendar.previousYearText()).toBe('Previous year')
        expect(config.calendar.nextYearText()).toBe('Next year')
        expect(config.calendar.openText()).toBe('Open calendar')
        expect(config.calendar.doneText()).toBe('Done')
        expect(config.calendar.clearText()).toBe('Clear')
        expect(config.calendar.placeholderText()).toBe('Select a date')
        expect(config.calendar.monthPlaceholderText()).toBe('Select a month')
        expect(config.calendar.weekPlaceholderText()).toBe('Select a week')
        expect(config.calendar.dateTimePlaceholderText()).toBe('Select a date and time')
        expect(config.calendar.weekText()).toBe('Week')
        expect(config.calendar.weekAbbreviationText()).toBe('Wk')
        expect(config.calendar.todayText()).toBe('Today')
        expect(config.calendar.moreText()).toBe('more')
        expect(config.calendar.dayText()).toBe('Day')
        expect(config.calendar.monthText()).toBe('Month')
        expect(config.calendar.yearText()).toBe('Year')
        expect(config.calendar.daySegmentText()).toBe('dd')
        expect(config.calendar.monthSegmentText()).toBe('mm')
        expect(config.calendar.yearSegmentText()).toBe('yyyy')
        expect(config.calendar.weekSegmentText()).toBe('ww')
        expect(config.calendar.agendaText()).toBe('Agenda')
        expect(config.calendar.viewText()).toBe('Calendar view')
        expect(config.calendar.allDayText()).toBe('All day')
        expect(config.calendar.noEventsText()).toBe('No events')
        expect(config.calendar.editEventText()).toBe('Edit event')
        expect(config.calendar.deleteEventText()).toBe('Delete event')
        expect(config.calendar.previousText()).toBe('Previous')
        expect(config.calendar.nextText()).toBe('Next')
        expect(config.timePicker.openText()).toBe('Open time picker')
        expect(config.timePicker.placeholderText()).toBe('Select a time')
        expect(config.timePicker.hoursText()).toBe('Hours')
        expect(config.timePicker.minutesText()).toBe('Minutes')
        expect(config.timePicker.secondsText()).toBe('Seconds')
        expect(config.timePicker.hoursSegmentText()).toBe('hh')
        expect(config.timePicker.minutesSegmentText()).toBe('mm')
        expect(config.timePicker.secondsSegmentText()).toBe('ss')
        expect(config.timePicker.periodSegmentText()).toBe('--')
        expect(config.timePicker.periodText()).toBe('AM/PM')
        expect(config.slides.previousText()).toBe('Previous slide')
        expect(config.slides.nextText()).toBe('Next slide')
        expect(config.slides.goToSlideText()).toBe('Go to slide')
    })

    it('is reactive and allows overriding the resolver function', () => {
        const config = useDSConfig()

        config.forms.optionalLabelText = () => '(opcional)'

        expect(config.forms.optionalLabelText()).toBe('(opcional)')
        expect(useDSConfig().forms.optionalLabelText()).toBe('(opcional)')

        config.forms.optionalLabelText = () => '(optional)'
    })

    it('shares overrides for nested groups across every call site', () => {
        const config = useDSConfig()

        config.forms.fileUpload.dragDropText = () => 'Suelta los archivos aquí'

        expect(useDSConfig().forms.fileUpload.dragDropText()).toBe('Suelta los archivos aquí')

        config.forms.fileUpload.dragDropText = () => 'Drag and drop files here'
    })

    it('shares overrides for the actions group across every call site', () => {
        const config = useDSConfig()

        config.actions.cancelText = () => 'Cancelar'

        expect(useDSConfig().actions.cancelText()).toBe('Cancelar')

        config.actions.cancelText = () => 'Cancel'
    })

    it('returns the default texts of the actions, common, loaders and navigation groups', () => {
        const config = useDSConfig()

        expect(config.actions.removeText()).toBe('Remove')
        expect(config.actions.deleteText()).toBe('Delete')
        expect(config.actions.processingText()).toBe('Processing...')
        expect(config.actions.goBackText()).toBe('Go back')
        expect(config.actions.tryAgainText()).toBe('Try again')
        expect(config.actions.copyText()).toBe('Copy')
        expect(config.actions.moreOptionsText()).toBe('More options')
        expect(config.common.notDefinedText()).toBe('Not defined')
        expect(config.common.copiedText()).toBe('Copied to clipboard')
        expect(config.common.copyFailedText()).toBe('Failed to copy to clipboard')
        expect(config.loaders.retryInText()).toBe('Retry in')
        expect(config.tables.toggleSortText()).toBe('Toggle sort')
        expect(config.pagination.rowsText()).toBe('Rows')
        expect(config.navigation.openSidebarText()).toBe('Open sidebar')
        expect(config.navigation.closeSidebarText()).toBe('Close sidebar')
        expect(config.navigation.collapseSidebarText()).toBe('Collapse sidebar')
        expect(config.navigation.expandSidebarText()).toBe('Expand sidebar')
        expect(config.navigation.openMobileMenuText()).toBe('Open mobile menu')
        expect(config.forms.togglePasswordVisibilityText()).toBe('Toggle password visibility')
        expect(config.forms.fileUpload.invalidFilesText()).toBe('The size or format of one or more files is incorrect.')
        expect(config.accessibility.ratingValueText()).toBe('Rating: {value} out of 5')
    })

    it('has the responsive sizes turned off by default', () => {
        const config = useDSConfig()

        expect(config.forms.responsiveSize).toBe(false)
        expect(config.dropdowns.responsiveSize).toBe(false)
        expect(config.treeView.responsiveSize).toBe(false)
        expect(config.navigation.responsiveSize).toBe(false)
    })
})
