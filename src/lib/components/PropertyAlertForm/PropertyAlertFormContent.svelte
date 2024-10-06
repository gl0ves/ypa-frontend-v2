<script lang="ts">
	import AreaSelect from '../AreaSelect.svelte';
	import RegionSelect from './RegionSelect.svelte';
	import BedAndBathroomSelect from './BedAndBathroomSelect.svelte';
	import TypeSelect from './TypeSelect.svelte';
	import FrequencySelect from './FrequencySelect.svelte';
	import InputWithLabel from '../ui/input-with-label/InputWithLabel.svelte';
	import Input from '../ui/input/input.svelte';
	import PriceSelect from './MaximumPriceSelect.svelte';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { type AlertFormData } from '$lib/ypaTypes';

	const dispatch = createEventDispatcher();
	const showEmail = $page.params.identifier ? false : true;
	export let defaultFormData = {
		identifier: null,
		first_name: null,
		email: null,
		region: null,
		areas: [],
		bedrooms: 0,
		bathrooms: 0,
		price_max: null,
		type: '',
		frequency: 7
	} as AlertFormData;

	let regionAreas: string[];
	$: regionAreas = [];

	onMount(() => {
		const paramAreas = $page.url.searchParams.getAll('areas');
		if (paramAreas.length) {
			defaultFormData.areas = paramAreas;
		}
		if (defaultFormData.region) fetchAreas(defaultFormData.region);
	});

	const fetchAreas = async (region: string) => {
		const res = await fetch(`/api/areas?region=${region}`);
		const { results } = await res.json();
		regionAreas = results;
	};

	const handleAreaSelected = (e: CustomEvent<string>) => {
		if (defaultFormData.areas.includes(e.detail)) {
			defaultFormData.areas = defaultFormData.areas.filter((area) => area !== e.detail);
		} else {
			defaultFormData.areas = [...defaultFormData.areas, e.detail];
		}
		console.log(e.detail, defaultFormData.areas);
		dispatch('formDataUpdated', defaultFormData);
	};

	const handleRegionSelected = (e: CustomEvent<string>) => {
		console.log('region selected', e.detail);
		defaultFormData.region = e.detail;
		defaultFormData.areas = [];
		if (defaultFormData.region) fetchAreas(e.detail);
		dispatch('formDataUpdated', defaultFormData);
	};

	const handleBedroomsSelected = (e: CustomEvent<{ label: string; value: number }>) => {
		defaultFormData.bedrooms = e.detail.value;
		dispatch('formDataUpdated', defaultFormData);
	};

	const handleBathroomsSelected = (e: CustomEvent<{ label: string; value: number }>) => {
		defaultFormData.bathrooms = e.detail.value;
		dispatch('formDataUpdated', defaultFormData);
	};

	const handleTypeSelected = (e: CustomEvent<{ label: string; value: string }>) => {
		defaultFormData.type = e.detail.value;
		dispatch('formDataUpdated', defaultFormData);
	};

	const handleFrequencySelected = (e: CustomEvent<{ label: string; value: 1 | 7 | 30 }>) => {
		defaultFormData.frequency = e.detail.value;
		dispatch('formDataUpdated', defaultFormData);
	};

	const handlePriceSelected = (e: CustomEvent<{ label: string; value: number }>) => {
		defaultFormData.price_max = e.detail.value;
		dispatch('formDataUpdated', defaultFormData);
	};

	const handleInputChange = () => {
		dispatch('formDataUpdated', defaultFormData);
	};
</script>

<div class="grid gap-4 z-100000">
	<div class="grid items-center gap-4">
		<InputWithLabel textColor="text-black" label="First Name">
			<Input
				required
				placeholder="What is your first name?"
				on:input={handleInputChange}
				bind:value={defaultFormData.first_name}
			/>
		</InputWithLabel>
		{#if showEmail}
			<InputWithLabel textColor="text-black" label="Email">
				<Input
					required
					placeholder="Where should we send the alerts?"
					on:input={handleInputChange}
					bind:value={defaultFormData.email}
				/>
			</InputWithLabel>
		{/if}
		<!-- TODO: Region is not being passed as well as other -->
		<RegionSelect selected={defaultFormData.region} on:region-selected={handleRegionSelected} />
		<AreaSelect
			areaSelectLabelColor="text-black"
			options={regionAreas}
			selected={defaultFormData.areas}
			on:area-selected={handleAreaSelected}
		/>
		<BedAndBathroomSelect
			selected={defaultFormData.bedrooms || 0}
			bedOrBath="bedrooms"
			on:bedrooms-selected={handleBedroomsSelected}
		/>
		<BedAndBathroomSelect
			selected={defaultFormData.bedrooms || 0}
			bedOrBath="bathrooms"
			on:bathrooms-selected={handleBathroomsSelected}
		/>
		<TypeSelect selected={defaultFormData.type || ''} on:type-selected={handleTypeSelected} />
		<FrequencySelect
			selected={defaultFormData.frequency}
			on:frequency-selected={handleFrequencySelected}
		/>
		<PriceSelect selected={defaultFormData.price_max} on:price-selected={handlePriceSelected} />
	</div>
</div>
