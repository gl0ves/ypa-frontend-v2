<script lang="ts">
	import Layout from '$lib/components/ui/layout/Layout.svelte';
	import BlogPostCard from '$lib/components/BlogPostCard.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import { createBlogPost } from '$lib/api';
	const { data } = $props();

	let title = $state('');

	const handleCreate = async () => {
		if (!title.trim()) return;

		const data = await createBlogPost({
			title,
			category: 'blog'
		});

		goto(`/writer/${data.id}`);
	};
</script>

<Layout maxWidth="lg">
	<div class="flex flex-row gap-4">
		<Input bind:value={title} placeholder="Title" />
		<Button onclick={handleCreate}>Create Post</Button>
	</div>

	<div class="pt-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4">
		{#each data.posts as post}
			<div class="mb-2">
				<BlogPostCard {post} url={`/writer/${post.id}`} />
			</div>
		{/each}
	</div>
</Layout>
