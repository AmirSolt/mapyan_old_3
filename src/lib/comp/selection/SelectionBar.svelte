
<script lang="ts">
	import { X } from 'lucide-svelte';
	import ProductAvatar from '$lib/comp/general/product/ProductAvatar.svelte';
        import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { selectedProducts, userCountry } from '$lib/utils/stores';
	function removeCompareProduct(product) {
        selectedProducts.update((list) => {
            return list.filter((item) => item.asin !== product.asin)
		});
	}
    
    import { ProgressBar } from '@skeletonlabs/skeleton';
	$: progressValue = ($selectedProducts.length / MaxCompareProducts) * 100;

	$: barBg = $selectedProducts.length>0? 'variant-filled-surface' : '!bg-transparent'

	let buttonLoading:boolean = false

	import {MaxCompareProducts, MinCompareProducts} from '$lib/utils/config'
	import {structTableKey} from '$lib/utils/schemas'
    import {goto} from '$app/navigation';
	import {initToast} from '$lib/utils/toast'
	function goToTable() {

		buttonLoading = true;

		if($selectedProducts.length<MinCompareProducts || $selectedProducts.length>MaxCompareProducts){
			initToast(`You atleast need to select ${MinCompareProducts} products`)
			return;
		}

		const tableKey = structTableKey(getSelectedAsins());
        goto(`/compare/${tableKey}`)
	}

	function getSelectedAsins(){
		return $selectedProducts.map(value=>value.asin)
	}


</script>




<div class={ $selectedProducts.length>0? "sticky top-0 z-10" : ""} >

	<div class="variant-soft rounded-lg">
		<ProgressBar rounded="rounded-t-lg" class="rounded-none" meter="bg-primary-500" height="h-2" value={progressValue} />
	</div>
	
	<div class="card {barBg} p-2 md:p-4 rounded-t-none  flex flex-row justify-between items-center md:px-24">
		
		<div class="">
			<div class="flex justify-center items-center h-16 md:h-20">
				{#each $selectedProducts as product}
					<button
						id="compare-button"
						class="relative m-2 md:m-4"
						on:click={() => removeCompareProduct(product)}
					>
						<!-- <img class="max-w-full max-h-full rounded-lg" src="{product.image}" alt="Thumbnail"> -->
						<ProductAvatar imageUrl={product.image} size={"w-16 h-16 md:w-24 md:h-24"}  />
						<div class="absolute z-10 right-0 top-0 variant-filled rounded-full drop-shadow-2xl">
							<span>
								<X />
							</span>
						</div>
					</button>
				{/each}
			</div>
		</div>
	

		<div class="w-1/4">
			{#if $selectedProducts.length > 0}
				<button class="btn variant-filled-primary w-full" on:click={goToTable}>
					{#if !buttonLoading}
					Compare	  
					{:else}
					<ProgressRadial  width="w-12" stroke={100} />
					{/if}
				</button>
			{:else}
				<button class="btn variant-ringed w-full"  disabled> - </button>
			{/if}
		</div>
	</div>
</div>


