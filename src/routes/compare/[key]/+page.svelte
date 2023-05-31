<script lang="ts">
	import CompareTable from '$lib/comp/compare/compareTable/CompareTable.svelte';
	import LoadingAnim from '$lib/comp/general/loading/LoadingAnim.svelte';
	import BarLoading from '$lib/comp/general/loading/BarLoading.svelte';
	import LoadingContainer from '$lib/comp/general/loading/LoadingContainer.svelte';
	import ResponseCard from '$lib/comp/compare/responseCard.svelte';
	import { userCountry } from '$lib/utils/stores';
	import { destructTableKey } from '$lib/utils/schemas';
	import { error } from '@sveltejs/kit';
	import { checkProductInfosStore, queryStoresProductInfo } from '$lib/utils/products/api';
	export let data;
	let { chatResponse, tableKey, tableData } = data;
	const { asins } = destructTableKey(tableKey);
	let isProductInfosReady: boolean = false;


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
			})
		});
		if (response.ok) {
			const data = await response.json();
			console.log(data)
			chatResponse = data.chatResponse;
			tableData = data.tableData;
		} else {
			console.log(data)
			throw error(400, `failed to get /api/compare response. response:${data.toString()}`);
		}
	}




</script>







{#if !tableData }

	<LoadingContainer >
		<LoadingAnim />
		<br>
		<BarLoading>
			<br />
			<div class="flex flex-col justify-center items-center text-center">
				<p class="text-2xl">Generating a comparison table</p>
				<br />
				<p>We are working to improve the loading speed.</p>
				<p>Thank you for being patient.</p>
			</div>
		</BarLoading>
	</LoadingContainer>

{:else}
	<p class="text-sm">
		*This information has been generated with the help of AI, and has not been confirmed by a human.
	</p>

	<br />
	<hr />
	<br />

	
	
	<p>
		<ResponseCard rawResponse={chatResponse} {tableData}/>
	</p>
	
	<br>

	<CompareTable {tableData} />
{/if}
