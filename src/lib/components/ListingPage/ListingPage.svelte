<script lang="ts">
	import type { Listing } from '$lib/ypaTypes';
	import ListingCard from '$lib/components/ListingCard/ListingCard.svelte';
	import YpaPagination from '$lib/components/Pagination/YpaPagination.svelte';
	import { type Options } from '$lib/data/options';
	let { data }: { data: { listings: Listing[]; listingsCount: number; options: Options } } =
		$props();
	let { propertyRegionOptions } = data.options;
</script>

<div class="flex justify-center flex-wrap gap-4">
	{#each data.listings as listing}
		<ListingCard {listing} {propertyRegionOptions} />
	{/each}
	{#if data.listings.length === 0}
		<h2 class="font-semibold min-h-[200px]">
			We couldnt find any properties matching your criteria, please try again.
		</h2>
	{/if}
	<div class="mt-2">
		<YpaPagination count={data.listingsCount} />
	</div>
</div>
