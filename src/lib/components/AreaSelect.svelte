<script lang="ts">
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import FormLabel from '$lib/components/ui/form-label/FormLabel.svelte';
	import { browser } from '$app/environment';

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
		if (!label) return 'Select area(s)';
		return label.length > maxLength ? label.slice(0, maxLength) + '...' : label;
	};

	const parsedOptions = $derived(options.map(parseSelected));
	const parsedSelected = $derived(selected.map(parseSelected));
	const combinedLabel = $derived(truncateLabel([...selected].join(', ')));

	let open = $state(false);

	// Prevent scroll to top on mobile when opening
	const handleOpenChange = (newOpen: boolean) => {
		if (browser && newOpen) {
			// Store current scroll position
			const scrollY = window.scrollY;
			
			// Set open state
			open = newOpen;
			
			// Restore scroll position after DOM updates
			setTimeout(() => {
				window.scrollTo(0, scrollY);
			}, 0);
		} else {
			open = newOpen;
		}
	};
</script>

<Popover.Root open={open} onOpenChange={handleOpenChange}>
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
					{!options.length ? 'Please select a region' : combinedLabel || 'Select area(s)'}
					<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			{/snippet}
		</Popover.Trigger>
	</FormLabel>
	<Popover.Content 
		class="max-w-[361px] w-[90vw] md:w-[361px] p-0 z-50" 
		side="bottom" 
		align="start" 
		sideOffset={4}
		avoidCollisions={true}
		collisionPadding={8}
	>
		<Command.Root>
			<Command.Input 
				placeholder="Search area..." 
				class="h-9" 
				data-prevent-scroll="true"
			/>
			<Command.List>
				<Command.Empty>No areas found.</Command.Empty>
				<Command.Group class="max-h-[200px] md:max-h-[300px] overflow-y-scroll">
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
