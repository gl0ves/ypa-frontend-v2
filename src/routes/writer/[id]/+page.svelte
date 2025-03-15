<script lang="ts">
	import Layout from '$lib/components/ui/layout/Layout.svelte';   
	import Writer from '$lib/components/Writer/Writer.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

    const { data } = $props();
    let slug = $state(data.blog.slug);
</script>

<Layout maxWidth="lg">
    <Input bind:value={slug} />
	<div class="pt-4">
		<Writer data={data.blog} />
	</div>
</Layout>
