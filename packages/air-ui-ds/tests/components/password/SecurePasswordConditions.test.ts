import { mount, type VueWrapper } from '@vue/test-utils'
import SecurePasswordConditions from '@/components/password/SecurePasswordConditions.vue'

type Props = {
    password: string
    repeatPassword?: string
    enabledConditions?: Array<'length' | 'combination' | 'specialCharacters' | 'passwordMatch'>
}

const factory = (props: Props): VueWrapper => {
    return mount(SecurePasswordConditions, {
        props,
        global: {
            stubs: {
                SecurePasswordCondition: {
                    name: 'SecurePasswordCondition',
                    props: ['label', 'isValid'],
                    template: '<div><span>{{ label }}</span> <span>{{ isValid }}</span></div>'
                }
            }
        }
    })
}

describe('SecurePasswordConditions', () => {
    it('renders all conditions and emits true when all pass', () => {
        const wrapper = factory({
            password: 'ValidPassword#123',
            repeatPassword: 'ValidPassword#123'
        })

        const conditionLabels = wrapper.findAll('span').map(span => span.text())
        expect(conditionLabels).toContain('Password should be at least 12 characters long.')
        expect(conditionLabels).toContain('Use a mix of uppercase and lowercase letters.')
        expect(conditionLabels).toContain('Include numbers and special characters for extra security.')
        expect(conditionLabels).toContain('Both passwords must match.')

        expect(wrapper.emitted('conditions-checked')).toBeTruthy()
        const [[emittedValue]] = wrapper.emitted('conditions-checked')!
        expect(emittedValue).toBe(true)
    })

    it('emits false when some conditions fail', () => {
        const wrapper = factory({
            password: 'short',
            repeatPassword: 'short'
        })

        expect(wrapper.emitted('conditions-checked')).toBeTruthy()
        const [[emittedValue]] = wrapper.emitted('conditions-checked')!
        expect(emittedValue).toBe(false)
    })

    it('renders only enabled conditions', () => {
        const wrapper = factory({
            password: 'ValidPassword#123',
            enabledConditions: ['length', 'specialCharacters']
        })

        const conditionLabels = wrapper.findAll('span').map(span => span.text())

        expect(conditionLabels).toContain('Password should be at least 12 characters long.')
        expect(conditionLabels).toContain('Include numbers and special characters for extra security.')

        expect(conditionLabels).not.toContain('Use a mix of uppercase and lowercase letters.')
        expect(conditionLabels).not.toContain('Both passwords must match.')
    })

    it('skips passwordMatch check if repeatPassword is undefined', () => {
        const wrapper = factory({
            password: 'ValidPassword#123',
            enabledConditions: ['passwordMatch']
        })

        const conditionLabels = wrapper.findAll('span').map(span => span.text())
        expect(conditionLabels).not.toContain('Both passwords must match.')
    })

    it('emits true only if all active conditions are valid', () => {
        const wrapper = factory({
            password: 'ValidPassword#123',
            repeatPassword: 'InvalidMatch',
            enabledConditions: ['length', 'passwordMatch']
        })

        const [[emittedValue]] = wrapper.emitted('conditions-checked')!
        expect(emittedValue).toBe(false)
    })
})
