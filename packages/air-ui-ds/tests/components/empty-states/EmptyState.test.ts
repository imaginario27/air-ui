import { mount } from '@vue/test-utils'
import EmptyStatePlaceholder from '~/components/empty-states/EmptyState.vue'
import { Orientation } from '@/models/enums/orientations'
import { EmptyPlaceholderContainerStyle } from '@/models/enums/emptyPlaceholders'
import { MdiIcon } from '#components'
import ActionButton from '@/components/buttons/ActionButton.vue'    

const factory = (props?: Partial<InstanceType<typeof EmptyStatePlaceholder>['$props']>) => {
    return mount(EmptyStatePlaceholder, {
        props,
    })
}

describe('EmptyStatePlaceholder', () => {
    it('renders with default title and icon if no props provided', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Ups! No data found')
        expect(wrapper.findComponent(MdiIcon).exists()).toBe(true)
    })

    it('renders provided title and description', () => {
        const wrapper = factory({
            title: 'No results',
            description: 'Try adjusting your filters',
        })

        expect(wrapper.text()).toContain('No results')
        expect(wrapper.text()).toContain('Try adjusting your filters')
    })

    it('renders description only if provided', () => {
        const wrapper = factory({ title: 'Only Title' })
        expect(wrapper.find('p').exists()).toBe(false)
    })

    it('applies titleClass and descriptionClass', () => {
        const wrapper = factory({
            titleClass: 'custom-title',
            description: 'Some description',
            descriptionClass: 'custom-desc',
        })

        const titleEl = wrapper.find('span')
        const descEl = wrapper.find('p')

        expect(titleEl.classes()).toContain('custom-title')
        expect(descEl.classes()).toContain('custom-desc')
    })

    it('does not apply container classes if hasContainer is false', () => {
        const wrapper = factory({
            hasContainer: false,
        })

        const outer = wrapper.find('div')
        expect(outer.classes()).not.toContain('bg-background-neutral-subtlest')
        expect(outer.classes()).not.toContain('p-[5vw]')
    })

    it('applies container class when hasContainer is true', () => {
        const wrapper = factory({
            hasContainer: true,
            containerStyle: EmptyPlaceholderContainerStyle.FILLED_PRIMARY_BRAND,
        })

        const outer = wrapper.find('div')
        expect(outer.classes()).toContain('bg-background-primary-brand-soft')
    })

    it('renders ActionButton when buttonText is provided', () => {
        const wrapper = factory({
            buttonText: 'Reload',
        })

        const button = wrapper.findComponent(ActionButton)
        expect(button.exists()).toBe(true)
        expect(button.props('text')).toBe('Reload')
    })

    it('emits buttonClick on ActionButton click', async () => {
        const wrapper = factory({
            buttonText: 'Reload',
        })

        await wrapper.findComponent(ActionButton).trigger('click')
        expect(wrapper.emitted('buttonClick')).toBeTruthy()
    })

    it('applies vertical orientation classes', () => {
        const wrapper = factory({
            orientation: Orientation.VERTICAL,
        })

        const layout = wrapper.findAll('div')[1]
        expect(layout.classes()).toContain('flex-col')
    })

    it('applies horizontal orientation classes', () => {
        const wrapper = factory({
            orientation: Orientation.HORIZONTAL,
        })

        const layout = wrapper.findAll('div')[1]
        expect(layout.classes()).toContain('sm:flex-row')
    })

    it('applies styledContainerClass when hasContainer is true', () => {
        const wrapper = factory({
            hasContainer: true,
            styledContainerClass: 'custom-styled-container',
        })

        const outer = wrapper.find('div')
        expect(outer.classes()).toContain('custom-styled-container')
    })
})
