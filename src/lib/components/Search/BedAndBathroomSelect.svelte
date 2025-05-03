<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import FormLabel from '../ui/form-label/FormLabel.svelte';
	import { type Options, type Option } from '$lib/data/options';

	let {
		bedOrBath,
		options,
		setParams,
		setValue,
		value,
		searchParams
	}: {
		bedOrBath: 'bedrooms' | 'bathrooms';
		options: Options;
		setParams: (value: URLSearchParams) => void;
		setValue: (value: string) => void;
		value: string;
		searchParams: URLSearchParams;
	} = $props();

	const defaultValue = { value: '0', label: 'Any amount' };

	const { bedAndBathroomOptions } = options;

	let selectedOption = $derived(() => {
		if (value === '0') return defaultValue;
		return (
			bedAndBathroomOptions.find((option: Option) => option.value?.toString() === value) ||
			defaultValue
		);
	});

	const handleOptionSelect = (option: string) => {
		if (!option) return;
		if (typeof option === 'undefined') return;
		const updatedParams = new URLSearchParams(searchParams);
		const parsedValue = parseInt(option);
		if (parsedValue === 0) updatedParams.delete(bedOrBath);
		if (parsedValue >= 1) updatedParams.set(bedOrBath, option);
		setValue(option);
		setParams(updatedParams);
	};

	const triggerContent = $derived(() => {
		return selectedOption().label || 'Any amount';
	});
</script>

<FormLabel label={bedOrBath}>
	<Select.Root
		type="single"
		value={selectedOption().value}
		onValueChange={(value) => handleOptionSelect(value)}
	>
		<Select.Trigger class="w-full">
			{triggerContent()}
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each bedAndBathroomOptions as option}
					<Select.Item value={option.value} label={option.label} />
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</FormLabel>
