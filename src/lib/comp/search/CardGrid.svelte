
<script lang="ts">

    import SelectionBar from "$lib/comp/selection/SelectionBar.svelte";
    import Card from "./Card.svelte";

	export let products:any[] = [];

    import {selectedProducts, userCountry} from '$lib/utils/stores'
    import {MaxCompareProducts} from '$lib/utils/config';

    import {getProductInfo} from '$lib/utils/products/api'



    function productCallback(event){
        const product = event.detail.product;
        addToSelected(product)
    }

    function addToSelected(product){
        selectedProducts.update((list)=>{
            if(list.length>=MaxCompareProducts){
                return list;
            }
            getProductInfo(product.asin, $userCountry)
            return list.find((item) => item.asin === product.asin) ? list : [...list, product]
        })
    }


</script>



<SelectionBar />



<p class="text-sm p-1">
	We may receive a commision when you click on our links.
</p>


<div class="my-5 w-full">


	{#if products.length === 0}
        <h3>No products found</h3>


	{:else}

		<div class="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-rows-3">
			{#each products as product}
				<Card {product} on:add={productCallback} />	
			{/each}
		</div>

	{/if}

</div>