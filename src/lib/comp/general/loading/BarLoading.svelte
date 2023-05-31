<script lang="ts">
	import { ProgressBar } from '@skeletonlabs/skeleton';

	export let seconds:number= 40;
	export let verbose:boolean= true;


	// ======================= Loading Logic ============================
	import { tweened } from 'svelte/motion';
	let original = seconds; // TYPE NUMBER OF SECONDS HERE
	let timer = tweened(original);
	setInterval(() => {
		if ($timer > 0) $timer--;
	}, 1000);
	$: progressValue = ((original - $timer) / original) * 100;
	// ======================= =========== ============================

</script>



<div class="w-1/4 flex p-2 flex-col ">
	<ProgressBar
		rounded="rounded-lg"
		class="rounded-lg"
		meter="bg-primary-500"
		height="h-4"
		value={progressValue}
	/>

	{#if verbose}
		<br />
		<div class="flex flex-col justify-center items-center text-center">
			<p class="text-2xl">Generating a comparison table</p>
			<br />
			<p>This usually takes about {seconds} seconds</p>
			<p>We are working to improve the loading speed.</p>
			<p>Thank you for being patient.</p>
		</div>
	{/if}
</div>