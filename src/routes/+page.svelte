<script lang="ts">
	import ListingPage from '$lib/components/ListingPage/ListingPage.svelte';
	import Search from '$lib/components/Search/Search.svelte';
	export let data;
</script>

<Search {data} />

<ListingPage {data} />
