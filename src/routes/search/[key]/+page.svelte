<script lang="ts">

    export let data./r/$types.js;
    $: ({ searchTerm, products } = data);

    import SearchInput from '$lib/comp/search/SearchInput.svelte';

    import CardGrid from '$lib/comp/search/CardGrid.svelte';

</script>






<SearchInput {searchTerm} />

<CardGrid {products} />