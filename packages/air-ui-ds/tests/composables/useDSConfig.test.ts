import { useDSConfig } from '@/composables/useDSConfig'

describe('useDSConfig', () => {
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
        expect(config.lightbox.previousText()).toBe('Previous image')
        expect(config.lightbox.nextText()).toBe('Next image')
        expect(config.lightbox.fullscreenText()).toBe('Toggle fullscreen')
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
})
