import QRCode from '@/components/images/QRCode.vue'
import { mount } from '@vue/test-utils'
import QrcodeVue from 'qrcode.vue'
import Spinner from '@/components/spinners/Spinner.vue'

import { QRRenderAs, QRLevel, QRGradientType } from '@/models/enums/images'

describe('QRCode', () => {
    const defaultProps = {
        modelValue: 'https://example.com',
    }

    it('renders Spinner when isLoading is true', () => {
        const wrapper = mount(QRCode, {
            props: {
                ...defaultProps,
                isLoading: true,
            }
        })

        expect(wrapper.findComponent(Spinner).exists()).toBe(true)
        expect(wrapper.findComponent(QrcodeVue).exists()).toBe(false)
    })

    it('renders QrcodeVue when isLoading is false', () => {
        const wrapper = mount(QRCode, {
            props: defaultProps
        })

        expect(wrapper.findComponent(QrcodeVue).exists()).toBe(true)
        expect(wrapper.findComponent(Spinner).exists()).toBe(false)
    })

    it('applies default size to wrapper div', () => {
        const wrapper = mount(QRCode, {
            props: defaultProps
        })

        const div = wrapper.find('div')
        expect(div.attributes('style')).toContain('width: 250px')
        expect(div.attributes('style')).toContain('height: 250px')
    })

    it('applies hasBorder classes when hasBorder is true', () => {
        const wrapper = mount(QRCode, {
            props: {
                ...defaultProps,
                hasBorder: true,
            }
        })

        const classes = wrapper.classes()
        expect(classes).toContain('border')
        expect(classes).toContain('rounded-md')
        expect(classes).toContain('p-2')
    })

    it('does not apply border classes when hasBorder is false', () => {
        const wrapper = mount(QRCode, {
            props: {
                ...defaultProps,
                hasBorder: false,
            }
        })

        const classes = wrapper.classes()
        expect(classes).not.toContain('border')
        expect(classes).not.toContain('rounded-md')
        expect(classes).not.toContain('p-2')
    })

    it('applies containerClass when provided', () => {
        const wrapper = mount(QRCode, {
            props: {
                ...defaultProps,
                containerClass: 'bg-gray-100'
            }
        })

        expect(wrapper.classes()).toContain('bg-gray-100')
    })

    it('passes expected props to QrcodeVue including qrSize and imageMargin', () => {
        const wrapper = mount(QRCode, {
            props: {
                ...defaultProps,
                size: 300,
                imageMargin: 10,
                renderAs: QRRenderAs.SVG,
                level: QRLevel.H,
                background: '#f0f0f0',
                foreground: '#101010',
                useGradient: true,
                gradientType: QRGradientType.RADIAL,
                gradientStartColor: '#123456',
                gradientEndColor: '#654321',
            }
        })

        const qr = wrapper.findComponent(QrcodeVue)
        expect(qr.props()).toMatchObject({
            value: 'https://example.com',
            renderAs: QRRenderAs.SVG,
            level: QRLevel.H,
            background: '#f0f0f0',
            foreground: '#101010',
            gradient: true,
            gradientType: QRGradientType.RADIAL,
            gradientStartColor: '#123456',
            gradientEndColor: '#654321',
            margin: 10,
            size: 276, 
        })
    })

    it('sets imageSettings to default when hasMiddleImage is true and no imageSettings is provided', () => {
        const wrapper = mount(QRCode, {
            props: {
                ...defaultProps,
                hasMiddleImage: true
            }
        })

        const qr = wrapper.findComponent(QrcodeVue)
        expect(qr.props('imageSettings')).toEqual({
            src: 'https://github.com/scopewu.png',
            width: 30,
            height: 30,
            excavate: true
        })
    })

    it('uses custom imageSettings when provided', () => {
        const customImageSettings = {
            src: 'https://cdn.example.com/logo.png',
            width: 40,
            height: 40,
            x: 5,
            y: 5,
            excavate: false
        }

        const wrapper = mount(QRCode, {
            props: {
                ...defaultProps,
                hasMiddleImage: true,
                imageSettings: customImageSettings
            }
        })

        const qr = wrapper.findComponent(QrcodeVue)
        expect(qr.props('imageSettings')).toEqual(customImageSettings)
    })

    it('does not pass imageSettings when hasMiddleImage is false', () => {
        const wrapper = mount(QRCode, {
            props: {
                ...defaultProps,
                hasMiddleImage: false
            }
        })

        const qr = wrapper.findComponent(QrcodeVue)
        const imageSettings = qr.props('imageSettings')
        expect(imageSettings == null || Object.keys(imageSettings).length === 0).toBe(true)
    })

    it('calculates qrSize correctly based on imageMargin and padding', () => {
        const wrapper = mount(QRCode, {
            props: {
                ...defaultProps,
                size: 400,
                imageMargin: 20
            }
        })

        const qr = wrapper.findComponent(QrcodeVue)
        expect(qr.props('size')).toBe(356)
    })

    it('has role="img" with default aria-label from modelValue', () => {
        const wrapper = mount(QRCode, {
            props: defaultProps
        })

        const container = wrapper.find('[role="img"]')
        expect(container.exists()).toBe(true)
        expect(container.attributes('aria-label')).toBe('QR code: https://example.com')
    })

    it('uses custom ariaLabel when provided', () => {
        const wrapper = mount(QRCode, {
            props: {
                ...defaultProps,
                ariaLabel: 'Scan to visit site'
            }
        })

        expect(wrapper.find('[role="img"]').attributes('aria-label')).toBe('Scan to visit site')
    })
})
