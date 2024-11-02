<script lang="ts">
	import { type Snippet } from 'svelte';
	const { maxWidth = 1000, children }: { maxWidth: Number; children: Snippet } = $props();
</script>

<div class="flex justify-center">
	<div class={`w-full max-w-[${maxWidth}px]`}>
		{@render children?.()}
	</div>
</div>
