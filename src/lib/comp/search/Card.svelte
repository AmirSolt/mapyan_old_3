
<script lang="ts">
    export let product:Product; 
    import StarRating from "$lib/comp/general/product/StarRating.svelte";
    import {selectedProducts} from '$lib/utils/stores'
    import {MaxCompareProducts} from '$lib/utils/config';

    $: thisInSelecteds = $selectedProducts.find((item) => item.asin === product.asin);
    $: reachedMaxSelected =  $selectedProducts.length>=MaxCompareProducts;



    // === call back on add ===
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    function onAdd() {
        dispatch('add', {
            product
        });
    }

    function truncate(text:string, size:number){
		return text.substring(0,size) + " ...";
	}
</script>



    {#if 
        product.title &&
        product.image &&
        product.link
        }

    <div id="product_card"  class=" flex flex-col  justify-between  card drop-shadow-md !bg-transparent rounded-lg p-2 md:p-4"> 


        <!-- Media -->
        <header class="flex justify-center items-center">
            <a href="{product.link}" id="media" target="_blank" rel="noopener">
                <div class="flex justify-center items-center w-40 h-44 md:w-72 md:h-74 p-2 md:p-4 rounded-lg bg-white shadow-gray-800/90">
                    <img class="max-w-full max-h-full" src="{product.image}" alt="Thumbnail" loading="lazy">
                </div>
            </a>
        </header>
        

        <div id="info" class="flex flex-col gap-1">
        
            <br>

            
            <!-- brand -->
            <div id="brand" class="row">
                {#if product.brand}
                <small>{product.brand}</small>
                {/if}
            </div>


            <!-- Title -->
            <div id="title" class="row">
                <a href="{product.link}" id="media" target="_blank" rel="noopener">
                    <p  >{truncate(product.title, 100)}</p>
                </a>    
            </div>



            <!-- Ratings -->
            {#if product.rating && 
                typeof product.rating == 'number' && 
                product.ratings_total}
            <div id="review" class="row flex flex-col justify-center items-start">
                <StarRating rating={product.rating} />
                <small class="mx-2">({product.ratings_total})</small>
                
            </div>
            {/if}


            <!-- Prices -->
            {#if product.prices.length > 0}
                <div id="price" class="row">

                    <span class="text-2xl">
                        {product.prices[0].symbol}{product.prices[0].value}
                    </span>

                    {#if product.prices.length > 1}
                        <s>
                            {product.prices[1].symbol}{product.prices[1].value}
                        </s>
                    {/if}

                </div>
            {/if}

            <!-- Badges -->
            <!-- <div id="extra" class="row">
                {#if product.bestSeller || product.amazonChoice}
                    <h3>
                        Marked as {[product.bestSeller, product.amazonChoice].join("and ")}
                    </h3>
                {/if}

                {#if product.amazonPrime}
                    <h3>
                        {product.amazonPrime}
                    </h3>
                {/if}
            </div> -->

        </div>

        <footer>

            <br>

            <div class='flex justify-end items-center  w-full'>
                {#if thisInSelecteds || reachedMaxSelected}
                    <button class="btn variant-filled w-full h-10 md:w-3/4 md:h-12" disabled>
                        -
                    </button>
                {:else}
                    <button class="btn variant-filled w-full h-10 md:w-3/4 md:h-12" on:click={onAdd}>
                        + Add
                    </button>
                {/if}
            </div>


        </footer>

    </div>


    {/if}
