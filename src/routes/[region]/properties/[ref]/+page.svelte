<script lang="ts">
	import type { ListingDetails } from '$lib/ypaTypes';
	import Carousel from '$lib/components/ui/carousel/carousel.svelte';
	export let data: { listing: ListingDetails };
	const { listing } = data;
</script>

<div class="flex justify-center">
	<div class="w-full max-w-[1000px]">
		<Carousel {listing} />
	</div>
</div>
