<script lang="ts">
	import { Toggle } from '$lib/components/ui/toggle/index.js';
	import YpaText from './ui/text/YpaText.svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	const { tags }: { tags: string[] } = $props();

	const pressedTags = $derived(() => {
		return page.url.searchParams.getAll('tags');
	});

	const navigate = (tag: string) => {
		const params = new URLSearchParams(page.url.searchParams);
		const tags = new Set(params.get('tags')?.split(',') || []);
		tags.has(tag) ? tags.delete(tag) : tags.add(tag);
		tags.size ? params.set('tags', Array.from(tags).join(',')) : params.delete('tags');
		goto(`?${params.toString()}`);
	};
</script>

<YpaText size="md" weight="semibold">Topics</YpaText>
<div class="flex gap-1 flex-wrap">
	{#each tags as tag}
		<Toggle
			onPressedChange={() => navigate(tag)}
			pressed={pressedTags().includes(tag)}
			variant="outline"
			aria-label="Toggle italic"
		>
			<div class="font-semibold">
				{tag}
			</div>
		</Toggle>
	{/each}
</div>
