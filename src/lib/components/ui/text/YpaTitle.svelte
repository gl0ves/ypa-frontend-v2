<script lang="ts">
	import type { Snippet } from 'svelte';
	type Color = 'primary' | 'secondary';

	let {
		children,
		color = 'primary'
	}: {
		children: Snippet;
		color?: Color;
	} = $props();

	const colorClasses = {
		primary: 'text-primary',
		secondary: 'text-secondary'
	};
</script>

<h1 class={`${colorClasses[color]} text-lg font-semibold`}>
	{@render children()}
</h1>
