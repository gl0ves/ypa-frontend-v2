<script lang="ts">
	import type { Listing } from '$lib/ypaTypes';
	import ListingCard from '$lib/components/ListingCard/ListingCard.svelte';
	import YpaPagination from '$lib/components/Pagination/YpaPagination.svelte';
	let { data }: { data: { listings: Listing[]; listingsCount: number } } = $props();
</script>

<div class="flex justify-center flex-wrap gap-8">
	{#each data.listings as listing}
		<ListingCard {listing} />
	{/each}
	{#if data.listings.length === 0}
		<h2 class="font-semibold min-h-[200px]">
			We couldnt find any properties matching your criteria, please try again.
		</h2>
	{/if}
	<YpaPagination count={data.listingsCount} />
</div>
