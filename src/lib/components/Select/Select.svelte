<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import FormLabel from '$lib/components/ui/form-label/FormLabel.svelte';

	type HandleSelectValue = string | null;

	let {
		placeholder = 'Select an option',
		selected,
		options,
		label,
		handleSelect
	}: {
		placeholder?: string;
		selected: string | number | null;
		options: { label: string; value: string | null }[];
		label: string;
		handleSelect: (value: HandleSelectValue) => void;
	} = $props();

	let selectedOption = $derived(() => {
		const option = options.find((option) => option.value === selected || option.label === selected);
		return option;
	});

	const triggerContent = $derived(() => {
		return selectedOption()?.label ?? placeholder;
	});
</script>

<FormLabel textColor="text-black" {label}>
	<Select.Root
		type="single"
		onValueChange={(value: string) => handleSelect(value)}
		value={selectedOption()?.value}
	>
		<Select.Trigger>
			<span>{triggerContent()}</span>
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each options as option}
					<Select.Item value={option.value} label={option.label} />
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</FormLabel>
