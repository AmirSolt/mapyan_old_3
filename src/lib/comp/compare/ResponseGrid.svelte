<script lang="ts">

	import ResponseCard from "./ResponseCard.svelte";
	import {convertXMLtoObj} from '$lib/utils/xml/init'

	export let isStreamed: boolean = true;
	export let tableData:{[key:string]:CompactProductInfo};
	export let rawResponse: string='';

	const closeRegex:RegExp =  /<\/[s]>/g
	let closeCount:number = 0;
	// const closeCountMargin = 4;

	let cards:CompareCard[] = []
	
	$: if (!isStreamed) cards = convertXMLtoObj(rawResponse)
	$: if(isStreamed) streamedConverter(rawResponse)
	
	
	function streamedConverter(streamedResponse:string){
		let matches = getMatches(streamedResponse, closeRegex)
		if(matches.length > closeCount  ){

			let inputXML = streamedResponse.slice(0, matches.at(-1))
			console.log(inputXML)
			cards = convertXMLtoObj(inputXML)

			closeCount = matches.length
		}
	}


	function getMatches(text:string, regex:RegExp):number[]{
		let matches: number[] = [];
		let match: RegExpExecArray | null;
		while ((match = regex.exec(text)) !== null) {
			matches.push(match.index + match[0].length);
		}
		return matches;
	}


</script>




<h1 class="text-4xl m-4">Comparison Table:</h1>

<br />

{#each cards as card}
	<ResponseCard {card} {tableData} />
{/each}



