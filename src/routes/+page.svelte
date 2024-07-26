<script lang="ts">
	import type { Listing } from '$lib/ypaTypes';
	import ListingPage from '$lib/components/ListingPage/ListingPage.svelte';
	import { listingsCount } from '$lib/store';
	import Search from '$lib/components/Search/Search.svelte';
	export let data: { listings: Listing[]; listingsCount: number };

	$: listingsCount.set(data.listingsCount);
</script>

<Search />

<ListingPage {data} />
