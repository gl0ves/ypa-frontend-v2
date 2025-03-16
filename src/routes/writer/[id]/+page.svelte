<script lang="ts">
	import Layout from '$lib/components/ui/layout/Layout.svelte';
	import Writer from '$lib/components/Writer/Writer.svelte';
	const { data } = $props();
</script>

<Layout maxWidth="lg">
	<div class="pt-4">
		<Writer data={data.blog} />
	</div>
</Layout>
