import { mount } from '@vue/test-utils'
import Skeletton from '@/components/skeletons/Skeleton.vue'

describe('Skeletton', () => {
    it('renders correctly with expected classes', () => {
        const wrapper = mount(Skeletton)

        const div = wrapper.find('div')
        expect(div.exists()).toBe(true)

        expect(div.classes()).toContain('w-20')
        expect(div.classes()).toContain('h-10')
        expect(div.classes()).toContain('bg-gray-200')
        expect(div.classes()).toContain('dark:bg-gray-800')
        expect(div.classes()).toContain('rounded')
        expect(div.classes()).toContain('animate-pulse')
    })
})
