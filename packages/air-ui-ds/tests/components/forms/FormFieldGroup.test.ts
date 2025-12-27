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
})
