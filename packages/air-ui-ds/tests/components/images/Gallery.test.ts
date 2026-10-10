import { flushPromises, mount } from '@vue/test-utils'
import Gallery from '@/components/images/Gallery.vue'
import { useDSConfig } from '@/composables/useDSConfig'

const IconStub = { props: ['name', 'size'], template: '<i class="icon" />' }

const LightboxStub = {
    props: ['modelValue', 'images', 'initialIndex', 'loop', 'showCaption'],
    emits: ['update:modelValue', 'update:index'],
    template: '<div class="lightbox-stub" />',
}

const PaginationStub = {
    props: ['modelValue', 'totalItems', 'itemsPerPage', 'showRowsPerPage', 'resultTextMultiplePages'],
    emits: ['update:modelValue'],
    template: '<nav class="pagination-stub" />',
}

const ActionButtonStub = {
    props: ['text'],
    emits: ['click'],
    template: '<button class="load-more" @click="$emit(\'click\')">{{ text }}</button>',
}

const images: GalleryImage[] = [
    { id: 'a', src: '/a.png', alt: 'A cat', caption: 'Cat' },
    { id: 'b', src: '/b.png', alt: 'A dog', caption: 'Dog' },
    { id: 'c', src: '/c.png', alt: 'A bird' },
]

const factory = (props: Record<string, unknown> = {}) =>
    mount(Gallery, {
        props: { images, ...props },
        global: {
            stubs: {
                Icon: IconStub,
                Lightbox: LightboxStub,
                ButtonPagination: { ...PaginationStub, name: 'ButtonPagination' },
                SimplePagination: { ...PaginationStub, name: 'SimplePagination' },
                ActionButton: ActionButtonStub,
            },
        },
    })

