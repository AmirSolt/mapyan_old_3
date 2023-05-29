<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { loadUserCountry } from '$lib/utils/country';
	import Header from '$lib/comp/general/Header.svelte';
	import Footer from '$lib/comp/general/Footer.svelte';
	
	
	onMount(() => {
		loadUserCountry();
	});
	
	

	// ============== Toasts =================
	import { Toast } from '@skeletonlabs/skeleton';
	
</script>

<svelte:head>
	<title>MAPYAN</title>
	<meta name="description" content="Use Mapyan to boost your online shopping experience with our AI-powered website, effortlessly generating dynamic comparison tables for Amazon products. Find the perfect item by effortlessly comparing features, prices, and customer reviews. Discover smarter shopping with our innovative tool today!">
	<meta name="keywords" content="Mapyan, Amazon product comparison, AI-powered comparison tables, Dynamic product comparisons, Smart shopping tool, Online shopping assistant, Amazon price comparison, Customer reviews analysis, Product feature comparison, Effortless product research,">
	<link rel="icon" type="image/svg+xml" href="/logo.svg" />
</svelte:head>



<AppShell>


	<svelte:fragment slot="pageHeader">
		<header>
			<Header />
		</header>
	</svelte:fragment>
	
	<Toast position='t' background='variant-filled-error' />
	<div class="flex justify-center w-full h-full">
		<div class="max-w-7xl p-2 md:p-4 w-full h-full">
			<slot />
		</div>
	</div>

	<svelte:fragment slot="pageFooter">
		<footer>
			<Footer />
		</footer>
	</svelte:fragment>


</AppShell>
