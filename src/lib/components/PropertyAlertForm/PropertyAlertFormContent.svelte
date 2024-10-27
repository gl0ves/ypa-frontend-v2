<script lang="ts">
	import AreaSelect from '../AreaSelect.svelte';
	import InputWithLabel from '../ui/input-with-label/InputWithLabel.svelte';
	import Input from '../ui/input/input.svelte';
	import Select from '$lib/components/Select/Select.svelte';
	import { onMount } from 'svelte';

	import { type AlertFormData } from '$lib/ypaTypes';
	import { type Options, type MaxPriceOptions } from '$lib/data/options';

	import { page } from '$app/stores';

	type SelectValue = string | number | null | undefined;

	const {
		formData,
		options,
		handleFormDataUpdated
	}: {
		formData: AlertFormData;
		options: Options;
		handleFormDataUpdated: (data: AlertFormData) => void;
	} = $props();

	const {
		propertyRegionOptions,
		bedAndBathroomOptions,
		propertyTypeOptions,
		emailFrequencyOptions,
		maxPriceOptions
	} = options;

	const searchParams = $state($page.url.searchParams);
	const parsedPriceMax = parseInt(searchParams.get('max_price') ?? '0');
	const priceOptions = maxPriceOptions
		.map((option) => option.value)
		.filter((value): value is number => value !== null);

	let closestPrice = null;
	if (parsedPriceMax !== 0 && priceOptions.length > 0) {
		closestPrice = priceOptions.find((price) => price >= parsedPriceMax) || null;
	}

	let defaultFormData: AlertFormData = $state(
		formData || {
			identifier: null,
			first_name: null,
			email: null,
			region: searchParams.get('region'),
			areas: searchParams.getAll('areas') ?? [],
			bedrooms: parseInt(searchParams.get('bedrooms') ?? '0'),
			bathrooms: parseInt(searchParams.get('bathrooms') ?? '0'),
			price_max: closestPrice,
			type: searchParams.get('type'),
			frequency: 7,
			verified: false
		}
	);

	const showEmail = $page.params.identifier ? false : true;

	let regionAreas: string[] = $state([]);

	console.log(defaultFormData);

	onMount(() => {
		if (defaultFormData.region) fetchAreas(defaultFormData.region);
	});

	const fetchAreas = async (region: string | null) => {
		if (!region) regionAreas = [];
		const res = await fetch(`/api/areas?region=${region}`);
		const { results } = await res.json();
		regionAreas = results;
	};

	const handleAreaSelected = (value: string) => {
		if (defaultFormData.areas.includes(value)) {
			defaultFormData.areas = defaultFormData.areas.filter((area) => area !== value);
		} else {
			defaultFormData.areas = [...defaultFormData.areas, value];
		}
		handleFormDataUpdated(defaultFormData);
	};

	const handleRegionSelected = (value: SelectValue) => {
		if (value === undefined || typeof value === 'number') return;
		defaultFormData.region = value;
		defaultFormData.areas = [];
		if (defaultFormData.region) fetchAreas(value);
		handleFormDataUpdated(defaultFormData);
	};

	const handleTypeSelect = (value: string | number | null | undefined) => {
		if (value != null || typeof value !== 'string') return;
		defaultFormData.type = value;
		handleFormDataUpdated(defaultFormData);
	};

	const handleNumberSelect = (
		key: 'bedrooms' | 'bathrooms' | 'frequency' | 'price_max',
		value: string | number | null | undefined
	) => {
		if (value != null || typeof value !== 'number') return;
		defaultFormData[key] = value;
		handleFormDataUpdated(defaultFormData);
	};

	const handleInputChange = () => {
		handleFormDataUpdated(defaultFormData);
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
			handleSelect={(option) => handleRegionSelected(option?.value)}
		/>
		<!-- Areas -->
		<AreaSelect
			areaSelectLabelColor="text-black"
			options={regionAreas}
			selected={defaultFormData.areas}
			handleSelect={(option) => handleAreaSelected(option)}
		/>
		<!-- Bathrooms -->
		<Select
			options={bedAndBathroomOptions}
			label="Bathrooms"
			selected={defaultFormData.bathrooms}
			handleSelect={(option) => handleNumberSelect('bathrooms', option?.value)}
		/>
		<!-- Bedrooms -->
		<Select
			options={bedAndBathroomOptions}
			label="Bedrooms"
			selected={defaultFormData.bedrooms}
			handleSelect={(option) => handleNumberSelect('bedrooms', option?.value)}
		/>
		<!-- Types -->
		<Select
			options={propertyTypeOptions}
			label="Type"
			selected={defaultFormData.type}
			handleSelect={(option) => handleTypeSelect(option?.value)}
		/>
		<!-- Frequency -->
		<Select
			options={emailFrequencyOptions}
			label="How often would you like to receive alerts?"
			selected={defaultFormData.frequency}
			handleSelect={(option) => handleNumberSelect('frequency', option?.value)}
		/>
		<!-- Max price -->
		<Select
			options={maxPriceOptions}
			label="Max price"
			selected={defaultFormData.price_max}
			handleSelect={(option) => handleNumberSelect('price_max', option?.value)}
		/>
	</div>
</div>
