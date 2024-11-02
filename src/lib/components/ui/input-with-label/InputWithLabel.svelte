<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import type { Snippet } from 'svelte';
	const {
		children,
		label,
		textColor = 'text-white',
		textSize = 'text-sm'
	}: {
		children: Snippet;
		label: string;
		textColor?: 'text-white' | 'text-black';
		textSize?: 'text-sm' | 'text-lg';
	} = $props();
</script>

<div>
	<Label class={`font-semibold capitalize ${textSize} ${textColor}`} for="input">{label}</Label>
	<div id="input">{@render children()}</div>
</div>
