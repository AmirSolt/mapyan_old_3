<script lang="ts">

    export let data;
    $: ({ searchTerm, products } = data);

    import SearchInput from '$lib/comp/search/SearchInput.svelte';

</script>






<SearchInput {searchTerm} />

<h1>
    {products.length}
</h1>