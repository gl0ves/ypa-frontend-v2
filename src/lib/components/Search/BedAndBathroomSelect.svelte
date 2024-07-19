<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Label } from '$lib/components/ui/label/index.js';
	import InputWithLabel from './InputWithLabel.svelte';

	export let bedOrBath: 'bedrooms' | 'bathrooms';

	const options = [
		{ label: 'Any amount', value: 0 },
		{ label: '1+', value: 1 },
		{ label: '2+', value: 2 },
		{ label: '3+', value: 3 },
		{ label: '4+', value: 4 },
		{ label: '5+', value: 5 }
	];

	const param = $page.url.searchParams.get(bedOrBath) || '0';

	$: selectedOption = options.find((option) => option.value.toString() === param);

	const handleOptionSelect = (option: number | undefined) => {
		const updatedParams = new URLSearchParams($page.url.searchParams);
		if (option === undefined) return;
		if (option === 0) updatedParams.delete(bedOrBath);
		if (option >= 1) updatedParams.set(bedOrBath, option.toString());
		goto(`?${updatedParams.toString()}`);
	};
</script>

<InputWithLabel bind:label={bedOrBath}>
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
		<Select.Input bind:name={bedOrBath} />
	</Select.Root>
</InputWithLabel>
