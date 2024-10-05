<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { createEventDispatcher } from 'svelte';
	import InputWithLabel from '../ui/input-with-label/InputWithLabel.svelte';

	const dispatch = createEventDispatcher();

	const options = [
		{ label: '€100,000', value: 100000 },
		{ label: '€200,000', value: 200000 },
		{ label: '€300,000', value: 300000 },
		{ label: '€400,000', value: 400000 },
		{ label: '€500,000', value: 500000 },
		{ label: '€600,000', value: 600000 },
		{ label: '€700,000', value: 700000 },
		{ label: '€800,000', value: 800000 },
		{ label: '€900,000', value: 900000 },
		{ label: '€1,000,000', value: 1000000 },
		{ label: 'No limit', value: null }
	];

	$: selectedOption = { label: 'No limit', value: null };

	$: {
		dispatch('price-selected', selectedOption);
	}
</script>

<InputWithLabel textColor="text-black" label="Max price?">
	<Select.Root bind:selected={selectedOption}>
		<Select.Trigger>
			<Select.Value />
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each options as option}
					<Select.Item value={option.value} label={option.label} />
				{/each}
			</Select.Group>
		</Select.Content>
		<Select.Input name="type" />
	</Select.Root>
</InputWithLabel>
