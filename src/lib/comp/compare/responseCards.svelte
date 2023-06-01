<script lang="ts">
	import ProductAvatar from '$lib/comp/general/product/ProductAvatar.svelte';
	import StarRating from '$lib/comp/general/product/StarRating.svelte';

	export let isStreamed: boolean = true;
	export let tableData: {};
	export let rawResponse: string;

	let splitterTotalCount = 0;
	let results: [] = [];


	$: if (isStreamed) results = convertStreamedChatResponse(results, rawResponse, tableData);
	if (!isStreamed) results = convertStaticChatResponse(rawResponse, tableData);

	function convertStreamedChatResponse(results: [], rawResponse: string, tableData) {
		if (!rawResponse || rawResponse.length < 1) {
			return results;
		}

		let numOfSplitters = (rawResponse.match(/%/g) || []).length;
		if (numOfSplitters > 0 && numOfSplitters % 2 == 0) {
			let parts = rawResponse.split('%');

			let asin = parts.at(-2)?.trim();
			let chatResponse = parts.at(-1);

			if (asin && chatResponse) {
				tableData[asin]['chatResponse'] = chatResponse;
			}

			if (numOfSplitters > splitterTotalCount) {
				results.push(tableData[asin]);
				splitterTotalCount = numOfSplitters;
			}
		}
		return results;
	}



    function convertStaticChatResponse(rawResponse: string, tableData) {
        rawResponse = rawResponse.trim().replace(/(\r\n|\n|\r)/gm, '');

        let parts = rawResponse.split('%').map((t) => {
            return t.trim();
        });

        if(parts.length % 2 != 0){
            parts.shift()
        }

        parts = parts.filter((t) => t.length > 0);

        let dimArray = parts.reduce((a, c, i) => {
            return i % 2 === 0 ? a.concat([parts.slice(i, i + 2)]) : a;
        }, []);

        let final:[] = [];
        dimArray.forEach((item, i) => {
            tableData[item[0]]['chatResponse'] = item[1];
            final.push(tableData[item[0]]);
        });

        return final;
    }

	function truncate(text: string, size: number) {
		return text.substring(0, size) + ' ...';
	}
</script>







<h1 class="text-4xl">Rankings:</h1>

<br />

{#each results as item, i}
	<div class="card flex flex-col justify-center items-start gap-4 p-2">
		<h1 class="text-4xl me-4">
			{i + 1}.
		</h1>
		<div class="flex justify-center items-center p-2">

			<a class="" href={item.link} target="_blank" rel="noopener">
				<ProductAvatar imageUrl={item.image} size={"w-32 h-32 md:w-48 md:h-48"}  />
			</a>

			<div class="flex flex-col justify-center items-start mx-4">
				<!-- INFO -->
				<div class="">
					<span>
						Brand: {item.brand}
					</span>
				</div>
				<a class="" href={item.link} target="_blank" rel="noopener">
					<span>
						{truncate(item.title, 25)}
					</span>
				</a>
				<div class="flex justify-center items-center">
					<StarRating rating={item.rating} starSize={4} />
					<small class="mx-2">({item.ratings_total})</small>
				</div>
				<div class="">
					<span>
						{item.price}
					</span>
				</div>
			</div>
		</div>

		<div class="p-2">
			<p>
				{item.chatResponse}
			</p>
		</div>
	</div>

	<br />
{/each}
