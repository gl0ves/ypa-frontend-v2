<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { type Selected } from 'bits-ui';
	import { createEventDispatcher } from 'svelte';
	import InputWithLabel from '$lib/components/ui/input-with-label/InputWithLabel.svelte';
	const dispatch = createEventDispatcher();
	type HandleSelectValue = Selected<string | number | null> | undefined;

	let {
		selected,
		options,
		label,
		handleSelect
	}: {
		selected: string | number | null;
		options: { label: string; value: string | number | null }[];
		label: string;
		handleSelect: (value: HandleSelectValue) => void;
	} = $props();

	let selectedOption = $state(
		options.find((option) => option.label === selected || option.value === selected)
	);
</script>

<InputWithLabel textColor="text-black" {label}>
	<Select.Root onSelectedChange={handleSelect} bind:selected={selectedOption}>
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
		<Select.Input name={label.toLowerCase()} />
	</Select.Root>
</InputWithLabel>
