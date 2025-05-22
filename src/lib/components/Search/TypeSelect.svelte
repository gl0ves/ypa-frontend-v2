<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import FormLabel from '../ui/form-label/FormLabel.svelte';

	const options = [
		{ label: 'Any type', value: '' },
		{ label: 'Apartment', value: 'Apartment' },
		{ label: 'Commercial and Hotel', value: 'Commercial and Hotel' },
		{ label: 'Finca / Rural house', value: 'Finca / Rural house' },
		{ label: 'House / Villa', value: 'House / Villa' },
		{ label: 'Land', value: 'Land' },
		{ label: 'Penthouse', value: 'Penthouse' }
	];

	let {
		setParams,
		setTypeValue,
		typeValue,
		searchParams
	}: {
		setParams: (value: URLSearchParams) => void;
		setTypeValue: (value: string) => void;
		typeValue: string;
		searchParams: URLSearchParams;
	} = $props();

	const selectedOption = $derived(() => {
		return (
			options.find((option) => option.value === typeValue) || {
				value: '',
				label: 'Any type'
			}
		);
	});

	const handleOptionSelect = (option: string | undefined) => {
		if (option === undefined) return;
		const params = new URLSearchParams(searchParams);
		params.delete('page');
		params.set('type', option.toString());
		setTypeValue(option);
		setParams(params);
	};

	const triggerContent = $derived(() => {
		return selectedOption().label;
	});
</script>

<FormLabel label="Type" hideLabelOnMobile={true}>
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
				{#each options as option}
					<Select.Item value={option.value} label={option.label} />
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</FormLabel>
