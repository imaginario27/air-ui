import { mount } from '@vue/test-utils'
import ContentPageHeader from '@/components/layouts/headers/ContentPageHeader.vue'
import { PageTitleType } from '@/models/enums/pages'
import { IconPosition } from '@/models/enums/icons'

vi.mock('vue-router', () => ({
    useRoute: () => ({
        meta: {
            title: 'Meta Title',
            overtitle: 'Meta Overtitle',
            description: 'Meta Description'
        }
    })
}))

const factory = (props = {}) => {
    return mount(ContentPageHeader, { props })
}

describe('ContentPageHeader.vue', () => {
    it('renders the title from props', () => {
        const wrapper = factory({ title: 'My Page Title' })
        expect(wrapper.find('h1').text()).toBe('My Page Title')
    })

    it('renders default title on initial render when no title prop is provided', () => {
        const wrapper = factory()
        expect(wrapper.find('h1').text()).toBe('Page title')
    })

    it('renders description from props', () => {
        const wrapper = factory({ description: 'Prop Description' })
        expect(wrapper.find('p').text()).toBe('Prop Description')
    })

    it('does not render description if no prop is provided initially', () => {
        const wrapper = factory()
        expect(wrapper.find('p').exists()).toBe(false)
    })

    it('does not render description when showDescription is false', () => {
        const wrapper = factory({ showDescription: false })
        expect(wrapper.find('p').exists()).toBe(false)
    })

    it('renders NavLink when hasGoBackLink is true', () => {
        const wrapper = factory({
            hasGoBackLink: true,
            goBackText: 'Return',
            goBackLink: '/back'
        })

        const navLink = wrapper.findComponent({ name: 'NavLink' })
        expect(navLink.exists()).toBe(true)
        expect(navLink.props('text')).toBe('Return')
        expect(navLink.props('to')).toBe('/back')
        expect(navLink.props('icon')).toBe('mdiKeyboardBackspace')
        expect(navLink.props('iconPosition')).toBe(IconPosition.LEFT)
    })

    it('renders Breadcrumbs when type is WITH_BREADCRUMBS', () => {
        const wrapper = factory({
            type: PageTitleType.WITH_BREADCRUMBS
        })

        expect(wrapper.findComponent({ name: 'Breadcrumbs' }).exists()).toBe(true)
    })

    it('renders Overtitle with default value on initial render', () => {
        const wrapper = factory({
            type: PageTitleType.WITH_OVERTITLE
        })

        const overtitle = wrapper.findComponent({ name: 'Overtitle' })
        expect(overtitle.exists()).toBe(true)
        expect(overtitle.props('title')).toBe('Overtitle')
    })

    it('uses prop overtitle when provided', () => {
        const wrapper = factory({
            type: PageTitleType.WITH_OVERTITLE,
            overtitle: 'Prop Overtitle'
        })

        const overtitle = wrapper.findComponent({ name: 'Overtitle' })
        expect(overtitle.props('title')).toBe('Prop Overtitle')
    })

    it('adds border and padding classes when enabled', () => {
        const wrapper = factory({
            hasSeparator: true,
            hasSidePadding: true
        })

        const root = wrapper.find('div')
        expect(root.classes()).toContain('border-b')
        expect(root.classes()).toContain('px-content-side-padding-mobile')
    })

    it('removes border and padding classes when disabled', () => {
        const wrapper = factory({
            hasSeparator: false,
            hasSidePadding: false
        })

        const root = wrapper.find('div')
        expect(root.classes()).not.toContain('border-b')
        expect(root.classes()).not.toContain('px-content-side-padding-mobile')
    })
})
