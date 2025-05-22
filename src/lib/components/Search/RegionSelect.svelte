<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import FormLabel from '../ui/form-label/FormLabel.svelte';
	import { type Options } from '$lib/data/options';

	let {
		options,
		clearAreaState,
		setRegionValue,
		regionValue,
		setParams,
		searchParams
	}: {
		options: Options;
		clearAreaState: () => void;
		setRegionValue: (value: string) => void;
		regionValue: string;
		setParams: (value: URLSearchParams) => void;
		searchParams: URLSearchParams;
	} = $props();

	const { propertyRegionOptions } = options;

	let selectedRegion = $state(
		propertyRegionOptions.find((region) => region.value === regionValue) || {
			value: null,
			label: 'Any region'
		}
	);

	$effect(() => {
		selectedRegion = propertyRegionOptions.find((region) => region.value === regionValue) || {
			value: null,
			label: 'Any region'
		};
	});

	const handleRegionSelected = (region: string | number) => {
		if (typeof region !== 'string') return;
		const params = new URLSearchParams(searchParams);

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
		setParams(params);
		setRegionValue(region);

	};
</script>

<FormLabel label="Regions" hideLabelOnMobile={true}>
	<Select.Root
		type="single"
		value={selectedRegion.value || undefined}
		onValueChange={(value: string) => handleRegionSelected(value)}
	>
		<Select.Trigger class="w-full">
			{selectedRegion.label || 'Select a region*'}
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
