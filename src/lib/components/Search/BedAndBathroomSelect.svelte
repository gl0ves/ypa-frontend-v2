<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import FormLabel from '../ui/form-label/FormLabel.svelte';
	import { type Options, type Option } from '$lib/data/options';

	let { bedOrBath, options }: { bedOrBath: 'bedrooms' | 'bathrooms'; options: Options } = $props();

	const defaultValue = { value: '0', label: 'Any amount' };

	const { bedAndBathroomOptions } = options;

	const param = $derived(page.url.searchParams.get(bedOrBath) || '0');
	let selectedOption = $derived(() => {
		if (param === '0') return defaultValue;
		return (
			bedAndBathroomOptions.find((option: Option) => option.value?.toString() === param) ||
			defaultValue
		);
	});

	const handleOptionSelect = (option: string) => {
		if (!option) return;
		if (typeof option === 'undefined') return;
		const updatedParams = new URLSearchParams(page.url.searchParams);
		const parsedValue = parseInt(option);
		if (parsedValue === 0) updatedParams.delete(bedOrBath);
		if (parsedValue >= 1) updatedParams.set(bedOrBath, option);
		goto(`?${updatedParams.toString()}`);
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
