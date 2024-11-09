<script lang="ts">
	import { type Snippet } from 'svelte';
	const { maxWidth = 1000, children }: { maxWidth: number; children: Snippet } = $props();
</script>

<div class="flex justify-center overflow-hidden">
	<div class={`w-full max-w-[${maxWidth}px] px-4`}>
		{@render children?.()}
	</div>
</div>
