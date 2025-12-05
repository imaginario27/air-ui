import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { useAccordion } from '@/composables/useAccordion'

describe('useAccordion', () => {
    it('isOpen is false initially', () => {
        const wrapper = mount(defineComponent({
            setup() {
                return useAccordion()
            },
            template: '<div />',
        }))

        const vm = wrapper.vm as unknown as { isOpen: boolean }
        expect(vm.isOpen).toBe(false)
    })

    it('toggles isOpen to true when toggle is called once', async () => {
        const wrapper = mount(defineComponent({
            setup() {
                return useAccordion()
            },
            template: '<div />',
        }))

        const vm = wrapper.vm as unknown as { isOpen: boolean; toggle: () => void }
        vm.toggle()
        await wrapper.vm.$nextTick()

        expect(vm.isOpen).toBe(true)
    })

    it('toggles isOpen back to false when toggle is called twice', async () => {
        const wrapper = mount(defineComponent({
            setup() {
                return useAccordion()
            },
            template: '<div />',
        }))

        const vm = wrapper.vm as unknown as { isOpen: boolean; toggle: () => void }
        vm.toggle()
        await wrapper.vm.$nextTick()
        expect(vm.isOpen).toBe(true)

        vm.toggle()
        await wrapper.vm.$nextTick()
        expect(vm.isOpen).toBe(false)
    })
})
