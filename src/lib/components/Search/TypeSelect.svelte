<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
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

	const param = $derived(() => page.url.searchParams.get('type') || 'Any type');

	const selectedOption = $derived(() => {
		return (
			options.find((option) => option.value === param()) || {
				value: '',
				label: 'Any type'
			}
		);
	});

	const handleOptionSelect = (option: string | undefined) => {
		if (option === undefined) return;
		const params = new URLSearchParams(page.url.searchParams);
		params.delete('page');
		params.set('type', option.toString());
		goto(`?${params.toString()}`);
	};

	const triggerContent = $derived(() => {
		return selectedOption().label;
	});
</script>

<FormLabel label="Type">
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
