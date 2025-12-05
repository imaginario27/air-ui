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

    it('applies divided layout classes when dividedRows is true', () => {
        const wrapper = factory({
            props: {
                dividedRows: true
            }
        })

        const div = wrapper.find('div')
        const h3 = wrapper.find('h3')

        expect(div.classes()).toContain('!gap-0')
        expect(div.classes()).toContain('divide-y')
        expect(div.classes()).toContain('divide-border-neutral-subtle')
        expect(div.classes()).toContain('border-b')
        expect(div.classes()).toContain('border-border-neutral-subtle')

        expect(h3.classes()).toContain('mb-4')
    })

    it('does not apply divided layout classes when dividedRows is false', () => {
        const wrapper = factory({
            props: {
                dividedRows: false
            }
        })

        const div = wrapper.find('div')
        const h3 = wrapper.find('h3')

        expect(div.classes()).not.toContain('!gap-0')
        expect(div.classes()).not.toContain('divide-y')
        expect(div.classes()).not.toContain('divide-border-neutral-subtle')
        expect(div.classes()).not.toContain('border-b')
        expect(div.classes()).not.toContain('border-border-neutral-subtle')

        expect(h3.classes()).not.toContain('mb-4')
    })
})
