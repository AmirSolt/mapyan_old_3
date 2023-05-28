<script lang="ts">

    export let data;
    $: ({ searchTerm } = data);
	import { userCountry } from '$lib/utils/stores';
    import SearchInput from '$lib/comp/search/SearchInput.svelte';
    import CardGrid from '$lib/comp/search/CardGrid.svelte';
    import {getSearchResults} from '$lib/utils/products/api'


    // async function loadSearchResults() {
    //     let products = await getSearchResults(searchTerm, $userCountry);
    // }


    import LoadingAnim from '$lib/comp/general/LoadingAnim.svelte';
    import { onMount } from 'svelte';

</script>




{#await getSearchResults(searchTerm, $userCountry)}

    <div class="h-full flex flex-col justify-start items-center">
        <div class="p-6 md:p-16"></div>
        <LoadingAnim />
    </div>

{:then products}


    <SearchInput {searchTerm} />
        

    <CardGrid {products} />


{/await}