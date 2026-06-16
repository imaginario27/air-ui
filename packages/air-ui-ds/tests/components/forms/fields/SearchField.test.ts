import { mount } from '@vue/test-utils'
import SearchField from '~/components/forms/fields/SearchField.vue'
import ActionIconButton from '~/components/buttons/ActionIconButton.vue'
import { InputSize } from '#imports'
import { Position } from '@/models/enums/positions'

const defaultProps = {
    id: 'search-input',
    maxLength: 50
}

describe('SearchField', () => {
    it('renders correctly with minimal required props', () => {
        const wrapper = mount(SearchField, {
            props: {
                ...defaultProps
            }
        })

        const input = wrapper.find('input')
        expect(input.exists()).toBe(true)
        expect(input.attributes('id')).toBe(defaultProps.id)
        expect(input.attributes('maxlength')).toBe('50')
        expect(input.attributes('placeholder')).toBe('Search')
    })

    it('renders the label when provided', () => {
        const wrapper = mount(SearchField, {
            props: {
                ...defaultProps,
                label: 'Search'
            }
        })

        const label = wrapper.find('label')
        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('Search')
        expect(label.attributes('for')).toBe(defaultProps.id)
    })

    it('binds input value to modelValue', () => {
        const wrapper = mount(SearchField, {
            props: {
                ...defaultProps,
                modelValue: 'hello'
            }
        })

        const input = wrapper.find('input')
        expect((input.element as HTMLInputElement).value).toBe('hello')
    })

    it('emits update:modelValue on input', async () => {
        const wrapper = mount(SearchField, {
            props: {
                ...defaultProps
            }
        })

        const input = wrapper.find('input')
        await input.setValue('abc')

        expect(wrapper.emitted('update:modelValue')).toEqual([['abc']])
    })

    it('renders help text if provided', () => {
        const wrapper = mount(SearchField, {
            props: {
                ...defaultProps,
                helpText: 'Helpful text here'
            }
        })

        const help = wrapper.find('p')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('Helpful text here')
    })

    it('renders help text before the input when helpTextPosition is top', () => {
        const wrapper = mount(SearchField, {
            props: {
                ...defaultProps,
                label: 'Search',
                helpText: 'Type to filter',
                helpTextPosition: Position.TOP,
            }
        })

        const help = wrapper.find('p.text-xs')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('Type to filter')
        const children = Array.from(wrapper.element.children)
        const helpIdx = children.findIndex(el => el.classList.contains('text-xs'))
        const inputContainerIdx = children.findIndex(el => el.classList.contains('rounded-full'))
        expect(helpIdx).toBeGreaterThan(-1)
        expect(helpIdx).toBeLessThan(inputContainerIdx)
    })

    it('applies readonly, autofocus, and autocomplete attributes', () => {
        const wrapper = mount(SearchField, {
            props: {
                ...defaultProps,
                readonly: true,
                autofocus: true,
                autocomplete: 'on'
            }
        })

        const input = wrapper.find('input')
        expect(input.attributes('readonly')).toBeDefined()
        expect(input.attributes('autofocus')).toBeDefined()
        expect(input.attributes('autocomplete')).toBe('on')
    })

    it('does not emit input when disabled', async () => {
        const wrapper = mount(SearchField, {
            props: {
                ...defaultProps,
                disabled: true
            }
        })

        const input = wrapper.find('input')
        await input.setValue('should not emit')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('renders the clear button only when filled', () => {
        const wrapper = mount(SearchField, {
            props: {
                ...defaultProps,
                modelValue: 'search text'
            }
        })

        const clearBtn = wrapper.findComponent(ActionIconButton)
        expect(clearBtn.exists()).toBe(true)
    })

    it('does not render clear button when empty', () => {
        const wrapper = mount(SearchField, {
            props: {
                ...defaultProps,
                modelValue: ''
            }
        })

        const clearBtn = wrapper.findComponent(ActionIconButton)
        expect(clearBtn.exists()).toBe(false)
    })

    it('clears the input when clear button is clicked', async () => {
        const wrapper = mount(SearchField, {
            props: {
                ...defaultProps,
                modelValue: 'abc'
            }
        })

        const clearBtn = wrapper.findComponent(ActionIconButton)
        await clearBtn.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toContainEqual([''])
    })

    it('applies input size class based on size prop', () => {
        const wrapper = mount(SearchField, {
            props: {
                ...defaultProps,
                size: InputSize.LG
            }
        })

        const allDivs = wrapper.findAll('div')
        const hasSizeClass = allDivs.some(div => div.classes().includes('h-[44px]'))

        expect(hasSizeClass).toBe(true)
    })

    it('filters input alphabetically if filterAlphabetic is true', async () => {
        const wrapper = mount(SearchField, {
            props: {
                ...defaultProps,
                filterAlphabetic: true
            }
        })

        const input = wrapper.find('input')
        await input.setValue('abc123!@#')

        expect(wrapper.emitted('update:modelValue')).toEqual([['abc']])
    })

    it('updates focus state on input focus/blur', async () => {
        const wrapper = mount(SearchField, {
            props: {
                ...defaultProps
            }
        })

        const input = wrapper.find('input')
        await input.trigger('focus')
        expect(wrapper.html()).toContain('ring-2')

        await input.trigger('blur')
        expect(wrapper.html()).not.toContain('ring-2')
    })

    it('clear button has default ariaLabel when field has value', () => {
        const wrapper = mount(SearchField, {
            props: {
                ...defaultProps,
                modelValue: 'test',
            }
        })

        const clearBtn = wrapper.findComponent(ActionIconButton)
        expect(clearBtn.exists()).toBe(true)
        expect(clearBtn.props('ariaLabel')).toBe('Clear search')
    })

    it('forwards custom clearAriaLabel to clear button', () => {
        const wrapper = mount(SearchField, {
            props: {
                ...defaultProps,
                modelValue: 'test',
                clearAriaLabel: 'Limpiar búsqueda',
            }
        })

        const clearBtn = wrapper.findComponent(ActionIconButton)
        expect(clearBtn.props('ariaLabel')).toBe('Limpiar búsqueda')
    })

    it('uses aria-label when visual label is hidden', () => {
        const wrapper = mount(SearchField, {
            props: {
                ...defaultProps,
                label: '',
                ariaLabel: 'Accessible search',
            }
        })

        const input = wrapper.find('input')

        expect(wrapper.find('label').exists()).toBe(false)
        expect(input.attributes('aria-label')).toBe('Accessible search')
    })

    it('applies bg-background-container-surface when transparent is false', () => {
        const wrapper = mount(SearchField, {
            props: { ...defaultProps, transparent: false }
        })
        const container = wrapper.find('div.border')
        expect(container.classes()).toContain('bg-background-container-surface')
    })

    it('does not apply background when transparent is true', () => {
        const wrapper = mount(SearchField, {
            props: { ...defaultProps, transparent: true }
        })
        const container = wrapper.find('div.border')
        expect(container.classes()).not.toContain('bg-background-container-surface')
    })

    it('applies inputClass to the input element', () => {
        const wrapper = mount(SearchField, {
            props: { ...defaultProps, inputClass: 'custom-input-class' }
        })
        const input = wrapper.find('input')
        expect(input.classes()).toContain('custom-input-class')
    })

    it('does not apply inputClass when not provided', () => {
        const wrapper = mount(SearchField, { props: { ...defaultProps } })
        const input = wrapper.find('input')
        expect(input.classes()).not.toContain('custom-input-class')
    })
})
