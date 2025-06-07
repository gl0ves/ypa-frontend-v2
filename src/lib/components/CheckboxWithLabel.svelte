<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	let {
		label,
		handleChecked
	}: {
		label: string;
		handleChecked: (value: boolean) => void;
	} = $props();
	let checked = $state(false);
	$effect(() => {
		handleChecked(checked);
	});
</script>

<div class="flex items-center space-x-2 mb-4">
	<Checkbox id="terms" bind:checked />
	<Label
		for="terms"
		class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
	>
		{label}
	</Label>
</div>
