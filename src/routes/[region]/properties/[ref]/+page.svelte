<script lang="ts">
	import type { Listing } from '$lib/ypaTypes';
	import Carousel from '$lib/components/ui/carousel/carousel.svelte';
	export let data: { listings: Listing[] };

	let currentIndex = 0;
	let currentListing = data.listings[currentIndex];
</script>

{#if currentListing}
	<Carousel propValue={currentListing} />
{/if}
