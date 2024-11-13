<script lang="ts">
	import { type Snippet } from 'svelte';

	type Size = 'sm' | 'md' | 'lg';

	const { maxWidth, children }: { maxWidth: Size; children: Snippet } = $props();

	const maxWidthClasses = {
		lg: 'max-w-7xl',
		md: 'max-w-5xl',
		sm: 'max-w-3xl'
	};
</script>

<div class="w-full flex justify-center">
	<div class={maxWidthClasses[maxWidth]}>
		{@render children?.()}
	</div>
</div>
