<script lang="ts">
	import CompareTable from '$lib/comp/compare/compareTable/CompareTable.svelte';
	import LoadingAnim from '$lib/comp/general/LoadingAnim.svelte';
	import CompareLoading from '$lib/comp/compare/CompareLoading.svelte';
	import HCaptcha from '$lib/comp/auth/HCaptcha.svelte';
	import { userCountry } from '$lib/utils/stores';
	import { destructTableKey } from '$lib/utils/schemas';
	import { error } from '@sveltejs/kit';
	import { checkProductInfosStore, queryStoresProductInfo } from '$lib/utils/products/api';
	export let data;
	let { tableKey, tableData } = data;
	const { asins } = destructTableKey(tableKey);
	let isProductInfosReady: boolean = false;
	let isCaptchaResponded: boolean = false;
	let captchaToken:string;


	import { onMount } from 'svelte';
	onMount(async () => {
		if(!tableData){
			awaitProductInfos();
		}
	});

	
	function awaitProductInfos() {
		if (!checkProductInfosStore(asins, $userCountry)) {
			window.setTimeout(awaitProductInfos, 100);
		} else {
			isProductInfosReady = true;
			console.log("product infos loaded")
			if(isCaptchaResponded){
				loadTableData();
			}
		}
	}

	function onCaptchaSubmit(event) {
        captchaToken = event.detail.captchaToken;
		isCaptchaResponded = true;
		console.log("captcha submitted")
		if(isProductInfosReady){
			loadTableData();
		}
	}

	async function loadTableData() {
		let productInfos = asins.map((asin) => queryStoresProductInfo(asin, $userCountry));

		const response = await fetch('/api/compare', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				tableKey,
				productInfos,
				captchaToken
			})
		});
		if (response.ok) {
			const data = await response.json();
			tableData = data.tableData;
		} else {
			throw error(400, `failed to get /api/compare response. response:${data.toString()}`);
		}
	}



	



</script>


{#if !tableData }
	<!-- is captcha solved -->

	<div class="h-full flex flex-col justify-start items-center">
		
		{#if !isCaptchaResponded}
			<div class="p-6 md:p-16" />
			<HCaptcha on:submit={onCaptchaSubmit} />
		{:else}
			<div class="p-6 md:p-16" />
			<LoadingAnim />
			<br>
			<CompareLoading />
		{/if}
	</div>
{:else}
	<p class="text-sm">
		*This information has been generated with the help of AI, and has not been confirmed by a human.
	</p>

	<br />
	<hr />
	<br />

	<CompareTable {tableData} />
{/if}
