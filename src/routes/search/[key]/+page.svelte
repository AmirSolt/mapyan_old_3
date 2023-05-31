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


    import LoadingAnim from '$lib/comp/general/loading/LoadingAnim.svelte';
	import LoadingContainer from '$lib/comp/general/loading/LoadingContainer.svelte';
    import BarLoading from '$lib/comp/general/loading/BarLoading.svelte';


</script>




{#await getSearchResults(searchTerm, $userCountry)}

    <LoadingContainer >
        <LoadingAnim />
        <br>
        <BarLoading seconds={20} >

            <br />
            <div class="flex flex-col justify-center items-center text-center">
                <p>We are working to improve the loading speed.</p>
				<p>Thank you for being patient.</p>
            </div>
        </BarLoading>
    </LoadingContainer>
{:then products}


    <SearchInput {searchTerm} />
        

    <CardGrid {products} />


{/await}