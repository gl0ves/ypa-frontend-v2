<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import IconCheck from '~icons/mdi/check';
	import IconCaret from '~icons/mdi/caret-down';
	import InputWithLabel from '$lib/components/ui/input-with-label/InputWithLabel.svelte';

	let {
		options = [],
		selected = [],
		areaSelectLabelColor = 'text-white',
		handleSelect
	}: {
		options: string[];
		selected: string[];
		areaSelectLabelColor?: 'text-white' | 'text-black';
		handleSelect: (value: string) => void;
	} = $props();

	const parseSelected = (area: string) => {
		return { label: area, value: area };
	};

	const truncateLabel = (label: string, maxLength = 25) => {
		if (!label) return 'Select areas...';
		return label.length > maxLength ? label.slice(0, maxLength) + '...' : label;
	};

	const parsedOptions = $derived(options.map(parseSelected));
	const parsedSelected = $derived(selected.map(parseSelected));
	const combinedLabel = $derived(truncateLabel([...selected].join(', ')));

	let open = $state(false);
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
					<Command.Item value={option.value} onSelect={(value) => handleSelect(value)}>
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
