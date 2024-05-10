<script lang="ts">
	import type { Listing } from '$lib/ypaTypes';
	import ListingCard from '$lib/components/ListingCard/ListingCard.svelte';
	import Search from '$lib/components/Search/Search.svelte';
	import YpaPagination from '$lib/components/Pagination/YpaPagination.svelte';
	export let data: { listings: Listing[]; next: string; count: number };
</script>

<div class="flex flex-wrap justify-center pt-12 pb-12 gap-6">
	<Search />
	{#each data.listings as listing}
		<ListingCard {listing} />
	{/each}
	<YpaPagination count={data.count} />
</div>
