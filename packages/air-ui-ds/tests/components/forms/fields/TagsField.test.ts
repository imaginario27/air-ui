import { mount } from '@vue/test-utils'
import TagsField from '~/components/forms/fields/TagsField.vue'
import Badge from '~/components/badges/Badge.vue'
import { FormValidationMode } from '~/models/enums/formValidations'
import { Position } from '@/models/enums/positions'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref(FormValidationMode.BLUR)
}))

const factory = (props: Record<string, unknown> = {}) => {
    return mount(TagsField, {
        props: {
            id: 'tags-field-id',
            ...props,
        },
    })
}

describe('TagsField.vue', () => {
    it('renders label and input', () => {
        const wrapper = factory({ label: 'Tags' })

        const label = wrapper.find('label')
        const input = wrapper.find('input')

        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('Tags')
        expect(input.exists()).toBe(true)
    })

    it('renders help text when provided and no error', () => {
        const wrapper = factory({ helpText: 'Press Enter to add a tag' })
        const helpText = wrapper.find('p')

        expect(helpText.exists()).toBe(true)
        expect(helpText.text()).toBe('Press Enter to add a tag')
    })

    it('renders help text before the input when helpTextPosition is top', () => {
        const wrapper = factory({ label: 'Tags', helpText: 'Press Enter to add', helpTextPosition: Position.TOP })
        const help = wrapper.find('p.text-xs')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('Press Enter to add')
        const children = Array.from(wrapper.element.children)
        const helpIdx = children.findIndex(el => el.classList.contains('text-xs'))
        const inputContainerIdx = children.findIndex(el => el.classList.contains('border'))
        expect(helpIdx).toBeGreaterThan(-1)
        expect(helpIdx).toBeLessThan(inputContainerIdx)
    })

    it('renders existing tags as badges', () => {
        const wrapper = factory({ modelValue: ['Nuxt', 'TypeScript'] })
        const badges = wrapper.findAllComponents(Badge)

        expect(badges).toHaveLength(2)
        expect(badges[0]?.props('text')).toBe('Nuxt')
        expect(badges[1]?.props('text')).toBe('TypeScript')
    })

    it('renders default clear button text when clear action is visible', () => {
        const wrapper = factory({ modelValue: ['Nuxt'] })
        const clearButton = wrapper.find('button[type="button"]')

        expect(clearButton.exists()).toBe(true)
        expect(clearButton.text()).toBe('Clear')
    })

    it('renders custom clear button text', () => {
        const wrapper = factory({ modelValue: ['Nuxt'], clearText: 'Remove all' })
        const clearButton = wrapper.find('button[type="button"]')

        expect(clearButton.exists()).toBe(true)
        expect(clearButton.text()).toBe('Remove all')
    })

    it('emits update:modelValue when pressing Enter with a new tag', async () => {
        const wrapper = factory({ modelValue: ['Nuxt'] })
        const input = wrapper.find('input')

        await input.setValue('Vue')
        await input.trigger('keydown', { key: 'Enter' })

        expect(wrapper.emitted('update:modelValue')).toEqual([[['Nuxt', 'Vue']]])
    })

    it('splits comma-separated input and ignores duplicate tags', async () => {
        const wrapper = factory({ modelValue: ['Nuxt'] })
        const input = wrapper.find('input')

        await input.setValue('Vue, Nuxt, Vitest')
        await input.trigger('keydown', { key: 'Enter' })

        expect(wrapper.emitted('update:modelValue')).toEqual([[['Nuxt', 'Vue', 'Vitest']]])
    })

    it('respects maxTags when adding tags', async () => {
        const wrapper = factory({ modelValue: ['Nuxt'], maxTags: 2 })
        const input = wrapper.find('input')

        await input.setValue('Vue, Vitest')
        await input.trigger('keydown', { key: 'Enter' })

        expect(wrapper.emitted('update:modelValue')).toEqual([[['Nuxt', 'Vue']]])
    })

    it('removes last tag on Backspace when input is empty', async () => {
        const wrapper = factory({ modelValue: ['Nuxt', 'Vue'] })
        const input = wrapper.find('input')

        await input.setValue('')
        await input.trigger('keydown', { key: 'Backspace' })

        expect(wrapper.emitted('update:modelValue')).toEqual([[['Nuxt']]])
    })

    it('removes selected tag when badge emits close', async () => {
        const wrapper = factory({ modelValue: ['Nuxt', 'Vue'] })
        const badges = wrapper.findAllComponents(Badge)

        await badges[0]?.vm.$emit('close')

        expect(wrapper.emitted('update:modelValue')).toEqual([[['Vue']]])
    })

    it('prevents adding tags when disabled', async () => {
        const wrapper = factory({ modelValue: ['Nuxt'], disabled: true })
        const input = wrapper.find('input')

        await input.setValue('Vue')
        await input.trigger('keydown', { key: 'Enter' })

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()

        const badges = wrapper.findAllComponents(Badge)
        expect(badges[0]?.props('closeable')).toBe(false)
    })

    it('runs validation on blur when required is true', async () => {
        const validator = vi.fn().mockReturnValue('At least one tag is required')
        const wrapper = factory({
            modelValue: [],
            required: true,
            validator,
            error: '',
        })

        const input = wrapper.find('input')
        await input.trigger('focus')
        await input.trigger('blur')

        expect(validator).toHaveBeenCalledWith([])
        expect(wrapper.emitted('update:error')).toEqual([['At least one tag is required']])
    })

    it('re-validates when modelValue changes in blur mode', async () => {
        const validator = vi.fn().mockReturnValue('Invalid tags')
        const wrapper = factory({
            modelValue: ['Nuxt'],
            required: true,
            validator,
            error: '',
        })

        await wrapper.setProps({ modelValue: ['Nuxt', 'Vue'] })

        expect(validator).toHaveBeenCalledWith(['Nuxt', 'Vue'])
        expect(wrapper.emitted('update:error')).toEqual([['Invalid tags']])
    })

    it('uses aria-label when visual label is hidden', () => {
        const wrapper = factory({
            label: '',
            ariaLabel: 'Tag input field',
        })

        const input = wrapper.find('input')

        expect(wrapper.find('label').exists()).toBe(false)
        expect(input.attributes('aria-label')).toBe('Tag input field')
    })

    it('applies bg-background-container-surface when transparent is false', () => {
        const wrapper = factory({ transparent: false })
        const container = wrapper.find('div.border')
        expect(container.classes()).toContain('bg-background-container-surface')
    })

    it('does not apply background when transparent is true', () => {
        const wrapper = factory({ transparent: true })
        const container = wrapper.find('div.border')
        expect(container.classes()).not.toContain('bg-background-container-surface')
    })

    it('applies inputClass to the input element', () => {
        const wrapper = factory({ inputClass: 'custom-tags-class' })
        const input = wrapper.find('input')
        expect(input.classes()).toContain('custom-tags-class')
    })

    it('does not apply inputClass when not provided', () => {
        const wrapper = factory()
        const input = wrapper.find('input')
        expect(input.classes()).not.toContain('custom-tags-class')
    })
})
