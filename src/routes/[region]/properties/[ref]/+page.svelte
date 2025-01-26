<script lang="ts">
	import Layout from '$lib/components/ui/layout/Layout.svelte';
	import Listing from '$lib/components/Listing/Listing.svelte';
	let { data } = $props();
</script>

<Layout maxWidth="lg">
	<Listing listing={data.listing} options={data.options} />
</Layout>
