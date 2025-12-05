import { mount } from '@vue/test-utils'
import { defineComponent, h, Ref } from 'vue'
import { FormValidationMode } from '@/models/enums/formValidations'
import { useFormValidationMode, useInjectedValidationMode } from '@/composables/useFormValidationMode'

describe('useFormValidationMode', () => {
    it('provides and injects validation mode correctly', () => {
        let injectedMode: Ref<FormValidationMode> | undefined

        const Consumer = defineComponent({
            setup() {
                injectedMode = useInjectedValidationMode()
                return () => null
            },
        })

        const Provider = defineComponent({
            setup() {
                useFormValidationMode()
                return () => h(Consumer)
            },
        })

        mount(Provider)

        // default value is SUBMIT
        expect(injectedMode!.value).toBe(FormValidationMode.SUBMIT)

        // mutate and verify reactivity
        injectedMode!.value = FormValidationMode.BLUR
        expect(injectedMode!.value).toBe(FormValidationMode.BLUR)
    })

    it('returns fallback value when used without provider', () => {
        let injectedMode: Ref<FormValidationMode> | undefined

        const Consumer = defineComponent({
            setup() {
                injectedMode = useInjectedValidationMode()
                return () => null
            },
        })

        mount(Consumer)

        // since there's no provider, it returns the fallback ref
        expect(injectedMode!.value).toBe(FormValidationMode.SUBMIT)
    })
})
