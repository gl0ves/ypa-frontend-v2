<script lang="ts">
	import Layout from '$lib/components/ui/layout/Layout.svelte';
	import BlogPostCard from '$lib/components/BlogPostCard.svelte';
	const { data } = $props();
</script>

<Layout maxWidth="lg">
	<div class="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each data.posts as post}
			<div class="mb-2">
				<BlogPostCard {post} url={`/writer/${post.slug}`} />
			</div>
		{/each}
	</div>
</Layout>
