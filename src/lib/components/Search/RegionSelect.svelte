<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { regions } from './regions';
	import { page } from '$app/stores';
	import InputWithLabel from './InputWithLabel.svelte';

	const params = $page.url.searchParams;
	const regionParam = params.get('region');

	onMount(() => {
		if (!regionParam) {
			params.delete('region');
			goto(`?${params.toString()}`);
		}
	});

	$: selectedRegion = regionParam
		? { label: regionParam, value: regionParam }
		: { label: 'All Regions', value: '' };

	const handleRegionSelected = (region: string) => {
		params.delete('page');
		params.delete('region');
		if (!region) {
			params.delete('areas');
			return goto(`?${params.toString()}`);
		}
		if (params.get('region') != region) params.delete('areas');
		params.set('region', region);
		goto(`?${params.toString()}`);
	};
</script>

<InputWithLabel label="Regions">
	<Select.Root
		selected={selectedRegion}
		onSelectedChange={(region) => handleRegionSelected(region?.value || '')}
	>
		<Select.Trigger class="w-[250px]">
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
