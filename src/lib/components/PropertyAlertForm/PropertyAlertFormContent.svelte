<script lang="ts">
	import AreaSelect from '../AreaSelect.svelte';
	import FormLabel from '../ui/form-label/FormLabel.svelte';
	import Input from '../ui/input/input.svelte';
	import Select from '$lib/components/Select/Select.svelte';
	import { onMount } from 'svelte';

	import { type AlertFormData } from '$lib/ypaTypes';
	import { type Options } from '$lib/data/options';

	import { page } from '$app/state';
	let {
		formData,
		options,
		handleFormDataUpdated
	}: {
		formData?: AlertFormData | null;
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

	const searchParams = $state(page.url.searchParams);
	const parsedPriceMax = parseInt(searchParams.get('max_price') ?? '0');
	const priceOptions = maxPriceOptions
		.map((option) => option.value)
		.filter((value) => value !== null);

	let closestPrice = null;
	if (parsedPriceMax !== 0 && priceOptions.length > 0) {
		closestPrice = priceOptions.find((price) => parseInt(price) >= parsedPriceMax) || null;
	}

	let defaultFormData: AlertFormData = $state({
		identifier: null,
		first_name: null,
		email: null,
		region: searchParams.get('region'),
		areas: searchParams.getAll('areas') ?? [],
		bedrooms: searchParams.get('bedrooms') ?? '0',
		bathrooms: searchParams.get('bathrooms') ?? '0',
		price_max: closestPrice,
		type: searchParams.get('type'),
		frequency: '7',
		verified: false
	});

	const showEmail = page.params.identifier ? false : true;

	let regionAreas: string[] = $state([]);

	onMount(() => {
		if (defaultFormData.region) fetchAreas(defaultFormData.region);
		if (formData != null) {
			defaultFormData = { ...defaultFormData, ...formData };
		}
	});

	const fetchAreas = async (region: string | null) => {
		if (!region) regionAreas = [];
		let parsedRegion = propertyRegionOptions.find(
			(option) => option.value === region || option.label === region
		)?.value;
		const res = await fetch(`/api/areas?region=${parsedRegion}`);
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

	const handleRegionSelected = (value: string | null) => {
		defaultFormData.region = value;
		defaultFormData.areas = [];
		if (defaultFormData.region) fetchAreas(value);
		handleFormDataUpdated(defaultFormData);
	};

	const handleTypeSelect = (value: string | null) => {
		defaultFormData.type = value;
		handleFormDataUpdated(defaultFormData);
	};

	const handleFrequencySelect = (value: string | null) => {
		if (!value) return;
		defaultFormData.frequency = value;
		handleFormDataUpdated(defaultFormData);
	};

	const handleNumberSelect = (
		key: 'bedrooms' | 'bathrooms' | 'price_max',
		value: string | null
	) => {
		defaultFormData[key] = value;
		handleFormDataUpdated(defaultFormData);
	};

	const handleInputChange = () => {
		handleFormDataUpdated(defaultFormData);
	};
</script>

<div class="grid gap-4 z-100000">
	<div class="grid items-center gap-4">
		<FormLabel textColor="text-black" label="First Name">
			<Input
				required
				placeholder="What is your first name?"
				oninput={handleInputChange}
				bind:value={defaultFormData.first_name}
			/>
		</FormLabel>
		{#if showEmail}
			<FormLabel textColor="text-black" label="Email">
				<Input
					required
					placeholder="Where should we send the alerts?"
					oninput={handleInputChange}
					bind:value={defaultFormData.email}
				/>
			</FormLabel>
		{/if}
		<!-- Regions -->
		<Select
			options={propertyRegionOptions}
			label="Region"
			selected={defaultFormData.region}
			handleSelect={(option) => handleRegionSelected(option)}
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
			handleSelect={(option) => handleNumberSelect('bathrooms', option)}
		/>
		<!-- Bedrooms -->
		<Select
			options={bedAndBathroomOptions}
			label="Bedrooms"
			selected={defaultFormData.bedrooms}
			handleSelect={(option) => handleNumberSelect('bedrooms', option)}
		/>
		<!-- Types -->
		<Select
			options={propertyTypeOptions}
			label="Type"
			selected={defaultFormData.type}
			handleSelect={(option) => handleTypeSelect(option)}
		/>
		<!-- Frequency -->
		<Select
			options={emailFrequencyOptions}
			label="How often would you like to receive alerts?"
			selected={defaultFormData.frequency}
			handleSelect={(option) => handleFrequencySelect(option)}
		/>
		<!-- Max price -->
		<Select
			options={maxPriceOptions}
			label="Max price"
			selected={defaultFormData.price_max}
			handleSelect={(option) => handleNumberSelect('price_max', option)}
		/>
	</div>
</div>
