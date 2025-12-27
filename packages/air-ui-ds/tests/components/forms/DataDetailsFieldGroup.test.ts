import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import DataDetailsFieldGroup from '~/components/forms/DataDetailsFieldGroup.vue'

const factory = (options = {}): VueWrapper => {
    return mount(DataDetailsFieldGroup, {
        slots: {
            default: '<div>Detail group content</div>'
        },
        ...options
    })
}

describe('DataDetailsFieldGroup.vue', () => {
    it('renders default title', () => {
        const wrapper = factory()
        expect(wrapper.find('h3').text()).toBe('Group title')
    })

    it('renders custom title when provided', () => {
        const wrapper = factory({
            props: {
                title: 'Details'
            }
        })
        expect(wrapper.find('h3').text()).toBe('Details')
    })

    it('renders slot content', () => {
        const wrapper = factory()
        expect(wrapper.html()).toContain('Detail group content')
    })
})
