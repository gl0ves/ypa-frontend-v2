<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { type Selected } from 'bits-ui';
	import FormLabel from '$lib/components/ui/form-label/FormLabel.svelte';

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

<FormLabel textColor="text-black" {label}>
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
</FormLabel>
