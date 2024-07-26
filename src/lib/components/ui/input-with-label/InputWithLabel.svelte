<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	export let label: string;
	export let textColor: 'text-white' | 'text-black' = 'text-white';
	export let textSize: 'text-sm' | 'text-lg' = 'text-sm';
</script>

<div>
	<Label class={`font-semibold capitalize ${textSize} ${textColor}`} for="input">{label}</Label>
	<div id="input"><slot /></div>
</div>
