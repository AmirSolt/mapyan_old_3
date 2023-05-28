<script lang="ts">

    import {PUBLIC_HCAPTCHA_SITE_KEY} from '$env/static/public'

    // TEST KEY: 10000000-ffff-ffff-ffff-000000000001
    // TEST SECRET: 0x0000000000000000000000000000000000000000
    // TEST RESPONSE: 10000000-aaaa-bbbb-cccc-000000000001





    let hcaptcha;
	let hcaptchaWidgetID;

    import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

    onMount(() => {
		if (browser) {
			hcaptcha = window.hcaptcha;
			if (hcaptcha.render) {
				hcaptchaWidgetID = hcaptcha.render('hcaptcha', {
					sitekey: PUBLIC_HCAPTCHA_SITE_KEY,
				});
			}
		}

	});

    onDestroy(() => {
		if (browser) {
			hcaptcha = { execute: async () => ({ response: '' }), render: () => {} };
		}
	});




	import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    function onSubmit(e) {

		const form = e.target
        let formData = new FormData(form)
		const captchaToken = formData.get('h-captcha-response')?.toString()?? ''

		if(!(captchaToken.length>0))
			return;

        dispatch('submit', {
            captchaToken
        });
    }


</script>



<form class="flex flex-col justify-center items-center" on:submit|preventDefault={onSubmit}>

	<h1 class="text-3xl">
		Please submit the Captcha.
	</h1>

	<br>

	<div 
		id="hcaptcha"
		class="h-captcha" 
		data-sitekey="{PUBLIC_HCAPTCHA_SITE_KEY}"
	>
	</div>

	<br>
	<button class="btn variant-filled w-full" type="submit">Submit</button>

</form>
