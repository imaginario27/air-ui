const validationMode = ref<FormValidationMode>(FormValidationMode.SUBMIT)

export const useFormValidationMode = () => {
    provide('formValidationMode', validationMode)
    return {
        currentFormValidationMode: validationMode,
    }
}
export const useInjectedValidationMode = () => {
    return inject<Ref<FormValidationMode>>('formValidationMode', ref(FormValidationMode.SUBMIT))
}