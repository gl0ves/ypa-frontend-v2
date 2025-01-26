<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import FormLabel from '../ui/form-label/FormLabel.svelte';
	import { type Options, type PropertyRegionOption } from '$lib/data/options';

	let { options, clearAreaState }: { options: Options; clearAreaState: () => void } = $props();

	const { propertyRegionOptions } = options;

	const searchParams = $derived(page.url.searchParams);
	const regionParam = $derived(searchParams.get('region'));
	let selectedRegion = $state(
		propertyRegionOptions.find((region) => region.value === regionParam) || {
			value: null,
			label: 'Any region'
		}
	);

	$effect(() => {
		selectedRegion = propertyRegionOptions.find((region) => region.value === regionParam) || {
			value: null,
			label: 'Any region'
		};
	});

	const handleRegionSelected = (region: string | number) => {
		if (typeof region !== 'string') return;
		const params = new URLSearchParams(page.url.searchParams);

		params.delete('page');
		params.delete('region');

		if (region) {
			if (params.get('region') !== region) {
				params.delete('areas');
				clearAreaState();
			}
			params.set('region', region);
		} else {
			params.delete('areas');
			clearAreaState();
		}

		goto(`?${params.toString()}`);
	};
</script>

<FormLabel label="Regions">
	<Select.Root
		type="single"
		value={selectedRegion.value || undefined}
		onValueChange={(value: string) => handleRegionSelected(value)}
	>
		<Select.Trigger class="w-full">
			{'Select a region'}
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each propertyRegionOptions as region}
					<Select.Item value={region.value || ''} label={region.label}>{region.label}</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</FormLabel>
