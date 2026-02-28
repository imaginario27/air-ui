import { mount } from '@vue/test-utils'
import Drawer from '@/components/drawers/Drawer.vue'
import { Direction } from '@/models/enums/directions'

describe('Drawer.vue', () => {
    const factory = (props = {}) => {
        return mount(Drawer, {
            props: {
                modelValue: true,
                ...props,
            },
            global: {
                stubs: {
                    Transition: false,
                    ActionIconButton: {
                        template: '<button data-test="close-btn" @click="$emit(\'click\')" />',
                    },
                },
            },
            slots: {
                default: '<div data-test="content">Content</div>',
            },
        })
    }

    it('renders drawer when modelValue is true', () => {
        const wrapper = factory()

        expect(wrapper.find('aside').exists()).toBe(true)
        expect(wrapper.find('[data-test="content"]').exists()).toBe(true)
    })

    it('does not render drawer when modelValue is false', () => {
        const wrapper = factory({ modelValue: false })

        expect(wrapper.find('aside').exists()).toBe(false)
    })

    it('renders overlay when open and hasOverlay is true', () => {
        const wrapper = factory()

        expect(wrapper.find('.bg-background-overlay').exists()).toBe(true)
    })

    it('does not render overlay when hasOverlay is false', () => {
        const wrapper = factory({ hasOverlay: false })

        expect(wrapper.find('.bg-background-overlay').exists()).toBe(false)
    })

    it('emits update:modelValue false when overlay clicked and closeOnOverlayClick is true', async () => {
        const wrapper = factory()

        await wrapper.find('.bg-background-overlay').trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    })

    it('does not emit when overlay clicked and closeOnOverlayClick is false', async () => {
        const wrapper = factory({ closeOnOverlayClick: false })

        await wrapper.find('.bg-background-overlay').trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('emits update:modelValue false when close button clicked', async () => {
        const wrapper = factory()

        await wrapper.find('[data-test="close-btn"]').trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    })

    it('renders title with correct heading tag', () => {
        const wrapper = factory({
            title: 'My Drawer',
            titleHeadingTag: 'h3',
        })

        const heading = wrapper.find('h3')
        expect(heading.exists()).toBe(true)
        expect(heading.text()).toBe('My Drawer')
    })

    it('does not render header when hasHeader is false', () => {
        const wrapper = factory({ hasHeader: false })

        expect(wrapper.find('h2, h3, h4, h5, h6').exists()).toBe(false)
    })

    it('applies correct position classes for RIGHT direction', () => {
        const wrapper = factory({ direction: Direction.RIGHT })

        const aside = wrapper.find('aside')
        expect(aside.classes()).toContain('right-0')
        expect(aside.classes()).toContain('top-0')
        expect(aside.classes()).toContain('h-full')
    })

    it('applies correct position classes for LEFT direction', () => {
        const wrapper = factory({ direction: Direction.LEFT })

        const aside = wrapper.find('aside')
        expect(aside.classes()).toContain('left-0')
    })

    it('applies maxWidth style for horizontal directions', () => {
        const wrapper = factory({
            direction: Direction.RIGHT,
            maxSize: 500,
        })

        const aside = wrapper.find('aside')
        expect((aside.element as HTMLElement).style.maxWidth).toBe('500px')
    })

    it('applies maxHeight style for vertical directions', () => {
        const wrapper = factory({
            direction: Direction.TOP,
            maxSize: 400,
        })

        const aside = wrapper.find('aside')
        expect((aside.element as HTMLElement).style.maxHeight).toBe('400px')
    })

    it('applies border class when hasBorder is true', () => {
        const wrapper = factory({
            direction: Direction.RIGHT,
            hasBorder: true,
        })

        expect(wrapper.find('aside').classes()).toContain('border-l')
    })

    it('does not apply border class when hasBorder is false', () => {
        const wrapper = factory({
            hasBorder: false,
        })

        const classes = wrapper.find('aside').classes()
        expect(classes.some(c => c.startsWith('border-'))).toBe(false)
    })

    it('applies custom drawerClass and overlayClass', () => {
        const wrapper = factory({
            drawerClass: 'custom-drawer',
            overlayClass: 'custom-overlay',
        })

        expect(wrapper.find('aside').classes()).toContain('custom-drawer')
        expect(wrapper.find('.bg-background-overlay').classes()).toContain('custom-overlay')
    })
})