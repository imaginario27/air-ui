import { mount } from '@vue/test-utils'
import Spinner from '@/components/spinners/Spinner.vue'

describe('Spinner', () => {
    it('renders with correct classes', () => {
        const wrapper = mount(Spinner)
        const spinner = wrapper.find('div')

        expect(spinner.exists()).toBe(true)
        expect(spinner.classes()).toContain('animate-spin')
        expect(spinner.classes()).toContain('rounded-full')
        expect(spinner.classes()).toContain('h-4')
        expect(spinner.classes()).toContain('w-4')
        expect(spinner.classes()).toContain('border-2')
        expect(spinner.classes()).toContain('border-border-primary-brand-default')
        expect(spinner.classes()).toContain('border-t-transparent')
    })
})