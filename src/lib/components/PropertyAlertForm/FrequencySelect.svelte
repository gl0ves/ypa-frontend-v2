<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { createEventDispatcher } from 'svelte';
	import InputWithLabel from '../ui/input-with-label/InputWithLabel.svelte';
	export let selected: number = 7;

	const dispatch = createEventDispatcher();

	const options = [
		{ label: 'Every day', value: 1 },
		{ label: 'Once a week', value: 7 },
		{ label: 'Once a month', value: 30 }
	];

	$: selectedOption = options.find((option) => option.value === selected);

	$: {
		dispatch('interval-selected', selectedOption);
	}
</script>

<InputWithLabel textColor="text-black" label="How often would you like to receive alerts?">
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
