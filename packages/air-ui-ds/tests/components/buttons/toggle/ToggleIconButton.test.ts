import { mount } from '@vue/test-utils'
import ToggleIconButton from '@/components/buttons/toggle/ToggleIconButton.vue'
import { ButtonSize } from '@/models/enums/buttons'
import { useDSConfig } from '@/composables/useDSConfig'
import Icon from '@/components/icons/Icon.vue'

const factory = (props = {}) =>
    mount(ToggleIconButton, {
        props: { icon: 'mdi:test', ariaLabel: 'Test', ...props },
        global: { components: { Icon } },
    })

describe('ToggleIconButton responsiveSize', () => {
    it('keeps the plain size classes by default', () => {
        const classes = factory({ size: ButtonSize.SM }).find('button').classes()
        expect(classes).toContain('w-[28px]')
        expect(classes).toContain('h-[28px]')
        expect(classes.some((c) => c.startsWith('md:'))).toBe(false)
    })

    it('grows on mobile and returns to its own size from md when responsiveSize is true', () => {
        const classes = factory({ size: ButtonSize.SM, responsiveSize: true }).find('button').classes()
        expect(classes).toContain('w-[36px]')
        expect(classes).toContain('md:w-[28px]')
    })

    it('follows buttons.responsiveSize of the DS config when the prop is not set', () => {
        const dsConfig = useDSConfig()
        dsConfig.buttons.responsiveSize = true
        try {
            expect(factory({ size: ButtonSize.SM }).find('button').classes()).toContain('md:w-[28px]')
            expect(factory({ size: ButtonSize.SM, responsiveSize: false }).find('button').classes()).not.toContain(
                'md:w-[28px]',
            )
        } finally {
            dsConfig.buttons.responsiveSize = false
        }
    })
})
