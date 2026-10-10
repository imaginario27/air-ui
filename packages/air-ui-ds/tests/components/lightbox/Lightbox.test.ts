import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Lightbox from '@/components/lightbox/Lightbox.vue'

const IconStub = { props: ['name', 'size'], template: '<i class="icon" :data-name="name" />' }

const images: GalleryImage[] = [
    { id: 'a', src: '/a.png', alt: 'Image of a cat', caption: 'First caption' },
    { id: 'b', src: '/b.png', alt: 'A dog', caption: 'Second caption' },
    { id: 'c', src: '/c.png', alt: 'A bird' },
]

const factory = (props: Record<string, unknown> = {}) =>
    mount(Lightbox, {
        props: { modelValue: true, images, ...props },
        global: { stubs: { Icon: IconStub, teleport: true, transition: true } },
    })

const swipe = async (wrapper: ReturnType<typeof factory>, fromX: number, toX: number) => {
    const swipeArea = wrapper.get('.touch-none')
    const element = swipeArea.element as HTMLElement
    element.setPointerCapture = vi.fn()

    await swipeArea.trigger('pointerdown', { pointerId: 1, clientX: fromX, clientY: 0 })
    await swipeArea.trigger('pointermove', { pointerId: 1, clientX: toX, clientY: 0 })
    await swipeArea.trigger('pointerup', { pointerId: 1, clientX: toX, clientY: 0 })
}