describe('Gallery', () => {
    it('renders every image in a grid with the default columns', () => {
        const wrapper = factory()
        const grid = wrapper.get('.grid')

        expect(wrapper.findAll('img')).toHaveLength(3)
        expect(grid.classes()).toEqual(expect.arrayContaining(['grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'gap-4']))
    })

    it('applies custom columns and gap', () => {
        const grid = factory({ cols: 4, tabletCols: 3, mobileCols: 2, gapClass: 'gap-8' }).get('.grid')

        expect(grid.classes()).toEqual(expect.arrayContaining(['grid-cols-2', 'sm:grid-cols-3', 'lg:grid-cols-4', 'gap-8']))
    })

    it('uses a square aspect ratio by default and accepts another', () => {
        expect(factory().findAll('.group')[0]!.classes()).toContain('aspect-[1/1]')
        expect(factory({ aspectRatio: AspectRatio.AR_4_3 }).findAll('.group')[0]!.classes()).toContain('aspect-[4/3]')
    })

    it('shows captions only when a placement is chosen', () => {
        expect(factory().find('figcaption').exists()).toBe(false)
        expect(factory({ captionPlacement: ImageCaptionPlacement.BELOW }).findAll('figcaption')).toHaveLength(2)
    })

    it('applies the hover effect to every image', () => {
        const wrapper = factory({ hoverEffect: ImageHoverEffect.GRAYSCALE })

        wrapper.findAll('img').forEach(image => expect(image.classes()).toContain('grayscale'))
    })

    it('passes the loading strategy to every image', () => {
        expect(factory().get('img').attributes('loading')).toBe('lazy')
        expect(factory({ loading: ImageLoading.EAGER }).get('img').attributes('loading')).toBe('eager')
    })

    describe('lightbox', () => {
        it('opens on the clicked image', async () => {
            const wrapper = factory()
            expect(wrapper.getComponent(LightboxStub).props('modelValue')).toBe(false)

            await wrapper.findAll('button')[1]!.trigger('click')

            const lightbox = wrapper.getComponent(LightboxStub)
            expect(lightbox.props('modelValue')).toBe(true)
            expect(lightbox.props('initialIndex')).toBe(1)
            expect(lightbox.props('images')).toEqual(images)
        })

        it('follows the lightbox navigation and closes', async () => {
            const wrapper = factory()
            await wrapper.findAll('button')[0]!.trigger('click')

            wrapper.getComponent(LightboxStub).vm.$emit('update:index', 2)
            await wrapper.vm.$nextTick()
            expect(wrapper.getComponent(LightboxStub).props('initialIndex')).toBe(2)

            wrapper.getComponent(LightboxStub).vm.$emit('update:modelValue', false)
            await wrapper.vm.$nextTick()
            expect(wrapper.getComponent(LightboxStub).props('modelValue')).toBe(false)
        })

        it('forwards loop and caption settings', () => {
            const lightbox = factory({ useLightboxLoop: false, showLightboxCaption: false }).getComponent(LightboxStub)

            expect(lightbox.props('loop')).toBe(false)
            expect(lightbox.props('showCaption')).toBe(false)
        })

        it('renders no lightbox nor buttons when disabled', () => {
            const wrapper = factory({ useLightbox: false })

            expect(wrapper.find('.lightbox-stub').exists()).toBe(false)
            expect(wrapper.find('button').exists()).toBe(false)
        })

        it('emits click with the image and its index', async () => {
            const wrapper = factory()

            await wrapper.findAll('button')[2]!.trigger('click')

            expect(wrapper.emitted('click')).toEqual([[images[2], 2]])
        })
    })

    describe('pagination', () => {
        const manyImages: GalleryImage[] = Array.from({ length: 7 }, (_, index) => ({
            id: `img-${index}`,
            src: `/img-${index}.png`,
            alt: `Image ${index}`,
        }))

        const paginated = (props: Record<string, unknown> = {}) => factory({ images: manyImages, itemsPerPage: 3, ...props })

        const sources = (wrapper: ReturnType<typeof factory>) => wrapper.findAll('img').map(image => image.attributes('src'))

        it('shows every image without pagination', () => {
            const wrapper = paginated()

            expect(wrapper.findAll('img')).toHaveLength(7)
            expect(wrapper.find('.pagination-stub').exists()).toBe(false)
            expect(wrapper.find('.load-more').exists()).toBe(false)
        })

        describe('buttons and simple modes', () => {
            it.each([
                [GalleryPaginationMode.BUTTONS, 'ButtonPagination'],
                [GalleryPaginationMode.SIMPLE, 'SimplePagination'],
            ])('shows one page at a time with the %s pagination', (paginationMode, componentName) => {
                const wrapper = paginated({ paginationMode })

                expect(sources(wrapper)).toEqual(['/img-0.png', '/img-1.png', '/img-2.png'])
                const pagination = wrapper.getComponent({ name: componentName })
                expect(pagination.props('modelValue')).toBe(1)
                expect(pagination.props('totalItems')).toBe(7)
                expect(pagination.props('itemsPerPage')).toBe(3)
            })

            it('hides the rows per page selector of the buttons pagination', () => {
                const wrapper = paginated({ paginationMode: GalleryPaginationMode.BUTTONS })

                expect(wrapper.getComponent({ name: 'ButtonPagination' }).props('showRowsPerPage')).toBe(false)
            })

            it('forwards paginationProps to the pagination, without overriding its own props', () => {
                const wrapper = paginated({
                    paginationMode: GalleryPaginationMode.BUTTONS,
                    paginationProps: { resultTextMultiplePages: 'Mostrando {from} a {to}', itemsPerPage: 99 },
                })
                const pagination = wrapper.getComponent({ name: 'ButtonPagination' })

                expect(pagination.props('resultTextMultiplePages')).toBe('Mostrando {from} a {to}')
                expect(pagination.props('itemsPerPage')).toBe(3)
            })

            it('changes page and emits update:page', async () => {
                const wrapper = paginated({ paginationMode: GalleryPaginationMode.BUTTONS })

                wrapper.getComponent({ name: 'ButtonPagination' }).vm.$emit('update:modelValue', 3)
                await wrapper.vm.$nextTick()

                expect(sources(wrapper)).toEqual(['/img-6.png'])
                expect(wrapper.emitted('update:page')).toEqual([[3]])
            })

            it('clamps out of range pages', async () => {
                const wrapper = paginated({ paginationMode: GalleryPaginationMode.SIMPLE })

                wrapper.getComponent({ name: 'SimplePagination' }).vm.$emit('update:modelValue', 99)
                await wrapper.vm.$nextTick()

                expect(wrapper.emitted('update:page')).toEqual([[3]])
            })

            it('follows the page prop', async () => {
                const wrapper = paginated({ paginationMode: GalleryPaginationMode.BUTTONS, page: 2 })
                expect(sources(wrapper)).toEqual(['/img-3.png', '/img-4.png', '/img-5.png'])

                await wrapper.setProps({ page: 3 })

                expect(sources(wrapper)).toEqual(['/img-6.png'])
            })

            it('hides the pagination when everything fits in one page', () => {
                const wrapper = paginated({ paginationMode: GalleryPaginationMode.BUTTONS, itemsPerPage: 10 })

                expect(wrapper.find('.pagination-stub').exists()).toBe(false)
            })

            it('moves back to the last page when the images shrink', async () => {
                const wrapper = paginated({ paginationMode: GalleryPaginationMode.BUTTONS, page: 3 })

                await wrapper.setProps({ images: manyImages.slice(0, 4) })

                expect(sources(wrapper)).toEqual(['/img-3.png'])
                expect(wrapper.emitted('update:page')).toEqual([[2]])
            })

            it('opens the lightbox on the index within the full list', async () => {
                const wrapper = paginated({ paginationMode: GalleryPaginationMode.BUTTONS, page: 2 })

                await wrapper.findAll('button')[1]!.trigger('click')

                const lightbox = wrapper.getComponent(LightboxStub)
                expect(lightbox.props('images')).toEqual(manyImages)
                expect(lightbox.props('initialIndex')).toBe(4)
                expect(wrapper.emitted('click')).toEqual([[manyImages[4], 4]])
            })
        })

        describe('load more mode', () => {
            it('shows the first batch and a load more button', () => {
                const wrapper = paginated({ paginationMode: GalleryPaginationMode.LOAD_MORE })

                expect(wrapper.findAll('img')).toHaveLength(3)
                expect(wrapper.get('.load-more').text()).toBe('Load more')
            })

            it('uses a custom button text', () => {
                const wrapper = paginated({ paginationMode: GalleryPaginationMode.LOAD_MORE, loadMoreText: 'Show more' })

                expect(wrapper.get('.load-more').text()).toBe('Show more')
            })

            it('adds the next batch on each click and keeps the previous images', async () => {
                const wrapper = paginated({ paginationMode: GalleryPaginationMode.LOAD_MORE })

                await wrapper.get('.load-more').trigger('click')
                expect(wrapper.findAll('img')).toHaveLength(6)

                await wrapper.get('.load-more').trigger('click')
                expect(wrapper.findAll('img')).toHaveLength(7)
                expect(wrapper.emitted('update:page')).toEqual([[2], [3]])
            })

            it('falls back to the DS config text and prefers the loadMoreText prop', () => {
                const config = useDSConfig()
                config.gallery.loadMoreText = () => 'Cargar más'

                expect(paginated({ paginationMode: GalleryPaginationMode.LOAD_MORE }).get('.load-more').text()).toBe('Cargar más')
                expect(
                    paginated({ paginationMode: GalleryPaginationMode.LOAD_MORE, loadMoreText: 'Ver más' }).get('.load-more').text()
                ).toBe('Ver más')

                config.gallery.loadMoreText = () => 'Load more'
            })

            it('removes the button once every image is shown', () => {
                const wrapper = paginated({ paginationMode: GalleryPaginationMode.LOAD_MORE, page: 3 })

                expect(wrapper.findAll('img')).toHaveLength(7)
                expect(wrapper.find('.load-more').exists()).toBe(false)
            })

            it('opens the lightbox on the clicked image', async () => {
                const wrapper = paginated({ paginationMode: GalleryPaginationMode.LOAD_MORE, page: 2 })

                await wrapper.findAll('button')[5]!.trigger('click')

                expect(wrapper.getComponent(LightboxStub).props('initialIndex')).toBe(5)
            })
        })

        describe('infinite mode', () => {
            let observers: { callback: IntersectionObserverCallback }[]

            beforeEach(() => {
                observers = []
                vi.stubGlobal(
                    'IntersectionObserver',
                    class {
                        observe = vi.fn()
                        unobserve = vi.fn()
                        disconnect = vi.fn()
                        takeRecords = () => []
                        constructor(public callback: IntersectionObserverCallback) {
                            observers.push(this)
                        }
                    }
                )
            })

            afterEach(() => {
                vi.unstubAllGlobals()
            })

            const intersect = (isIntersecting: boolean) => {
                const observer = observers.at(-1)!
                observer.callback([{ isIntersecting } as IntersectionObserverEntry], observer as unknown as IntersectionObserver)
            }

            it('renders a hidden sentinel instead of a button while there are more images', () => {
                const wrapper = paginated({ paginationMode: GalleryPaginationMode.INFINITE })

                expect(wrapper.find('.load-more').exists()).toBe(false)
                expect(wrapper.find('[aria-hidden="true"].h-px').exists()).toBe(true)
                expect(wrapper.findAll('img')).toHaveLength(3)
            })

            it('loads the next batch when the sentinel becomes visible', async () => {
                const wrapper = paginated({ paginationMode: GalleryPaginationMode.INFINITE })

                await flushPromises()
                intersect(true)
                await wrapper.vm.$nextTick()

                expect(wrapper.findAll('img')).toHaveLength(6)
                expect(wrapper.emitted('update:page')).toEqual([[2]])
            })

            it('ignores the sentinel while it is not visible', async () => {
                const wrapper = paginated({ paginationMode: GalleryPaginationMode.INFINITE })

                await flushPromises()
                intersect(false)
                await wrapper.vm.$nextTick()

                expect(wrapper.findAll('img')).toHaveLength(3)
            })

            it('removes the sentinel once every image is shown', () => {
                const wrapper = paginated({ paginationMode: GalleryPaginationMode.INFINITE, page: 3 })

                expect(wrapper.find('.h-px').exists()).toBe(false)
            })
        })
    })
})
