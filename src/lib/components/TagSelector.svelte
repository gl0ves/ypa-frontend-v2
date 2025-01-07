<script lang="ts">
	import { Toggle } from '$lib/components/ui/toggle/index.js';
	import YpaText from './ui/text/YpaText.svelte';
	const { tags }: { tags: string[] } = $props();
</script>

<YpaText size="md" weight="semibold">Topics</YpaText>
<div class="flex gap-1 flex-wrap">
	{#each tags as tag}
		<Toggle
			onclick={() => {}}
			pressed={false}
			disabled
			variant="outline"
			aria-label="Toggle italic"
		>
			<div class="font-semibold">
				{tag}
			</div>
		</Toggle>
	{/each}
</div>
