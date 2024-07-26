<script lang="ts">
	import type { Listing } from '$lib/ypaTypes';
	import ListingPage from '$lib/components/ListingPage/ListingPage.svelte';
	import Search from '$lib/components/Search/Search.svelte';
	export let data: { listings: Listing[]; listingsCount: number };
</script>

<Search />
<ListingPage {data} />
