<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import InputWithLabel from '../ui/input-with-label/InputWithLabel.svelte';

	$: areas = $page.data.areas.length
		? $page.data.areas.map((a: string) => {
				return { label: a, value: a };
			})
		: [];

	$: selectedAreas =
		$page.url.searchParams.getAll('areas')?.map((value) => ({
			label: value,
			value: value
		})) || [];

	type Selected<T> = { value: T; label?: string };

	const handleAreaSelected = (selected: Selected<unknown>[] | undefined) => {
		if (!selected) return;

		// Map selected areas to their values
		const selectedValues = selected.map((area) => area.value);

		// Create a new URLSearchParams object from the current search parameters
		const params = new URLSearchParams(window.location.search);

		params.delete('page');
		params.delete('areas');

		// Update the 'areas' parameter with the joined list of selected area values
		selectedValues.forEach((area) => {
			if (typeof area !== 'string') return;
			params.append('areas', area);
		});

		// Navigate using the updated parameters
		goto(`?${params.toString()}`);
	};
</script>

<InputWithLabel label="Areas">
	<Select.Root
		multiple
		disabled={areas.length === 0}
		selected={selectedAreas}
		onSelectedChange={(areas) => handleAreaSelected(areas)}
	>
		{#each areas as area}
			<input name={area.label ?? ''} hidden value={area.value} />
		{/each}
		<Select.Trigger class="w-[250px]">
			<Select.Value
				placeholder={areas.length === 0 ? 'Please select a region' : 'Select up to 10 areas'}
			/>
		</Select.Trigger>
		<Select.Content class="overflow-y-auto max-h-[300px] max-w-[250px]">
			{#each areas as area}
				<Select.Item
					disabled={selectedAreas.length === 10 &&
						selectedAreas.every((a) => a.value !== area.value)}
					value={area.value}
					label={area.label ?? ''}
				/>
			{/each}
		</Select.Content>
	</Select.Root>
</InputWithLabel>
