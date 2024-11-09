<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import FormLabel from '../ui/form-label/FormLabel.svelte';
	import { type Options, type Option } from '$lib/data/options';
	import { type Selected } from 'bits-ui';
	type HandleSelectValue = Selected<string | number | null> | undefined;

	const { bedOrBath, options }: { bedOrBath: 'bedrooms' | 'bathrooms'; options: Options } =
		$props();

	const defaultValue = { value: 0, label: 'Any amount' };

	const { bedAndBathroomOptions } = options;

	const param = $derived($page.url.searchParams.get(bedOrBath) || '0');
	let selectedOption = $state(
		bedAndBathroomOptions.find((option: Option) => option.value?.toString() === param) ||
			defaultValue
	);

	$effect(() => {
		if (param === '0') selectedOption = defaultValue;
	});

	const handleOptionSelect = (option: HandleSelectValue) => {
		if (!option) return;
		const value = option.value;
		if (typeof value === 'undefined' || typeof value != 'number') return;
		const updatedParams = new URLSearchParams($page.url.searchParams);
		if (value === 0) updatedParams.delete(bedOrBath);
		if (value >= 1) updatedParams.set(bedOrBath, value.toString());
		goto(`?${updatedParams.toString()}`);
	};
</script>

<FormLabel label={bedOrBath}>
	<Select.Root selected={selectedOption} onSelectedChange={handleOptionSelect}>
		<Select.Trigger class="w-[250px]">
			<Select.Value />
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each bedAndBathroomOptions as option}
					<Select.Item value={option.value} label={option.label} />
				{/each}
			</Select.Group>
		</Select.Content>
		<Select.Input name={bedOrBath} />
	</Select.Root>
</FormLabel>
