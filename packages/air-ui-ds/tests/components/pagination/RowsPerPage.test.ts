import { mount } from '@vue/test-utils'
import RowsPerPage from '@/components/pagination/RowsPerPage.vue'

const defaultOptions = [
    { text: '5', value: 5 },
    { text: '10', value: 10 },
    { text: '25', value: 25 },
    { text: '50', value: 50 },
    { text: '100', value: 100 }
]

const factory = (props = {}) => {
    return mount(RowsPerPage, {
        props: {
            modelValue: 10,
            visible: true,
            rowsLabel: 'Rows',
            rowsOptions: defaultOptions,
            ...props
        },
        global: {
            stubs: ['DropdownSelect']
        }
    })
}

describe('RowsPerPage', () => {
    it('renders when visible is true', () => {
        const wrapper = factory()
        expect(wrapper.classes()).toContain('flex')
    })

    it('does not render DOM when visible is false', () => {
        const wrapper = factory({ visible: false })
        expect(wrapper.find('div').exists()).toBe(false)
    })
    it('renders label correctly', () => {
        const wrapper = factory({ rowsLabel: 'Items per page' })
        expect(wrapper.text()).toContain('Items per page')
    })

    it('passes modelValue and rowsOptions to DropdownSelect', () => {
        const wrapper = factory()
        const dropdown = wrapper.findComponent({ name: 'DropdownSelect' })

        expect(dropdown.exists()).toBe(true)
        expect(dropdown.props('modelValue')).toBe(10)
        expect(dropdown.props('options')).toEqual(defaultOptions)
    })

    it('emits update:modelValue when dropdown value changes', async () => {
        const wrapper = factory()
        const dropdown = wrapper.findComponent({ name: 'DropdownSelect' })

        await dropdown.vm.$emit('update:modelValue', 25)

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([25])
    })
})
