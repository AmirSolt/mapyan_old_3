<!-- Every "ResponseCard" is made of "heading", "items"-->
<!-- items: product, paragraph -->



<script lang="ts">
	import ProductAvatar from '$lib/comp/general/product/ProductAvatar.svelte';
	// import StarRating from '$lib/comp/general/product/StarRating.svelte';

	export let tableData:{[key:string]:CompactProductInfo}
	export let card:CompareCard;

    function truncate(text: string, size: number) {
		return text.substring(0, size) + ' ...';
	}
</script>

<div class="card flex flex-col justify-center items-start gap-2 p-2 w-full">
	<h1 class="text-2xl m-4">{card.heading}:</h1>

	{#each card.items as item}
		<div class="card variant-soft flex justify-start p-2 items-center w-full">

			<!-- product Image and title -->
			<div class="flex flex-col justify-center items-center p-2 w-20 md:w-28 border-e-2">
				<a class="" href={tableData[item.asin].link} target="_blank" rel="noopener">
					<ProductAvatar imageUrl={tableData[item.asin].image} size={'w-16 h-16 md:w-24 md:h-24'} />
				</a>
		
				<a class="" href={tableData[item.asin].link} target="_blank" rel="noopener">
					<span class="text-sm">
						{truncate(tableData[item.asin].title, 25)}
					</span>
				</a>
			</div>
		
			<!-- Paragraph -->
			<div class="p-4">
				<p>
					{item.paragraph}
				</p>
			</div>

		</div>
	{/each}
</div>

<br />
