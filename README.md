<p align="center">
<svg width="256px" height="221px" viewBox="0 0 256 221" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
	<g>
		<path d="M204.8,0 L256,0 L128,220.8 L0,0 L50.56,0 L97.92,0 L128,51.2 L157.44,0 L204.8,0 Z" fill="#41B883"></path>
		<path d="M0,0 L128,220.8 L256,0 L204.8,0 L128,132.48 L50.56,0 L0,0 Z" fill="#41B883"></path>
		<path d="M50.56,0 L128,133.12 L204.8,0 L157.44,0 L128,51.2 L97.92,0 L50.56,0 Z" fill="#35495E"></path>
	</g>
</svg>
</p>
<h1 align="center">vue3-recaptcha2</h1>
<p align="center">Vue v3 component for Google reCAPTCHA v2</p>

## Installation
``` bash
npm install vue3-recaptcha2
```

## Example usage

### With bundlers

``` vue
<template>
  <vue-recaptcha v-show="showRecaptcha" sitekey="key"
		 size="normal" 
		 theme="light"
		 hl="tr"
		 :loading-timeout="loadingTimeout"
		 @verify="recaptchaVerified"
		 @expire="recaptchaExpired"
		 @fail="recaptchaFailed"
		 @error="recaptchaError"
		 ref="vueRecaptcha">
  </vue-recaptcha>
</template>

<script>
import vueRecaptcha from 'vue3-recaptcha2';

export default {
  name: 'app',
  components: {
	vueRecaptcha
  },
  data() {
	return {
		showRecaptcha: false,
		loadingTimeout: 30000 // 30 seconds
	}
  },
  methods: {
	recaptchaVerified(response) {
	},
	recaptchaExpired() {
	  this.$refs.vueRecaptcha.reset();
	},
	recaptchaFailed() {
	},
	recaptchaError(reason) {
	}
  }
};
</script>
```

### With CDN

``` html
<div id="app">
    <button v-on:click="toggle">Show</button>
    <vue-recaptcha v-if="show" :sitekey="recaptchaSiteKey" v-on:verify="recaptchaUpdated" hl="ru"></vue-recaptcha>
</div>

<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue3-recaptcha2"></script>
<script>
	const app = Vue.createApp({
	    name: "app",
	    components: {
		VueRecaptcha
	    },
	    data() {
		return {
		    show: false,
		    recaptcha: null,
		    recaptchaSiteKey: 'key'
		}
	    },
	    methods: {
		toggle() {
		    this.show = !this.show;
		},
		recaptchaUpdated(recaptcha) {
		    this.recaptcha = recaptcha;
		}
	    }
	});
	app.mount("#app");
</script>
```

## API ##

### Props ###

- sitekey (required)
  Your sitekey
- size (optional)
  The size of the widget
- theme (optional)
  The color theme of the widget
- hl (optional)
  Forces the widget to render in a specific language. Auto-detects the user's language if unspecified.
- loading-timeout (optional)
  Milliseconds to wait for widget to load before triggering a timeout error. Defaults to 0 (i.e. never timeout).

### Methods ###

- reset
  Resets the reCAPTCHA widget
- execute
  Programmatically invoke the challenge

### Events ###

- verify(response)
  The name of your callback function, executed when the user submits a successful response. The g-recaptcha-response token is passed to your callback
- expire
  The name of your callback function, executed when the reCAPTCHA response expires and the user needs to re-verify
- fail
  The name of your callback function, executed when reCAPTCHA encounters an error (usually network connectivity) and cannot continue until connectivity is restored. If you specify a function here, you are responsible for informing the user that they should retry
- error
  The name of your callback function, executed when reCAPTCHA fails to load. If you specify a function here, you are responsible for either reloading (e.g. by unmounting / re-mounting the component) or notifying the user that they should reload / retry
