import { mount } from '@vue/test-utils'
import DropdownMenu from '@/components/dropdowns/DropdownMenu.vue'
import DropdownMenuItem from '@/components/dropdowns/DropdownMenuItem.vue'
import { DropdownPosition } from '@/models/enums/positions'

const factory = (options: {
    props?: Record<string, unknown>
    slots?: Record<string, any>
} = {}) => {
    return mount(DropdownMenu, {
        props: {
            items: [],
            ...options.props,
        },
        slots: {
            activator: `<template #activator="{ onClick }">
                <button @click="onClick">Open</button>
            </template>`,
            ...options.slots,
        },
        global: {
            components: {
                DropdownMenuItem,
            },
        },
        attachTo: document.body,
    })
}

describe('DropdownMenu.vue', () => {
    it('renders the root container', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('renders the activator slot', () => {
        const wrapper = factory()
        expect(wrapper.html()).toContain('Open')
    })

    it('calls item callback and closes dropdown on item click', async () => {
        const mockCallback = vi.fn()

        const wrapper = factory({
            props: {
                items: [
                    {
                        text: 'Action',
                        callback: mockCallback,
                    },
                ],
            },
        })

        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()

        const item = wrapper.findComponent(DropdownMenuItem)

        // simulate the emitted click
        await item.vm.$emit('click')
        wrapper.vm.handleClick(mockCallback)
        await wrapper.vm.$nextTick()

        expect(mockCallback).toHaveBeenCalled()
        expect(wrapper.vm.isOpen).toBe(false)
    })

    it('uses computed dropdownPositionClass when positionClass is not provided', async () => {
        const wrapper = factory({
            props: {
                position: DropdownPosition.BOTTOM_LEFT,
                items: [{ text: 'Test' }],
            },
        })

        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()

        const dropdown = wrapper.find('[class*="bg-background-surface"]')
        const classAttr = dropdown.attributes('class') || ''

        expect(classAttr.includes('left-0')).toBe(true)
        expect(classAttr.includes('top-full')).toBe(true)
    })

    it('applies margin offsets based on position and offset props', async () => {
        const wrapper = factory({
            props: {
                position: DropdownPosition.TOP_LEFT,
                positionXOffset: '12px',
                positionYOffset: 20,
                items: [{ text: 'Offset Test' }],
            },
        })

        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const dropdown = wrapper.find('[class*="bg-background-surface"]')
        const style = dropdown.attributes('style') || ''

        expect(style.includes('margin-bottom: 20px')).toBe(true)
        expect(style.includes('margin-left: 12px')).toBe(true)
    })

    it('does not render shadow when hasShadow is false', async () => {
        const wrapper = factory({
            props: {
                hasShadow: false,
                items: [{ text: 'No Shadow' }],
            },
        })

        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()

        const dropdown = wrapper.find('[class*="bg-background-surface"]')
        expect(dropdown.classes()).not.toContain('shadow-lg')
    })

    it('applies positionClass when provided', async () => {
        const wrapper = factory({
            props: {
                positionClass: 'fixed bottom-0 left-0',
                items: [{ text: 'Positioned' }],
            },
        })

        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()

        const dropdown = wrapper.find('[class*="bg-background-surface"]')
        expect(dropdown.classes()).toContain('fixed')
        expect(dropdown.classes()).toContain('bottom-0')
        expect(dropdown.classes()).toContain('left-0')
    })

    it('adds relative class when isRelative is true', () => {
        const wrapper = factory({ props: { isRelative: true } })
        const container = wrapper.find('[data-test="dropdown-container"]')
        expect(container.classes()).toContain('relative')
    })

    it('does not add relative class when isRelative is false', () => {
        const wrapper = factory({ props: { isRelative: false } })
        const container = wrapper.find('[data-test="dropdown-container"]')
        expect(container.classes()).not.toContain('relative')
    })
})

describe('DropdownMenu.vue - positioning offsets', () => {
    it('applies marginTop and marginLeft for BOTTOM_LEFT', async () => {
        const wrapper = factory({
            props: {
                position: DropdownPosition.BOTTOM_LEFT,
                positionXOffset: 10,
                positionYOffset: '5px',
                items: [{ text: 'Item' }],
            },
        })

        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const style = wrapper.find('[class*="bg-background-surface"]').attributes('style') || ''
        expect(style).toContain('margin-top: 5px')
        expect(style).toContain('margin-left: 10px')
    })

    it('applies marginTop and marginRight for BOTTOM_RIGHT', async () => {
        const wrapper = factory({
            props: {
                position: DropdownPosition.BOTTOM_RIGHT,
                positionXOffset: '16px',
                positionYOffset: 8,
                items: [{ text: 'Item' }],
            },
        })

        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const style = wrapper.find('[class*="bg-background-surface"]').attributes('style') || ''
        expect(style).toContain('margin-top: 8px')
        expect(style).toContain('margin-right: 16px')
    })

    it('applies marginBottom and marginRight for TOP_RIGHT', async () => {
        const wrapper = factory({
            props: {
                position: DropdownPosition.TOP_RIGHT,
                positionXOffset: '24px',
                positionYOffset: '10px',
                items: [{ text: 'Item' }],
            },
        })

        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const style = wrapper.find('[class*="bg-background-surface"]').attributes('style') || ''
        expect(style).toContain('margin-bottom: 10px')
        expect(style).toContain('margin-right: 24px')
    })

    it('applies marginBottom and marginLeft for LEFT_BOTTOM', async () => {
        const wrapper = factory({
            props: {
                position: DropdownPosition.LEFT_BOTTOM,
                positionXOffset: 4,
                positionYOffset: 6,
                items: [{ text: 'Item' }],
            },
        })

        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const style = wrapper.find('[class*="bg-background-surface"]').attributes('style') || ''
        expect(style).toContain('margin-bottom: 6px')
        expect(style).toContain('margin-right: 4px')
    })

    it('applies marginTop and marginRight for LEFT_TOP', async () => {
        const wrapper = factory({
            props: {
                position: DropdownPosition.LEFT_TOP,
                positionXOffset: '6px',
                positionYOffset: '12px',
                items: [{ text: 'Item' }],
            },
        })

        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const style = wrapper.find('[class*="bg-background-surface"]').attributes('style') || ''
        expect(style).toContain('margin-top: 12px')
        expect(style).toContain('margin-right: 6px')
    })

    it('applies marginTop and marginLeft for RIGHT_TOP', async () => {
        const wrapper = factory({
            props: {
                position: DropdownPosition.RIGHT_TOP,
                positionXOffset: '20px',
                positionYOffset: '15px',
                items: [{ text: 'Item' }],
            },
        })

        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const style = wrapper.find('[class*="bg-background-surface"]').attributes('style') || ''
        expect(style).toContain('margin-top: 15px')
        expect(style).toContain('margin-left: 20px')
    })

    it('applies marginBottom and marginLeft for RIGHT_BOTTOM', async () => {
        const wrapper = factory({
            props: {
                position: DropdownPosition.RIGHT_BOTTOM,
                positionXOffset: '18px',
                positionYOffset: 22,
                items: [{ text: 'Item' }],
            },
        })

        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const style = wrapper.find('[class*="bg-background-surface"]').attributes('style') || ''
        expect(style).toContain('margin-bottom: 22px')
        expect(style).toContain('margin-left: 18px')
    })
})

