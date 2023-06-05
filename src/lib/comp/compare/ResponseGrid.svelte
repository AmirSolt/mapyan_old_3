<script lang="ts">

	import ResponseCard from "./ResponseCard.svelte";
	import {convertXMLtoObj} from '$lib/utils/xml/init'

	export let isStreamed: boolean = true;
	export let tableData:{[key:string]:CompactProductInfo};
	export let rawResponse: string='';

	let cards:CompareCard[] = []

	if (!isStreamed) cards = convertXMLtoObj(rawResponse)
	$: if(isStreamed) streamedConverter(rawResponse)


	function streamedConverter(streamedResponse:string){
		if(streamedResponse.at(-1) == ">"){
			cards = convertXMLtoObj(streamedResponse)
		}
	}


</script>




<h1 class="text-4xl m-4">Comparison Table:</h1>

<br />

{#each cards as card}
	<ResponseCard {card} {tableData} />
{/each}



