<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { page } from '$app/stores';
	import InputWithLabel from '../ui/input-with-label/InputWithLabel.svelte';
	import { createEventDispatcher } from 'svelte';
	export let bedOrBath: 'bedrooms' | 'bathrooms';

	const dispatch = createEventDispatcher();

	const options = [
		{ label: 'Any amount', value: 0 },
		{ label: '1+', value: 1 },
		{ label: '2+', value: 2 },
		{ label: '3+', value: 3 },
		{ label: '4+', value: 4 },
		{ label: '5+', value: 5 }
	];

	const param = $page.url.searchParams.get(bedOrBath);

	$: selectedOption = options.find((option) => option.value.toString() === param) || {
		label: 'Any amount',
		value: 0
	};

	$: {
		dispatch(`${bedOrBath}-selected`, selectedOption);
	}
</script>

<InputWithLabel textColor="text-black" bind:label={bedOrBath}>
	<Select.Root bind:selected={selectedOption}>
		<Select.Trigger>
			<Select.Value />
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each options as option}
					<Select.Item value={option.value} label={option.label} />
				{/each}
			</Select.Group>
		</Select.Content>
		<Select.Input bind:name={bedOrBath} />
	</Select.Root>
</InputWithLabel>
