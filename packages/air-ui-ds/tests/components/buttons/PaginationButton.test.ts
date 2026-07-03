// tests/unit/components/buttons/PaginationButton.spec.ts

import { mount } from '@vue/test-utils'
import PaginationButton from '@/components/buttons/PaginationButton.vue'
import { ButtonPaginationStyle } from '@/models/enums/buttons'

describe('PaginationButton', () => {
    it('renders default slot content', () => {
        const wrapper = mount(PaginationButton, {
            slots: {
                default: '1'
            }
        })

        expect(wrapper.text()).toBe('1')
    })

    it('emits click when not disabled', async () => {
        const wrapper = mount(PaginationButton)

        await wrapper.trigger('click')

        expect(wrapper.emitted('click')).toBeTruthy()
        expect(wrapper.emitted('click')?.length).toBe(1)
    })

    it('does not emit click when disabled', async () => {
        const wrapper = mount(PaginationButton, {
            props: {
                disabled: true
            }
        })

        await wrapper.trigger('click')

        expect(wrapper.emitted('click')).toBeUndefined()
    })

    it('applies correct classes for BUTTON styleType', () => {
        const wrapper = mount(PaginationButton, {
            props: {
                styleType: ButtonPaginationStyle.BUTTON
            }
        })

        const button = wrapper.get('button')

        expect(button.classes()).toContain('border')
        expect(button.classes()).toContain('first:rounded-l')
        expect(button.classes()).toContain('last:rounded-r')
    })

    it('applies correct classes for NON-BUTTON styleType', () => {
        const wrapper = mount(PaginationButton, {
            props: {
                styleType: ButtonPaginationStyle.OVERLINE 
            }
        })

        const button = wrapper.get('button')

        expect(button.classes()).toContain('border-t')
        expect(button.classes()).not.toContain('first:rounded-l')
        expect(button.classes()).not.toContain('last:rounded-r')
    })

    it('applies disabled classes when disabled', () => {
        const wrapper = mount(PaginationButton, {
            props: {
                disabled: true
            }
        })

        const button = wrapper.get('button')
        expect(button.classes()).toContain('opacity-50')
        expect(button.classes()).toContain('hover:cursor-not-allowed')
        expect(button.classes()).toContain('hover:bg-transparent')
    })

    it('applies hover class when not disabled', () => {
        const wrapper = mount(PaginationButton, {
            props: {
                disabled: false
            }
        })

        const button = wrapper.get('button')
        expect(button.classes()).toContain('hover:cursor-pointer')
    })

    it('uses default aria-label when not provided', () => {
        const wrapper = mount(PaginationButton)

        expect(wrapper.get('button').attributes('aria-label')).toBe('Navigation button')
    })

    it('applies custom aria-label when provided', () => {
        const wrapper = mount(PaginationButton, {
            props: {
                ariaLabel: 'Page 3'
            }
        })

        expect(wrapper.get('button').attributes('aria-label')).toBe('Page 3')
    })
})
