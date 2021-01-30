export default {
    name: "vueRecaptcha",
    data() {
        return {
            recaptcha: null
        }
    },
    props: {
        siteKey: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: false,
            default: "normal"
        },
        theme: {
            type: String,
            required: false,
            default: "light"
        },
        show: {
            type: Boolean,
            required: false,
            default: true
        },
        show: {
            type: Number,
            required: false,
            default: 0
        }
    },
    emits: {
        verify: (response) => {
            if (response)
                return true;
            else
                return false;
        },
        expire: null,
        fail: null
    },
    methods: {
        renderRecaptcha() {
            this.recaptcha = grecaptcha.render(this.$refs.recaptcha, {
                'sitekey': this.siteKey,
                'theme': this.theme,
                'size': this.size,
                'tabindex': this.tabindex,
                'callback': (response) => this.$emit("verify", response),
                'expired-callback': () => this.$emit("expire"),
                'error-callback': () => this.$emit("fail")
            });
        },
        reset() {
            grecaptcha.reset(this.recaptcha);
        }
    },
    beforeMount() {
        if (window.grecaptcha == null) {
            new Promise((resolve) => {
                window.recaptchaReady = function () {
                    resolve();
                };

                const doc = window.document;
                const scriptId = "recaptcha-script";
                const scriptTag = doc.createElement("script");
                scriptTag.id = scriptId;
                scriptTag.setAttribute("src", "https://www.google.com/recaptcha/api.js?onload=recaptchaReady&render=explicit");
                doc.head.appendChild(scriptTag);
            }).then(() => {
                this.renderRecaptcha();
            });
        }
        else {
            this.renderRecaptcha();
        }
    },
    template: "<div v-show='show' ref='recaptcha'></div>"
}