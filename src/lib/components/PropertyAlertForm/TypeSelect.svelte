<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import InputWithLabel from '../ui/input-with-label/InputWithLabel.svelte';
	export let selected: string = ($page.url.searchParams.get('type') ?? '') as string;
	const dispatch = createEventDispatcher();

	const options = [
		{ label: 'Any type', value: '' },
		{ label: 'Apartment', value: 'Apartment' },
		{ label: 'Commercial and Hotel', value: 'Commercial and Hotel' },
		{ label: 'Finca / Rural house', value: 'Finca / Rural house' },
		{ label: 'House / Villa', value: 'House / Villa' },
		{ label: 'Land', value: 'Land' },
		{ label: 'Penthouse', value: 'Penthouse' }
	];

	$: selectedOption = options.find((option) => option.value === selected) || {
		value: '',
		label: 'Any type'
	};

	$: {
		dispatch('type-selected', selectedOption);
	}
</script>

<InputWithLabel textColor="text-black" label="Type">
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
