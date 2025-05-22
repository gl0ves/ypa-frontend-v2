<script lang="ts">
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import FormLabel from '$lib/components/ui/form-label/FormLabel.svelte';

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
	<FormLabel label="Areas" textColor={areaSelectLabelColor} hideLabelOnMobile={true}>
		<Popover.Trigger>
			{#snippet child({ props })}
				<Button
					variant="outline"
					class="w-full justify-between overflow-hidden font-normal truncate"
					{...props}
					role="combobox"
					aria-expanded={open}
					disabled={!options.length}
				>
					{!options.length ? 'Please select a region' : combinedLabel || 'Select areas...'}
					<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			{/snippet}
		</Popover.Trigger>
	</FormLabel>
	<Popover.Content class="max-w-[361px] w-[90%] p-0">
		<Command.Root>
			<Command.Input placeholder="Search area..." class="h-9" />
			<Command.List>
				<Command.Empty>No areas found.</Command.Empty>
				<Command.Group class="max-h-[300px] overflow-y-scroll">
					{#each parsedOptions as option}
						<Command.Item
							value={option.value}
							onSelect={() => {
								handleSelect(option.value);
							}}
						>
							<Check
								class={cn(
									'mr-2 h-4 w-4',
									!parsedSelected.map((a) => a.value).includes(option.value) && 'text-transparent'
								)}
							/>
							{option.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
