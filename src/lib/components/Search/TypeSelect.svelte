<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
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

	$: param = $page.url.searchParams.get('type') || 'Any type';

	$: selectedOption = options.find((option) => option.value === param) || {
		value: '',
		label: 'Any type'
	};

	const handleOptionSelect = (option: string | undefined) => {
		if (option === undefined) return;
		const params = new URLSearchParams($page.url.searchParams);
		params.delete('page');
		params.set('type', option.toString());
		goto(`?${params.toString()}`);
	};
</script>

<FormLabel label="Type">
	<Select.Root
		selected={selectedOption}
		onSelectedChange={(option) => handleOptionSelect(option?.value)}
	>
		<Select.Trigger class="w-[250px]">
			<Select.Value />
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each options as option}
					<Select.Item value={option.value} label={option.label} />
				{/each}
			</Select.Group>
		</Select.Content>
		<Select.Input name="type" />
	</Select.Root>
</FormLabel>
