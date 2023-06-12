import { test, expect, describe } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import VueRecaptcha from "../src/index"

describe("test component", () => {
    test("has been imported", () => {
        expect(VueRecaptcha).toBeDefined()
    })

    const wrapper: VueWrapper<VueRecaptcha> = mount(VueRecaptcha, {
        props: {
            sitekey: "key"
        }
    })
    const props = wrapper.props()

    test("has been rendered", () => {
        expect(wrapper.html()).toEqual('<div></div>')
    })

    test("has required props", () => {
        expect(props.sitekey).toBe('key')
    })

    test("has default props", () => {
        expect(props.hl).toBe(undefined)
        expect(props.theme).toBe("light")
        expect(props.size).toBe("normal")
        expect(props.loadingTimeout).toBe(0)
    })
})