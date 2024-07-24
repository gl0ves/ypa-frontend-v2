<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { regions } from './regions';
	import { page } from '$app/stores';
	import InputWithLabel from '../ui/input-with-label/InputWithLabel.svelte';

	$: searchParams = $page.url.searchParams;
	$: regionParam = searchParams.get('region');
	$: regionObj = regions.find((region) => region.value === regionParam);
	$: selectedRegion = regionObj
		? { label: regionObj.label, value: regionObj.value }
		: { label: 'All Regions', value: '' };

	onMount(() => {
		if (!regionParam) {
			const params = new URLSearchParams($page.url.searchParams);
			params.delete('region');
			goto(`?${params.toString()}`);
		}
	});

	const handleRegionSelected = (region: string) => {
		const params = new URLSearchParams($page.url.searchParams);

		params.delete('page');
		params.delete('region');

		if (region) {
			if (params.get('region') !== region) {
				params.delete('areas');
			}
			params.set('region', region);
		} else {
			params.delete('areas');
		}

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
