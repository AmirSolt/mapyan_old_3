<script lang="ts">


    import {MinCompareProducts} from '$lib/utils/config' 
    import {selectedProducts} from '$lib/utils/stores' 
    import LoadingAnim from '$lib/comp/general/LoadingAnim.svelte';
    import CompareLoading from '$lib/comp/compare/CompareLoading.svelte';

    import {goto} from '$app/navigation';
    import { onMount } from 'svelte';


    

    onMount(() => {

        goto(`./r`)

    })

</script>

<div class="h-full flex flex-col justify-start items-center">
    <div class="p-12"></div>
    <LoadingAnim />
    <br>
    <CompareLoading />
</div>

<!-- HCaptcha -->