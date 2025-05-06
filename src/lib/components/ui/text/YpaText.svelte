<script lang="ts">
	import type { Snippet } from 'svelte';
	type Size = 'sm' | 'md' | 'lg';
	type Color = 'primary' | 'secondary' | 'white' | 'muted' | 'read';
	type Weight = 'normal' | 'semibold' | 'bold';

	let {
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
		white: 'text-white',
		muted: 'text-gray-600',
		read: 'text-gray-800'
	};

	const weightClasses = {
		normal: 'font-normal',
		semibold: 'font-semibold',
		bold: 'font-bold'
	};
</script>

{#if size === 'lg'}
	<h1 class={`${sizeClasses[size]} ${colorClasses[color]} ${weightClasses[weight]}`}>
		{@render children()}
	</h1>
{:else if size === 'md'}
	<h2 class={`${sizeClasses[size]} ${colorClasses[color]} ${weightClasses[weight]}`}>
		{@render children()}
	</h2>
{:else}
	<div class={`${sizeClasses[size]} ${colorClasses[color]} ${weightClasses[weight]}`}>
		{@render children()}
	</div>
{/if}
