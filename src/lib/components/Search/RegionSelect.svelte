<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Select from '$lib/components/ui/select/index.js';
	import { regions } from './regions';

	$: selectedRegion = { text: 'All Regions', value: '' };

	const handleRegionSelected = (region: { value: string; text: string }) => {
		// Get current search params and replace region value or set it if it doesnt exist
		const params = new URLSearchParams(window.location.search);
		params.set('region', region.value);
		goto(`?${params.toString()}`);
	};
</script>

<Select.Root selected={selectedRegion} onSelectedChange={(region) => handleRegionSelected(region)}>
	<Select.Trigger class="w-[180px]">
		<Select.Value placeholder="Select a region" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each regions as region}
				<Select.Item value={region.value} label={region.text}>{region.text}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="region" />
</Select.Root>