describe('Lightbox', () => {
    afterEach(() => {
        document.body.style.overflow = ''
    })

    describe('rendering', () => {
        it('renders nothing while closed', () => {
            expect(factory({ modelValue: false }).find('dialog').exists()).toBe(false)
        })

        it('renders the current image with cleaned alt text', () => {
            const image = factory().get('img')

            expect(image.attributes('src')).toBe('/a.png')
            expect(image.attributes('alt')).toBe('a cat')
        })

        it('starts on the initial index', () => {
            expect(factory({ initialIndex: 1 }).get('img').attributes('src')).toBe('/b.png')
        })

        it('shows the position counter only with several images', () => {
            expect(factory({ initialIndex: 1 }).text()).toContain('2 / 3')
            expect(factory({ images: [images[0]] }).text()).not.toContain('/ 1')
        })

        it('hides the navigation buttons with a single image', () => {
            const wrapper = factory({ images: [images[0]] })

            expect(wrapper.find('[aria-label="Previous image"]').exists()).toBe(false)
            expect(wrapper.find('[aria-label="Next image"]').exists()).toBe(false)
        })

        it('shows the caption of the current image', () => {
            expect(factory().text()).toContain('First caption')
        })

        it('hides the caption when showCaption is off', () => {
            expect(factory({ showCaption: false }).text()).not.toContain('First caption')
        })

        it('uses the default labels from the DS config', () => {
            const wrapper = factory()

            expect(wrapper.get('dialog').attributes('aria-label')).toBe('Image lightbox')
            ;['Previous image', 'Next image', 'Close', 'Toggle fullscreen'].forEach((label: string) => {
                expect(wrapper.find(`[aria-label="${label}"]`).exists()).toBe(true)
            })
        })

        it('uses custom labels over the defaults', () => {
            const wrapper = factory({
                ariaLabel: 'Gallery',
                prevLabel: 'Back',
                nextLabel: 'Forward',
                closeLabel: 'Dismiss',
                fullscreenLabel: 'Maximize',
            })

            expect(wrapper.get('dialog').attributes('aria-label')).toBe('Gallery')
            ;['Back', 'Forward', 'Dismiss', 'Maximize'].forEach((label: string) => {
                expect(wrapper.find(`[aria-label="${label}"]`).exists()).toBe(true)
            })
        })

        it('applies the custom lightbox class', () => {
            expect(factory({ lightboxClass: 'custom-lightbox' }).get('dialog').classes()).toContain('custom-lightbox')
        })
    })

    describe('navigation', () => {
        it('goes to the next image and emits the new index', async () => {
            const wrapper = factory()

            await wrapper.get('[aria-label="Next image"]').trigger('click')

            expect(wrapper.get('img').attributes('src')).toBe('/b.png')
            expect(wrapper.emitted('update:index')).toEqual([[1]])
        })

        it('goes to the previous image', async () => {
            const wrapper = factory({ initialIndex: 2 })

            await wrapper.get('[aria-label="Previous image"]').trigger('click')

            expect(wrapper.get('img').attributes('src')).toBe('/b.png')
            expect(wrapper.emitted('update:index')).toEqual([[1]])
        })

        it('wraps around at both ends when looping', async () => {
            const wrapper = factory()

            await wrapper.get('[aria-label="Previous image"]').trigger('click')
            expect(wrapper.emitted('update:index')?.[0]).toEqual([2])

            await wrapper.get('[aria-label="Next image"]').trigger('click')
            expect(wrapper.emitted('update:index')?.[1]).toEqual([0])
        })

        it('stops at the ends when looping is off', async () => {
            const wrapper = factory({ loop: false })

            await wrapper.get('[aria-label="Previous image"]').trigger('click')

            expect(wrapper.emitted('update:index')).toBeUndefined()
            expect(wrapper.get('img').attributes('src')).toBe('/a.png')
        })

        it('navigates with the arrow keys', async () => {
            const wrapper = factory()

            await wrapper.get('dialog').trigger('keydown.right')
            await wrapper.get('dialog').trigger('keydown.left')

            expect(wrapper.emitted('update:index')).toEqual([[1], [0]])
        })

        it('follows a changed initial index', async () => {
            const wrapper = factory()

            await wrapper.setProps({ initialIndex: 2 })

            expect(wrapper.get('img').attributes('src')).toBe('/c.png')
        })

        it('ignores navigation when there are no images', async () => {
            const wrapper = factory({ images: [] })

            await wrapper.get('dialog').trigger('keydown.right')

            expect(wrapper.emitted('update:index')).toBeUndefined()
            expect(wrapper.find('img').exists()).toBe(false)
        })
    })

    describe('closing', () => {
        it('closes from the close button', async () => {
            const wrapper = factory()

            await wrapper.get('[aria-label="Close"]').trigger('click')

            expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
            expect(wrapper.emitted('close')).toHaveLength(1)
        })

        it('closes with the escape key', async () => {
            const wrapper = factory()

            await wrapper.get('dialog').trigger('keydown.escape')

            expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
        })

        it('closes when clicking the backdrop', async () => {
            const wrapper = factory()

            await wrapper.get('.touch-none').trigger('click')

            expect(wrapper.emitted('close')).toHaveLength(1)
        })

        it('keeps open on a backdrop click when closeOnClickOutside is off', async () => {
            const wrapper = factory({ closeOnClickOutside: false })

            await wrapper.get('.touch-none').trigger('click')

            expect(wrapper.emitted('close')).toBeUndefined()
        })
    })

    describe('swipe', () => {
        it('goes to the next image on a left swipe', async () => {
            const wrapper = factory()

            await swipe(wrapper, 200, 100)

            expect(wrapper.emitted('update:index')).toEqual([[1]])
        })

        it('goes to the previous image on a right swipe', async () => {
            const wrapper = factory({ initialIndex: 1 })

            await swipe(wrapper, 100, 200)

            expect(wrapper.emitted('update:index')).toEqual([[0]])
        })

        it('ignores a swipe shorter than the threshold', async () => {
            const wrapper = factory()

            await swipe(wrapper, 100, 120)

            expect(wrapper.emitted('update:index')).toBeUndefined()
        })

        it('does not close on the click that ends a drag', async () => {
            const wrapper = factory()

            await swipe(wrapper, 200, 100)
            await wrapper.get('.touch-none').trigger('click')

            expect(wrapper.emitted('close')).toBeUndefined()
        })

        it('ignores swipes with a single image', async () => {
            const wrapper = factory({ images: [images[0]] })

            await swipe(wrapper, 200, 100)

            expect(wrapper.emitted('update:index')).toBeUndefined()
        })
    })

    describe('scroll lock', () => {
        it('locks the page scroll while open and restores it on close', async () => {
            document.body.style.overflow = 'auto'
            const wrapper = factory({ modelValue: false })

            await wrapper.setProps({ modelValue: true })
            expect(document.body.style.overflow).toBe('hidden')

            await wrapper.setProps({ modelValue: false })
            expect(document.body.style.overflow).toBe('auto')
        })

        it('restores the page scroll when unmounted while open', async () => {
            const wrapper = factory({ modelValue: false })
            await wrapper.setProps({ modelValue: true })

            wrapper.unmount()

            expect(document.body.style.overflow).toBe('')
        })

        it('resets to the initial index when reopened', async () => {
            const wrapper = factory({ initialIndex: 0 })
            await wrapper.get('[aria-label="Next image"]').trigger('click')

            await wrapper.setProps({ modelValue: false })
            await wrapper.setProps({ modelValue: true })
            await nextTick()

            expect(wrapper.get('img').attributes('src')).toBe('/a.png')
        })
    })

    describe('fullscreen', () => {
        it('requests fullscreen from the toolbar button', async () => {
            const requestFullscreen = vi.fn().mockResolvedValue(undefined)
            document.documentElement.requestFullscreen = requestFullscreen
            const wrapper = factory()

            await wrapper.get('[aria-label="Toggle fullscreen"]').trigger('click')

            expect(requestFullscreen).toHaveBeenCalledTimes(1)
        })

        it('swaps the icon when the document enters fullscreen', async () => {
            const wrapper = factory()
            Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: document.documentElement })

            document.dispatchEvent(new Event('fullscreenchange'))
            await nextTick()

            expect(wrapper.get('[aria-label="Toggle fullscreen"] i').attributes('data-name')).toBe('mdi:fullscreen-exit')

            Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: null })
        })
    })
})
