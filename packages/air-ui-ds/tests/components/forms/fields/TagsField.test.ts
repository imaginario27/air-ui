import { mount } from '@vue/test-utils'
import TagsField from '~/components/forms/fields/TagsField.vue'
import BadgeStack from '~/components/badges/BadgeStack.vue'
import { FormValidationMode } from '~/models/enums/formValidations'

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

    it('renders existing tags in BadgeStack', () => {
        const wrapper = factory({ modelValue: ['Nuxt', 'TypeScript'] })
        const badgeStack = wrapper.findComponent(BadgeStack)

        expect(badgeStack.exists()).toBe(true)
        expect(badgeStack.props('items')).toEqual([
            { text: 'Nuxt' },
            { text: 'TypeScript' },
        ])
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

    it('removes selected tag when BadgeStack emits close', async () => {
        const wrapper = factory({ modelValue: ['Nuxt', 'Vue'] })
        const badgeStack = wrapper.findComponent(BadgeStack)

        await badgeStack.vm.$emit('close', { text: 'Nuxt' })

        expect(wrapper.emitted('update:modelValue')).toEqual([[['Vue']]])
    })

    it('prevents adding tags when disabled', async () => {
        const wrapper = factory({ modelValue: ['Nuxt'], disabled: true })
        const input = wrapper.find('input')

        await input.setValue('Vue')
        await input.trigger('keydown', { key: 'Enter' })

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()

        const badgeStack = wrapper.findComponent(BadgeStack)
        expect(badgeStack.props('closeable')).toBe(false)
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
})
