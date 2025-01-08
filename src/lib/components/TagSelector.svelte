<script lang="ts">
	import { Toggle } from '$lib/components/ui/toggle/index.js';
	import YpaText from './ui/text/YpaText.svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	const { tags }: { tags: string[] } = $props();

	const pressedTag = $derived(() => {
		return page.url.searchParams.get('tag');
	});

	const navigate = (tag: string) => {
		const params = new URLSearchParams(page.url.searchParams);
		const currentTag = params.get('tag');
		if (currentTag === tag) {
			params.delete('tag');
		} else {
			params.set('tag', tag);
		}
		goto(`?${params.toString()}`);
	};
</script>

<YpaText size="md" weight="semibold">Topics</YpaText>
<div class="flex gap-1 flex-wrap">
	{#each tags as tag}
		<Toggle
			onPressedChange={() => navigate(tag)}
			pressed={tag == pressedTag()}
			variant="outline"
			aria-label="Toggle italic"
		>
			<div class="font-semibold">
				{tag}
			</div>
		</Toggle>
	{/each}
</div>
