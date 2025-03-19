<script lang="ts">
	import { type Snippet } from 'svelte';

	type Size = 'sm' | 'md' | 'lg';

	let { maxWidth = 'sm', children }: { maxWidth: Size; children: Snippet } = $props();

	const maxWidthClasses = {
		full: 'w-full',
		lg: 'max-w-7xl',
		md: 'max-w-5xl',
		sm: 'max-w-3xl'
	};
</script>

<div class="w-full">
	<div class={`${maxWidthClasses[maxWidth]} px-4 py-8 mx-auto`}>
		{@render children?.()}
	</div>
</div>
