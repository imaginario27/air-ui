import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import FormFieldGroup from '~/components/forms/FormFieldGroup.vue'

const factory = (options = {}): VueWrapper => {
    return mount(FormFieldGroup, {
        slots: {
            default: '<div>Field content</div>'
        },
        ...options
    })
}

describe('FormFieldGroup.vue', () => {
    it('renders default title', () => {
        const wrapper = factory()
        expect(wrapper.find('h3').text()).toBe('Group title')
    })

    it('renders provided title', () => {
        const wrapper = factory({
            props: {
                title: 'User Info'
            }
        })
        expect(wrapper.find('h3').text()).toBe('User Info')
    })

    it('renders slot content', () => {
        const wrapper = factory()
        expect(wrapper.html()).toContain('Field content')
    })

    it('applies divided row classes when dividedRows is true', () => {
        const wrapper = factory({
            props: {
                dividedRows: true
            }
        })

        const container = wrapper.find('div')
        const title = wrapper.find('h3')

        expect(container.classes()).toContain('!gap-0')
        expect(container.classes()).toContain('divide-y')
        expect(container.classes()).toContain('divide-border-neutral-subtle')
        expect(container.classes()).toContain('border-b')
        expect(container.classes()).toContain('border-border-neutral-subtle')

        expect(title.classes()).toContain('mb-4')
    })

    it('does not apply divided row classes when dividedRows is false', () => {
        const wrapper = factory({
            props: {
                dividedRows: false
            }
        })

        const container = wrapper.find('div')
        const title = wrapper.find('h3')

        expect(container.classes()).not.toContain('!gap-0')
        expect(container.classes()).not.toContain('divide-y')
        expect(container.classes()).not.toContain('divide-border-neutral-subtle')
        expect(container.classes()).not.toContain('border-b')
        expect(container.classes()).not.toContain('border-border-neutral-subtle')

        expect(title.classes()).not.toContain('mb-4')
    })
})
