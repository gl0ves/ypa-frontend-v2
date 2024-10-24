<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { type Selected } from 'bits-ui';
	import { createEventDispatcher } from 'svelte';
	import InputWithLabel from '$lib/components/ui/input-with-label/InputWithLabel.svelte';
	const dispatch = createEventDispatcher();

	export let selected: string | number | null;
	export let options: { label: string; value: string | number | null }[];
	export let label: string;

	let selectedOption = options.find(
		(option) => option.label === selected || option.value === selected
	);

	const handleSelectedChanged = (value: Selected<string | number | null> | undefined) => {
		dispatch('selected', value);
	};
</script>

<InputWithLabel textColor="text-black" {label}>
	<Select.Root onSelectedChange={handleSelectedChanged} bind:selected={selectedOption}>
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
