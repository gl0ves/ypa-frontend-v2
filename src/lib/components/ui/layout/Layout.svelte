<script lang="ts">
	import { type Snippet } from 'svelte';

	type Size = 'sm' | 'md' | 'lg';

	const { maxWidth = 'sm', children }: { maxWidth: Size; children: Snippet } = $props();

	const maxWidthClasses = {
		lg: 'max-w-7xl',
		md: 'max-w-5xl',
		sm: 'max-w-3xl'
	};
</script>

<div class="w-full flex justify-center">
	<div class={`${maxWidthClasses[maxWidth]} min-h-[900px] px-4 py-8`}>
		{@render children?.()}
	</div>
</div>
