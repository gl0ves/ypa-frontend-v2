<script lang="ts">
	import type { Listing } from '$lib/ypaTypes';
	import ListingCard from '$lib/components/ListingCard/ListingCard.svelte';
	import YpaPagination from '$lib/components/Pagination/YpaPagination.svelte';
	import { type Options } from '$lib/data/options';
	let { data }: { data: { listings: Listing[]; listingsCount: number; options: Options } } =
		$props();
	let { propertyRegionOptions } = data.options;
</script>

<div
	class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 w-full max-w-7xl mx-auto px-4 overflow-hidden"
>
	{#each data.listings as listing}
		<div class="flex justify-center">
			<ListingCard {listing} {propertyRegionOptions} />
		</div>
	{/each}
	{#if data.listings.length === 0}
		<h2 class="font-semibold min-h-[200px] col-span-full">
			We couldnt find any properties matching your criteria, please try again.
		</h2>
	{/if}
	<div class="mt-2 col-span-full">
		<YpaPagination count={data.listingsCount} />
	</div>
</div>
