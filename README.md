<p align="center">
<svg width="256px" height="221px" viewBox="0 0 256 221" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
	<g>
		<path d="M204.8,0 L256,0 L128,220.8 L0,0 L50.56,0 L97.92,0 L128,51.2 L157.44,0 L204.8,0 Z" fill="#41B883"></path>
		<path d="M0,0 L128,220.8 L256,0 L204.8,0 L128,132.48 L50.56,0 L0,0 Z" fill="#41B883"></path>
		<path d="M50.56,0 L128,133.12 L204.8,0 L157.44,0 L128,51.2 L97.92,0 L50.56,0 Z" fill="#35495E"></path>
	</g>
</svg>
</p>
<h1 align="center">vue-3-recaptcha-2</h1>
<p align="center">Vue v3 component for Google reCAPTCHA v2</p>

## Installation
``` bash
npm install vue-3-recaptcha-2
```

## Example usage
``` vue
<template>
  ...
  <vue-recaptcha site-key="..." :show="show" size="normal" theme="light" @verify="verifyRecaptcha"></vue-recaptcha>
  ...
</template>

<script>
...
import VueRecaptcha from 'vue-3-recaptcha-2';

export default {
  ...,
  components: {
    VueRecaptcha
  },
  data() {
    return { show: false }
  },
  methods: {
    verifyRecaptcha(response) {
    }
  },
  ...
};
</script>
```
