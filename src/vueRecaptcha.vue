<template>
    <div ref="recaptchaDiv"></div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    const recaptchaDiv = ref(null)
    let recaptcha = null

    const props = defineProps({
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
    })

    const emit = defineEmits({
        verify: (response) => {
            if (response)
                return true;
            else
                return false;
        },
        expire: null,
        fail: null
    })

    defineExpose({
        execute: function () {
            window.grecaptcha.execute(recaptcha)
        },
        reset: function () {
            window.grecaptcha.reset(recaptcha);
        }
    })

    function renderRecaptcha() {
        recaptcha = window.grecaptcha.render(recaptchaDiv.value, {
            'sitekey': props.sitekey,
            'theme': props.theme,
            'size': props.size,
            'callback': (response) => emit("verify", response),
            'expired-callback': () => emit("expire"),
            'error-callback': () => emit("fail")
        })
    }

    onMounted(() => {
        if (window.grecaptcha == null) {
            new Promise((resolve) => {
                window.recaptchaReady = function () {
                    resolve();
                };

                const doc = window.document;
                const scriptId = "recaptcha-script";
                const scriptTag = doc.createElement("script");
                scriptTag.id = scriptId;
                scriptTag.setAttribute("src", `https://www.google.com/recaptcha/api.js?onload=recaptchaReady&render=explicit&hl=${props.hl}`);
                doc.head.appendChild(scriptTag);
            }).then(() => {
                renderRecaptcha();
            });
        }
        else {
            renderRecaptcha();
        }
    })
</script>