import { mount } from '@vue/test-utils'
import MissingImage from '@/components/images/MissingImage.vue'
import Icon from '@/components/icons/Icon.vue'

describe('MissingImage.vue', () => {
    const factory = (props = {}, attrs = {}) =>
        mount(MissingImage, {
            props,
            attrs,
            global: { stubs: { Icon: { name: 'Icon', props: ['name'], template: '<div class="icon-stub" />' } } },
        })

    it('renders an image-off icon', () => {
        const wrapper = factory()
        expect(wrapper.findComponent(Icon).props('name')).toBe('mdi:image-off-outline')
    })

    it('exposes alt as aria-label with role img', () => {
        const wrapper = factory({ alt: 'Broken' })
        expect(wrapper.attributes('role')).toBe('img')
        expect(wrapper.attributes('aria-label')).toBe('Broken')
    })

    it('uses semantic tokens and forwards extra classes', () => {
        const wrapper = factory({}, { class: 'w-[20px] h-[20px] rounded' })
        expect(wrapper.classes()).toEqual(expect.arrayContaining(['bg-background-neutral-subtle', 'rounded', 'w-[20px]']))
    })
})
