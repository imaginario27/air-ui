import { mount } from '@vue/test-utils'
import Spinner from '@/components/spinners/Spinner.vue'
import { useDSConfig } from '@/composables/useDSConfig'

describe('Spinner', () => {
    it('renders with correct classes', () => {
        const wrapper = mount(Spinner)
        const spinner = wrapper.find('output')

        expect(spinner.exists()).toBe(true)
        expect(spinner.classes()).toContain('animate-spin')
        expect(spinner.classes()).toContain('rounded-full')
        expect(spinner.classes()).toContain('h-4')
        expect(spinner.classes()).toContain('w-4')
        expect(spinner.classes()).toContain('border-2')
        expect(spinner.classes()).toContain('border-border-primary-brand-default')
        expect(spinner.classes()).toContain('border-t-transparent')
    })

    it('renders as an <output> element with aria-label for screen readers', () => {
        const wrapper = mount(Spinner)
        const spinner = wrapper.find('output')

        expect(spinner.element.tagName).toBe('OUTPUT')
        expect(spinner.attributes('aria-label')).toBe('Loading')
    })

    it('takes its aria-label from the DS config and lets the prop win', () => {
        const dsConfig = useDSConfig()
        dsConfig.accessibility.spinnerText = () => 'Cargando'

        expect(mount(Spinner).attributes('aria-label')).toBe('Cargando')
        expect(mount(Spinner, { props: { ariaLabel: 'Espera' } }).attributes('aria-label')).toBe('Espera')

        dsConfig.accessibility.spinnerText = () => 'Loading'
    })
})
