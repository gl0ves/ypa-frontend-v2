<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import InputWithLabel from '$lib/components/ui/input-with-label/InputWithLabel.svelte';

	export let selected: string[] = [];
	export let options: string[] = [];

	console.log(options);
	console.log(selected);

	type ComponentArea = {
		label: string;
		value: string;
	};

	const dispatch = createEventDispatcher();
	const searchedAreas = selected

	const parseSearchAreas = (area: string) => {
		return { label: area, value: area };
	};

	$: selectedAreas = searchedAreas.length ? searchedAreas.map(parseSearchAreas) : [];

	$: {
		dispatch('area-selected', selectedAreas);
	}

	$: {
		if (options.length) {
			const selectedValues = options.filter((option) => selected.includes(option));
		}
	}

	const isDisabled = (area: ComponentArea) => {
		return selected.length >= 10 && !selected.some((s) => s === area.value);
	};
</script>

<InputWithLabel textColor="text-black" label="Areas">
	<Select.Root multiple bind:selected={selectedAreas} disabled={selectedAreas.length === 0}>
		{#each selectedAreas as area}
			<input name={area.label ?? ''} hidden value={area.value} />
		{/each}
		<Select.Trigger>
			<Select.Value
				placeholder={selectedAreas.length === 0
					? 'Please select a region'
					: 'Select up to 10 areas'}
			/>
		</Select.Trigger>
		<Select.Content class="overflow-y-auto max-h-[300px]">
			{#each selectedAreas as area}
				<Select.Item disabled={isDisabled(area)} value={area.value} label={area.label ?? ''} />
			{/each}
		</Select.Content>
	</Select.Root>
</InputWithLabel>
