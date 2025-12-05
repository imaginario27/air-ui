import { mount } from '@vue/test-utils'
import DataField from '~/components/forms/fields/DataField.vue'

const factory = (props: Record<string, any> = {}, slots?: Record<string, any>) => {
    return mount(DataField, {
        props: {
            id: 'test-data-field',
            ...props
        },
        slots
    })
}

describe('DataField.vue', () => {
    it('renders label when provided', () => {
        const wrapper = factory({ label: 'User Email' })
        const label = wrapper.find('label')
        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('User Email')
        expect(label.attributes('for')).toBe('test-data-field')
    })

    it('does not render label if not provided', () => {
        const wrapper = factory()
        expect(wrapper.find('label').exists()).toBe(false)
    })

    it('renders text when no slot is provided and text exists', () => {
        const wrapper = factory({ text: 'john@example.com' })
        const paragraph = wrapper.find('p.text-sm')
        expect(paragraph.exists()).toBe(true)
        expect(paragraph.text()).toBe('john@example.com')
    })

    it('renders emptyText when text is empty and no slot is provided', () => {
        const wrapper = factory({ text: '', emptyText: 'N/A' })
        const empty = wrapper.find('p.text-sm.text-text-neutral-subtle')
        expect(empty.exists()).toBe(true)
        expect(empty.text()).toBe('N/A')
    })

    it('renders default emptyText if none provided and text is empty', () => {
        const wrapper = factory({ text: null })
        const empty = wrapper.find('p.text-sm.text-text-neutral-subtle')
        expect(empty.exists()).toBe(true)
        expect(empty.text()).toBe('Not defined')
    })

    it('treats numeric 0 as empty and shows emptyText', () => {
        const wrapper = factory({ text: 0, emptyText: 'No value' })
        const empty = wrapper.find('p.text-sm.text-text-neutral-subtle')
        expect(empty.exists()).toBe(true)
        expect(empty.text()).toBe('No value')
    })

    it('does not render text or emptyText if slot is provided', () => {
        const wrapper = factory(
            { text: 'Should be hidden' },
            { default: '<span>Slot content</span>' }
        )

        expect(wrapper.find('p.text-sm').exists()).toBe(false)
        expect(wrapper.find('p.text-sm.text-text-neutral-subtle').exists()).toBe(false)
        expect(wrapper.html()).toContain('Slot content')
    })

    it('renders helpText when provided', () => {
        const wrapper = factory({ helpText: 'Helpful info here' })
        const help = wrapper.find('p.text-xs.text-text-neutral-subtle')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('Helpful info here')
    })

    it('renders copy button when hasCopyToClipboardButton is true and text is present', () => {
        const wrapper = factory({
            text: 'Copy this text',
            hasCopyToClipboardButton: true
        })

        const copyBtn = wrapper.findComponent({ name: 'ActionIconButton' })
        expect(copyBtn.exists()).toBe(true)
        expect(copyBtn.props('icon')).toBe('mdiContentCopy')
        expect(copyBtn.props('size')).toBe('xs')
    })

    it('does not render copy button if hasCopyToClipboardButton is true but text is empty', () => {
        const wrapper = factory({
            text: '',
            hasCopyToClipboardButton: true
        })

        const copyBtn = wrapper.findComponent({ name: 'ActionIconButton' })
        expect(copyBtn.exists()).toBe(false)
    })

    it('does not render copy button if hasCopyToClipboardButton is false', () => {
        const wrapper = factory({
            text: 'Something',
            hasCopyToClipboardButton: false
        })

        const copyBtn = wrapper.findComponent({ name: 'ActionIconButton' })
        expect(copyBtn.exists()).toBe(false)
    })
})
