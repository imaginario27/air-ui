import { mount } from "@vue/test-utils"
import NavLink from "@/components/navigation/links/NavLink.vue"
import { IconPosition } from "@/models/enums/icons"

const factory = (props?: Partial<InstanceType<typeof NavLink>["$props"]>) => {
    return mount(NavLink, {
        props: {
            text: "Test Link",
            ...props,
        },
        global: {
            stubs: {
                NuxtLink: {
                    template: '<a :href="to" :target="target" :rel="rel"><slot /></a>',
                    props: ["to", "external", "rel", "target"],
                },
                MdiIcon: true,
            },
        },
    })
}

describe("NavLink", () => {
    it("renders link text correctly", () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain("Test Link")
    })

    it("renders left icon when iconPosition is LEFT", () => {
        const wrapper = factory({
            iconPosition: IconPosition.LEFT,
            icon: "mdiCheck",
        })
        expect(wrapper.findComponent({ name: "MdiIcon" }).exists()).toBe(true)
    })

    it("renders right icon when iconPosition is RIGHT", () => {
        const wrapper = factory({
            iconPosition: IconPosition.RIGHT,
            icon: "mdiCheck",
        })
        expect(wrapper.findComponent({ name: "MdiIcon" }).exists()).toBe(true)
    })

    it("does not render icon when iconPosition is NONE", () => {
        const wrapper = factory({
            iconPosition: IconPosition.NONE,
            icon: "mdiCheck",
        })
        expect(wrapper.findComponent({ name: "MdiIcon" }).exists()).toBe(false)
    })

    it("renders as external link with correct attributes", () => {
        const wrapper = factory({
            isExternal: true,
            to: "https://external.com",
        })
        const link = wrapper.find('a')
        expect(link.attributes("href")).toBe("https://external.com")
        expect(link.attributes("target")).toBe("_blank")
        expect(link.attributes("rel")).toBe("noopener noreferrer")
    })

    it("renders as internal link with default attributes", () => {
        const wrapper = factory({
            isExternal: false,
            to: "/internal",
        })
        const link = wrapper.find('a')
        expect(link.attributes("href")).toBe("/internal")
        expect(link.attributes("target")).toBe("_self")
        expect(link.attributes("rel")).toBeUndefined()
    })

    it("disables navigation when disabled is true", () => {
        const wrapper = factory({ disabled: true })
        const link = wrapper.find('a')
        expect(link.attributes("href")).toBeUndefined()
    })
})
