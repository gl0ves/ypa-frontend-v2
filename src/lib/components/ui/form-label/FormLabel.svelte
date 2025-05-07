<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import type { Snippet } from 'svelte';
	let {
		children,
		label,
		required = false,
		textColor = 'text-white',
		textSize = 'text-sm',
		width
	}: {
		children: Snippet;
		label: string;
		required?: boolean;
		textColor?: 'text-white' | 'text-black';
		textSize?: 'text-sm' | 'text-lg';
		width?: string;
	} = $props();
</script>

<div class={width}>
	<Label class={`font-semibold capitalize text-left ${textSize} ${textColor}`} for="input">
		{label}
		{#if required}
			<span class="text-red-500 ml-1">*</span>
		{/if}
	</Label>
	<div id="input">{@render children()}</div>
</div>
