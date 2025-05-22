<script lang="ts">
	import { page } from '$app/state';
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

	let showRegionSelect = $derived(() => {
		return !page.params.region;
	});

	let {
		data,
		searchTriggered
	}: {
		data: { options: Options; listingsCount: number; areas: string[] };
		searchTriggered: () => void;
	} = $props();

	const { options } = data;

	let minPrice = $state(parseInt(page.url.searchParams.get('min_price') || '0'));
	let maxPrice = $state(parseInt(page.url.searchParams.get('max_price') || '1000000'));

	const setMinPrice = (value: number) => {
		minPrice = value;
		searchParams.set('min_price', value.toString());
	};

	const setMaxPrice = (value: number) => {
		maxPrice = value;
		searchParams.set('max_price', value.toString());
	};

	let bedValue = $state(page.url.searchParams.get('bedrooms') || '0');
	let bathValue = $state(page.url.searchParams.get('bathrooms') || '0');

	const setBedValue = (value: string) => {
		bedValue = value;
		searchParams.set('bedrooms', value);
	};

	const setBathValue = (value: string) => {
		bathValue = value;
		searchParams.set('bathrooms', value);
	};

	let typeValue = $state(page.url.searchParams.get('type') || 'Any type');

	const setTypeValue = (value: string) => {
		typeValue = value;
		searchParams.set('type', value);
	};

	let regionValue = $state(page.url.searchParams.get('region') || '');

	const setRegionValue = async (value: string) => {
		regionValue = value;
		const res = await fetch(`/api/v2/listings?region=${regionValue}&display=areas&limit=1000`);
		const { results } = await res.json();
		areaOptions = results;
	};

	const resetSearch = (_e: Event) => {
		goto('/');
		minPrice = 0;
		maxPrice = 1000000;
		bedValue = '0';
		bathValue = '0';
		paramAreas = [];
		typeValue = 'Any type';
		regionValue = '';
		refValue = '';
	};

	const clearAreaState = () => {
		paramAreas = [];
	};

	let searchParams: URLSearchParams = $state(page.url.searchParams);

	let paramAreas = $state(page.url.searchParams.getAll('areas'));
	let areaOptions = $state(data.areas);

	const handleAreaSelected = (value: string) => {
		if (paramAreas.includes(value)) {
			paramAreas = paramAreas.filter((area) => area !== value);
		} else {
			paramAreas = [...paramAreas, value];
		}

		searchParams.delete('page');
		searchParams.delete('areas');

		paramAreas.forEach((area) => {
			if (typeof area !== 'string') return;
			searchParams.append('areas', area);
		});
	};

	let refValue = $state(page.url.searchParams.get('ref') || '');

	const setRefValue = (value: string) => {
		refValue = value;
		searchParams.set('ref', value);
	};

	const setParams = (value: URLSearchParams) => {
		searchParams = value;
	};

	const handleSearch = async () => {
		await goto(`?${searchParams.toString()}`);
		searchTriggered();
	};
</script>

<div id="search-container" class="min-w-full relative p-4 md:p-12 mb-8">
	<img
		src="https://cdn.yourpropertyabroad.com/static/banner.jpg"
		alt="Your Property Abroad Banner"
		class="absolute inset-0 w-full h-full object-cover z-0"
		fetchpriority="high"
		decoding="async"
		aria-hidden="true"
		draggable="false"
	/>
	<div class="absolute inset-0 bg-black opacity-50 z-10"></div>
	<div class="flex justify-center z-10 relative">
		<div class="w-full max-w-[1216px] text-center px-4">
			<h1 class="text-xl md:text-3xl font-bold text-white z-10 relative">
				FIND A PROPERTY FOR SALE IN SPAIN
			</h1>
			<h2 class="uppercase font-semibold text-xl text-white">
				Properties,{' '}
				{#if page.url.searchParams.get('region')}
					{page.url.searchParams.get('region')}
				{:else}
					All regions
				{/if}
			</h2>
			<h2 class="uppercase font-semibold text-xl text-white">
				{data.listingsCount} results
			</h2>

			<div
				class="grid grid-cols-1 text-left lg:grid-cols-3 md:grid-cols-2 gap-8 pb-6 mb-6 pt-6 rounded-lg"
			>
				{#if showRegionSelect()}
					<RegionSelect
						{setParams}
						{searchParams}
						{setRegionValue}
						{regionValue}
						{clearAreaState}
						{options}
					/>
				{/if}

				<AreaSelect options={areaOptions} selected={paramAreas} handleSelect={handleAreaSelected} />

				<TypeSelect {setParams} {searchParams} {setTypeValue} {typeValue} />

				<BedAndBathroomSelect
					{setParams}
					{searchParams}
					setValue={setBedValue}
					value={bedValue}
					{options}
					bedOrBath="bedrooms"
				/>
				<BedAndBathroomSelect
					{setParams}
					{searchParams}
					setValue={setBathValue}
					value={bathValue}
					{options}
					bedOrBath="bathrooms"
				/>

				<RefInput {setParams} {searchParams} {setRefValue} {refValue} />
			</div>
			<div class="flex flex-wrap justify-center">
				<Slider {setParams} {searchParams} {setMinPrice} {setMaxPrice} {minPrice} {maxPrice} />
			</div>
			<div class="flex flex-col-reverse sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-4 w-full">
				<div class="w-full sm:w-auto">
					<Button size="lg" variant="destructive" onclick={(e) => resetSearch(e)} class="w-full">RESET</Button>
				</div>
				<div class="w-full sm:w-auto">
					<PropertyAlertyForm {options} />
				</div>
				<div class="w-full sm:w-auto">
					<Button size="lg" variant="tertiary" onclick={(_e) => handleSearch()} class="w-full">SEARCH</Button>
				</div>
			</div>
		</div>
	</div>
</div>
