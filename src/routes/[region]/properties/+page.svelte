<script lang="ts">
	import type { Listing } from '$lib/ypaTypes';
	import ListingPage from '$lib/components/ListingPage/ListingPage.svelte';
	export let data: { listings: Listing[]; listingsCount: number };
</script>

<ListingPage {data} />
