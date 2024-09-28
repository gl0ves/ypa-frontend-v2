<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import InputWithLabel from '$lib/components/ui/input-with-label/InputWithLabel.svelte';

	export let options: string[] = [];

	const parseSearchAreas = (area: string) => {
		return { label: area, value: area };
	};

	const searchedAreas = $page.url.searchParams.getAll("areas").map(parseSearchAreas)
	const parsedOptions = options.map(parseSearchAreas)


	$: selectedAreas = []

	
</script>

<InputWithLabel textColor="text-black" label="Areas">
	<Select.Root multiple bind:selected={selectedAreas} disabled={parsedOptions.length === 0}>
		{#each parsedOptions as area}
			<input name={area.label ?? ''} hidden value={area.value} />
		{/each}
		<Select.Trigger>
			<Select.Value
				placeholder={options.length === 0
					? 'Please select a region'
					: 'Select up to 10 areas'}
			/>
		</Select.Trigger>
		<Select.Content class="overflow-y-auto max-h-[300px]">
			{#each parsedOptions as area}
				<Select.Item  value={area.value} label={area.label ?? ''} />
			{/each}
		</Select.Content>
	</Select.Root>
</InputWithLabel>
