<script lang="ts">
	import Layout from '$lib/components/ui/layout/Layout.svelte';
	import Listing from '$lib/components/Listing/Listing.svelte';
	const { data } = $props();
	const { listing, options } = data;
</script>

<Layout maxWidth={1216}>
	<Listing {listing} {options} />
</Layout>
