<script lang="ts">
    import CompareTable from "$lib/comp/compare/compareTable/CompareTable.svelte";

    export let data./r/$types.js;
    let {tableData} = data;

</script>


<p class="text-sm">*This information has been generated with the help of AI, and has not been confirmed by a human.</p>

<br>
<hr>
<br>

<CompareTable {tableData} />

