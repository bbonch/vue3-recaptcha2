<template>
    <div ref="recaptcha"></div>
</template>

<script>
    export default {
        name: "VueRecaptcha",
        data() {
            return {
                recaptcha: null
            }
        },
        props: {
            sitekey: {
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
            hl: {
                type: String,
                required: false
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
                this.recaptcha = grecaptcha.render(this.$refs.recaptcha ?? this.$el, {
                    'sitekey': this.sitekey,
                    'theme': this.theme,
                    'size': this.size,
                    'callback': (response) => this.$emit("verify", response),
                    'expired-callback': () => this.$emit("expire"),
                    'error-callback': () => this.$emit("fail")
                });
            },
            execute() {
                grecaptcha.execute(this.recaptcha);
            },
            reset() {
                grecaptcha.reset(this.recaptcha);
            }
        },
        mounted() {
            if (window.grecaptcha == null) {
                new Promise((resolve) => {
                    window.recaptchaReady = function () {
                        resolve();
                    };

                    const doc = window.document;
                    const scriptId = "recaptcha-script";
                    const scriptTag = doc.createElement("script");
                    scriptTag.id = scriptId;
                    scriptTag.setAttribute("src", `https://www.google.com/recaptcha/api.js?onload=recaptchaReady&render=explicit&hl=${this.hl}`);
                    doc.head.appendChild(scriptTag);
                }).then(() => {
                    this.renderRecaptcha();
                });
            }
            else {
                this.renderRecaptcha();
            }
        }
    }
</script>