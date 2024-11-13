<script lang="ts">
	import ListingPage from '$lib/components/ListingPage/ListingPage.svelte';
	import Search from '$lib/components/Search/Search.svelte';
	import Layout from '$lib/components/ui/layout/Layout.svelte';
	const { data } = $props();
</script>

<Search {data} />

<Layout maxWidth="lg">
	<ListingPage {data} />
</Layout>
