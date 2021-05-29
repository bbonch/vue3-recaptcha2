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
``` vue
<template>
  <vue-recaptcha v-if="showRecaptcha" siteKey="..."
		 size="normal" 
		 theme="light"
		 :tabindex="0"
		 @verify="recaptchaVerified"
		 @expire="recaptchaExpired"
		 @fail="recaptchaFailed"
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
	return { showRecaptcha: true }
  },
  methods: {
	recaptchaVerified(response) {
	},
	recaptchaExpired() {
	  this.$refs.vueRecaptcha.reset();
	},
	recaptchaFailed() {
	}
  }
};
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
- tabindex (optional)
  The tabindex of the widget and challenge. If other elements in your page use tabindex, it should be set to make user navigation easier

### Methods ###

- reset
  Resets the reCAPTCHA widget

### Events ###

- verify(response)
  The name of your callback function, executed when the user submits a successful response. The g-recaptcha-response token is passed to your callback
- expire
  The name of your callback function, executed when the reCAPTCHA response expires and the user needs to re-verify
- fail
  The name of your callback function, executed when reCAPTCHA encounters an error (usually network connectivity) and cannot continue until connectivity is restored. If you specify a function here, you are responsible for informing the user that they should retry
