<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import InputWithLabel from '$lib/components/ui/input-with-label/InputWithLabel.svelte';

	const searched = $page.url.searchParams.getAll('areas') || [];
	const dispatch = createEventDispatcher();
	export let propAreas: { area: string }[] = [];
	const searchedAreas = $page.data.areas;

	const parseSearchAreas = (area: string) => {
		return { label: area, value: area };
	};

	$: areas = searchedAreas.length ? searchedAreas.map(parseSearchAreas) : [];

	$: selectedAreas =
		searched.map((value) => ({
			label: value,
			value: value
		})) || [];

	$: {
		dispatch('area-selected', selectedAreas);
	}

	$: {
		if (propAreas) {
			areas = propAreas.map((a) => ({ label: a.area, value: a.area }));
			selectedAreas = selectedAreas.filter((selected) =>
				areas.some((area: { label: string; value: string }) => area.value === selected.value)
			);
		}
	}
</script>

<InputWithLabel textColor="text-black" label="Areas">
	<Select.Root multiple bind:selected={selectedAreas} disabled={areas.length === 0}>
		{#each areas as area}
			<input name={area.label ?? ''} hidden value={area.value} />
		{/each}
		<Select.Trigger>
			<Select.Value
				placeholder={areas.length === 0 ? 'Please select a region' : 'Select up to 10 areas'}
			/>
		</Select.Trigger>
		<Select.Content class="overflow-y-auto max-h-[300px]">
			{#each areas as area}
				<Select.Item
					disabled={selectedAreas.length === 10 &&
						!selectedAreas.some((a) => a.value === area.value)}
					value={area.value}
					label={area.label ?? ''}
				/>
			{/each}
		</Select.Content>
	</Select.Root>
</InputWithLabel>
