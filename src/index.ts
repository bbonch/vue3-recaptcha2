declare global {
    interface Window {
        grecaptcha: any,
        recaptchaReady: any
    }
}

import VueRecaptcha from './vueRecaptcha.vue'
export default VueRecaptcha