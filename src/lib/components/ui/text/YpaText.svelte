<script lang="ts">
	import type { Snippet } from 'svelte';
	type Size = 'sm' | 'md' | 'lg';
	type Color = 'primary' | 'secondary' | 'white';
	type Weight = 'normal' | 'semibold' | 'bold';

	const {
		children,
		size = 'md',
		color = 'primary',
		weight = 'normal'
	}: {
		children: Snippet;
		size?: Size;
		color?: Color;
		weight?: Weight;
	} = $props();

	const sizeClasses = {
		sm: 'text-sm',
		md: 'text-md',
		lg: 'text-lg uppercase'
	};

	const colorClasses = {
		primary: 'text-primary',
		secondary: 'text-secondary',
		white: 'text-white'
	};

	const weightClasses = {
		normal: 'font-normal',
		semibold: 'font-semibold',
		bold: 'font-bold'
	};
</script>

<div class={`${sizeClasses[size]} ${colorClasses[color]} ${weightClasses[weight]}`}>
	{@render children()}
</div>
