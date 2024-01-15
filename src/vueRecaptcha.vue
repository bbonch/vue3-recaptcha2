<template>
    <div ref="recaptchaDiv"></div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'

    const recaptchaDiv = ref(null)
    let recaptcha: any = null

    const props = defineProps({
        sitekey: {
            type: String,
            required: true
        },
        //In some specific regions, Google's recaptcha will not load.
        // We need to replace the link with a specific link to support the specific region.
        region: {
        type: String,
        required: false,
        default: "global"
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
        },
        loadingTimeout: {
            type: Number,
            required: false,
            default: 0
        }
    })

    const emit = defineEmits({
        verify: (response: string) => {
            if (response != null && response != "")
                return true;
            else
                return false;
        },
        error: (reason: any) => reason,
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
            'callback': (response: string) => emit("verify", response),
            'expired-callback': () => emit("expire"),
            'error-callback': () => emit("fail")
        })
    }

    onMounted(() => {
        if (window.grecaptcha == null) {
            new Promise<void>((resolve, reject) => {
                let loadingCountdown: ReturnType<typeof setTimeout>;
                let responded = false;

                window.recaptchaReady = function () {
                    if (responded) return;
                    responded = true;
                    clearTimeout(loadingCountdown);
                    resolve();
                };

                const scriptId = "recaptcha-script";
                const loadingFailed = (reason: string) => {
                    return () => {
                        if (responded) return;
                        responded = true;
                        clearTimeout(loadingCountdown);
                        document.getElementById(scriptId)?.remove();
                        reject(reason);
                    }
                };

                if (props.loadingTimeout > 0) loadingCountdown = setTimeout(loadingFailed("timeout"), props.loadingTimeout);
                const doc = window.document;
                const scriptTag = doc.createElement("script");
                scriptTag.id = scriptId;
                scriptTag.onerror = loadingFailed("error");
                scriptTag.onabort = loadingFailed("aborted");

                const recaptchaUrl = props.region === "china"
                    ? `https://recaptcha.net/recaptcha/api.js?onload=recaptchaReady&render=explicit&hl=${props.hl}&_=${+new Date()}`
                    : `https://www.google.com/recaptcha/api.js?onload=recaptchaReady&render=explicit&hl=${props.hl}&_=${+new Date()}`;

                scriptTag.setAttribute("src", recaptchaUrl);
doc.head.appendChild(scriptTag);
            }).then(() => {
                renderRecaptcha();
            }).catch((err) => {
                emit("error", err);
            });
        }
        else {
            renderRecaptcha();
        }
    })
</script>