<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import type { Snippet } from 'svelte';
	const {
		children,
		label,
		textColor = 'text-white',
		textSize = 'text-sm',
		width
	}: {
		children: Snippet;
		label: string;
		textColor?: 'text-white' | 'text-black';
		textSize?: 'text-sm' | 'text-lg';
		width?: string;
	} = $props();
</script>

<div class={width}>
	<Label class={`font-semibold capitalize ${textSize} ${textColor}`} for="input">{label}</Label>
	<div id="input">{@render children()}</div>
</div>
