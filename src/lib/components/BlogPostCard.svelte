<script lang="ts">
	import type { BlogPost } from '$lib/ypaTypes';
	import { goto } from '$app/navigation';
	const { post }: { post: BlogPost } = $props();
</script>

<div class="w-96 h-64 bg-white shadow rounded-lg overflow-hidden relative">
	<button onclick={() => goto(`/blog/${post.slug}`)} class="w-full h-full">
		<img src={post.cover} alt={post.title} class="w-full h-full object-cover" />
		<div class="text-left absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
			<h2 class="text-xl font-bold text-white mb-2">{post.title}</h2>
			<h3 class="text-xl font-bold text-white mb-3">{post.published_when}</h3>
		</div>
	</button>
</div>
