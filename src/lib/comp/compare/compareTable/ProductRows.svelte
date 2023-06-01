<script lang="ts">
	import ProductAvatar from '$lib/comp/general/product/ProductAvatar.svelte';
	import StarRating from '$lib/comp/general/product/StarRating.svelte';
	import {CornerUpRight} from 'lucide-svelte'

	export let tableData: any[] = [];


	function truncate(text:string, size:number){
		return text.substring(0,size) + " ...";
	}

</script>

<tr>
	<th class="">Product</th>
	{#each Object.values(tableData) as colData}
		<td class="text-center">
			<a class="flex justify-center" href={colData.link} target="_blank" rel="noopener">
				<ProductAvatar imageUrl={colData.image} size={"w-24 h-24 md:w-40 md:h-40"}   />
			</a>
		</td>
	{/each}
</tr>


<tr>
	<th class="">Title</th>
	{#each Object.values(tableData) as colData}
		<td class="text-center">
			<a class="flex justify-center" href={colData.link} target="_blank" rel="noopener">
				<span >
					{truncate(colData.title, 25)}
				</span>
			</a>
		</td>
	{/each}
</tr>


<tr>
	<th class="">Brand</th>
	{#each Object.values(tableData) as colData}
		<td class="text-center">
			<div class="">
				<span>
					{colData.brand}
				</span>
			</div>
		</td>
	{/each}
</tr>

<tr>
	<th class="">Ratings</th>
	{#each Object.values(tableData) as colData}
		<td class="text-center">
			<div class="row flex flex-col justify-center items-center">
				<StarRating rating={colData.rating} starSize={4} />
				<small class="mx-2">({colData.ratings_total})</small>
			</div>
		</td>
	{/each}
</tr>

<tr>
	<th class="">Price</th>
	{#each Object.values(tableData) as colData}
		<td class="text-center">
			<div class="">
				<span>
					{colData.price}
				</span>
			</div>
		</td>
	{/each}
</tr>



<!-- <tr>
	<th class="">Prime</th>
	{#each tableData as colData}
		<td class="text-center ">
			<div class="flex justify-center">
					{#if colData.is_prime}
					<span class="text-blue-500">
						<Check />
					</span>
					{:else}
						-
					{/if}
			</div>
		</td>
	{/each}
</tr> -->
