<script lang="ts">
	import Layout from '$lib/components/ui/layout/Layout.svelte';
	import Listing from '$lib/components/Listing/Listing.svelte';
	const { data } = $props();
</script>

<Layout maxWidth={1216}>
	<Listing listing={data.listing} options={data.options} />
</Layout>
