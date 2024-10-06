<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { regions } from '../Search/regions';
	import { page } from '$app/stores';
	import InputWithLabel from '../ui/input-with-label/InputWithLabel.svelte';
	import { createEventDispatcher } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { browser } from '$app/environment';

	const dispatch = createEventDispatcher();

	export let selected: string | null = null;
	const selectedDataRegion = regions.find(
		(region) => region.label === selected || region.value === selected
	);
	const searchParams = $page.url.searchParams;
	const regionParam = searchParams.get('region');

	const regionObj = selectedDataRegion
		? selectedDataRegion
		: regions.find((region) => region.value === regionParam);
	let selectedRegion = regionObj
		? { label: regionObj.label, value: regionObj.value }
		: { label: 'All Regions', value: '' };

	$: {
		if (selected !== selectedRegion.value) {
			dispatch('region-selected', selectedRegion.value);
			if (browser) invalidate('areas');
		}
	}
</script>

<InputWithLabel textColor="text-black" label="Regions">
	<Select.Root bind:selected={selectedRegion}>
		<Select.Trigger>
			<Select.Value placeholder="Select a region" />
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each regions as region}
					<Select.Item value={region.value} label={region.label}>{region.label}</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
		<Select.Input name="region" />
	</Select.Root>
</InputWithLabel>
