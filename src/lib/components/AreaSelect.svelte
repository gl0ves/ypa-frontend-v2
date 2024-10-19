<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { createEventDispatcher } from 'svelte';
	import IconCheck from '~icons/mdi/check';
	import IconCaret from '~icons/mdi/caret-down';
	import InputWithLabel from '$lib/components/ui/input-with-label/InputWithLabel.svelte';

	export let options: string[] = [];
	export let selected: string[] = [];
	export let areaSelectLabelColor: 'text-white' | 'text-black' = 'text-white';

	const parseSelected = (area: string) => {
		return { label: area, value: area };
	};

	$: parsedOptions = options.map(parseSelected);
	$: parsedSelected = selected.map(parseSelected);

	const dispatch = createEventDispatcher();
	const handleAreaSelected = (selected: string) => {
		if (!selected) return;
		dispatch('area-selected', selected);
	};

	let open = false;

	const truncateLabel = (label: string, maxLength = 25) => {
		if (!label) return 'Select areas...';
		return label.length > maxLength ? label.slice(0, maxLength) + '...' : label;
	};

	$: combinedLabel = truncateLabel([...selected].join(', '));
</script>

<Popover.Root bind:open>
	<Popover.Trigger asChild let:builder>
		<InputWithLabel label="Areas" textColor={areaSelectLabelColor}>
			<Button
				builders={[builder]}
				variant="outline"
				disabled={!options.length}
				role="combobox"
				aria-expanded={open}
				class="w-[100%] max-w-[100%] justify-between overflow-hidden truncate"
			>
				{#if !options.length}
					Please select a region
				{:else}
					{combinedLabel}
				{/if}
				<IconCaret class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Button>
		</InputWithLabel>
	</Popover.Trigger>
	<Popover.Content class="max-w-[361px] w-[90%] p-0">
		<Command.Root>
			<Command.Input placeholder="Search area..." class="h-9" />
			<Command.Empty>No areas found.</Command.Empty>
			<Command.Group class="max-h-[300px] overflow-y-scroll">
				{#each parsedOptions as option}
					<Command.Item value={option.value} onSelect={(value) => handleAreaSelected(value)}>
						<IconCheck
							class={cn(
								'mr-2 h-4 w-4',
								!parsedSelected.map((a) => a.value).includes(option.value) && 'text-transparent'
							)}
						/>
						{option.label}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
