<script lang="ts">



    import LoadingAnim from '$lib/comp/general/LoadingAnim.svelte';
    import {goto} from '$app/navigation';
    import { onMount } from 'svelte';

    onMount(() => {
        goto(`./r`)
    })

</script>

<div class="h-full flex flex-col justify-start items-center">
    <div class="p-24"></div>
    <LoadingAnim />
</div>

<!-- HCaptcha -->