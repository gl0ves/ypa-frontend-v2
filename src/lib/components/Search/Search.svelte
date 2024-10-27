<script lang="ts">
	import { page } from '$app/stores'; // Import the page store for accessing route parameters
	import RegionSelect from './RegionSelect.svelte';
	import AreaSelect from '../AreaSelect.svelte';
	import BedAndBathroomSelect from './BedAndBathroomSelect.svelte';
	import TypeSelect from './TypeSelect.svelte';
	import Slider from './Slider.svelte';
	import RefInput from './RefInput.svelte';
	import PropertyAlertyForm from '../PropertyAlertForm/PropertyAlertForm.svelte';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { type Options } from '$lib/data/options';

	let showRegionSelect = $state($page.params.region === undefined);
	let paramAreas = $state($page.url.searchParams.getAll('areas'));
	let region = $state($page.url.searchParams.get('region'));

	const { data }: { data: { options: Options; listingsCount: number; areas: string[] } } = $props();
	const { options } = data;

	const resetSearch = (_e: Event) => {
		goto('/');
	};

	const clearAreaState = () => {
		paramAreas = [];
	};

	const handleAreaSelected = (value: string) => {
		console.log('triggered area selector');
		if (paramAreas.includes(value)) {
			paramAreas = paramAreas.filter((area) => area !== value);
		} else {
			paramAreas = [...paramAreas, value];
		}

		// Create a new URLSearchParams object from the current search parameters
		const params = new URLSearchParams(window.location.search);

		params.delete('page');
		params.delete('areas');

		// Update the 'areas' parameter with the joined list of selected area values
		paramAreas.forEach((area) => {
			if (typeof area !== 'string') return;
			params.append('areas', area);
		});

		// Navigate using the updated parameters
		goto(`?${params.toString()}`);
	};

	$inspect(paramAreas);
	$inspect(region);
</script>

<div class="min-w-full bg-hero bg-cover bg-center p-4 md:p-12 mb-8 relative">
	<div class="absolute inset-0 bg-black opacity-50"></div>
	<div class="flex justify-center z-10 relative">
		<div class="w-full max-w-[1216px] text-center px-4">
			<h1 class="text-xl md:text-3xl font-bold text-white z-10 relative">
				FIND A PROPERTY FOR SALE IN SPAIN
			</h1>
			<h2 class="uppercase font-semibold text-xl text-white">
				Properties,{' '}
				{#if $page.url.searchParams.get('region')}
					{$page.url.searchParams.get('region')}
				{:else}
					All regions
				{/if}
			</h2>
			<h2 class="uppercase font-semibold text-xl text-white">
				{data.listingsCount} results
			</h2>

			<div class="flex-wrap text-left flex justify-center gap-8 pb-6 mb-6 pt-6 rounded-lg">
				{#if showRegionSelect}
					<RegionSelect {clearAreaState} {options} />
				{/if}

				<div class="w-[250px]">
					<AreaSelect
						options={data.areas}
						selected={paramAreas}
						handleSelect={handleAreaSelected}
					/>
				</div>

				<BedAndBathroomSelect {options} bedOrBath="bedrooms" />
				<BedAndBathroomSelect {options} bedOrBath="bathrooms" />

				<TypeSelect />
				<RefInput />
			</div>
			<div class="flex flex-wrap justify-center">
				<Slider />
			</div>
			<div class="flex justify-center gap-8">
				<Button on:click={(e) => resetSearch(e)}>RESET</Button>
				<PropertyAlertyForm {options} />
			</div>
		</div>
	</div>
</div>
