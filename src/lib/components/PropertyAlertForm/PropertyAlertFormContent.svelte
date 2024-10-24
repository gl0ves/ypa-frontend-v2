<script lang="ts">
	import AreaSelect from '../AreaSelect.svelte';
	import InputWithLabel from '../ui/input-with-label/InputWithLabel.svelte';
	import Input from '../ui/input/input.svelte';
	import Select from '$lib/components/Select/Select.svelte';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import { type AlertFormData } from '$lib/ypaTypes';
	import {
		propertyTypeOptions,
		emailFrequencyOptions,
		propertyRegionOptions,
		maxPriceOptions,
		bedAndBathroomOptions
	} from '$lib/data/options';

	import { page } from '$app/stores';

	const searchParams = $page.url.searchParams;
	const parsedPriceMax = parseInt(searchParams.get('max_price') ?? '0');
	const priceMax = parsedPriceMax === 0 ? null : parsedPriceMax;

	export let defaultFormData: AlertFormData = {
		identifier: null,
		first_name: null,
		email: null,
		region: searchParams.get('region'),
		areas: searchParams.getAll('areas') ?? [],
		bedrooms: parseInt(searchParams.get('bedrooms') ?? '0'),
		bathrooms: parseInt(searchParams.get('bathrooms') ?? '0'),
		price_max: priceMax,
		type: searchParams.get('type'),
		frequency: 7,
		verified: false
	};

	const dispatch = createEventDispatcher();

	const showEmail = $page.params.identifier ? false : true;

	let regionAreas: string[];

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
		dispatch('formDataUpdated', defaultFormData);
	};

	const handleRegionSelected = (e: CustomEvent<string>) => {
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
		<!-- Regions -->
		<Select
			options={propertyRegionOptions}
			label="Region"
			selected={defaultFormData.region}
			on:selected={handleRegionSelected}
		/>
		<!-- Areas -->
		<AreaSelect
			areaSelectLabelColor="text-black"
			options={regionAreas}
			selected={defaultFormData.areas}
			on:area-selected={handleAreaSelected}
		/>
		<!-- Bathrooms -->
		<Select
			options={bedAndBathroomOptions}
			label="Bathrooms"
			selected={defaultFormData.bathrooms}
			on:selected={handleBathroomsSelected}
		/>
		<!-- Bedrooms -->
		<Select
			options={bedAndBathroomOptions}
			label="Bedrooms"
			selected={defaultFormData.bedrooms}
			on:selected={handleBedroomsSelected}
		/>
		<!-- Types -->
		<Select
			options={propertyTypeOptions}
			label="Type"
			selected={defaultFormData.type}
			on:selected={handleTypeSelected}
		/>
		<!-- Frequency -->
		<Select
			options={emailFrequencyOptions}
			label="How often would you like to receive alerts?"
			selected={defaultFormData.frequency}
			on:selected={handleFrequencySelected}
		/>
		<!-- Max price -->
		<Select
			options={maxPriceOptions}
			label="Max price"
			selected={defaultFormData.price_max}
			on:selected={handlePriceSelected}
		/>
	</div>
</div>
