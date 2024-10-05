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

    export let defaultFormData

	$: formData = {
		first_name: null,
		email: null,
		region: null,
		areas: [],
		bedrooms: null,
		bathrooms: null,
		price_max: 1000000,
		type: null,
		frequency: 7
	} as AlertFormData;

	let regionAreas: string[];
	$: regionAreas = [];

	onMount(() => {
		formData = defaultFormData;
		formData.areas = $page.url.searchParams.getAll('areas');
	});


	const fetchAreas = async (region: string) => {
		const res = await fetch(`/api/areas?region=${region}`);
		const { results } = await res.json();
		regionAreas = results;
	};

	const handleAreaSelected = (e: CustomEvent<string>) => {
		if (formData.areas.includes(e.detail)) {
			formData.areas = formData.areas.filter((area) => area !== e.detail);
		} else {
			formData.areas = [...formData.areas, e.detail];
		}
        console.log(e.detail,formData.areas)
        dispatch('formDataUpdated', formData)
	};

	const handleRegionSelected = (e: CustomEvent<string>) => {
		formData.region = e.detail;
		formData.areas = [];
		if (formData.region) fetchAreas(e.detail);
        dispatch('formDataUpdated', formData)
	};

	const handleBedroomsSelected = (e: CustomEvent<{ label: string; value: number }>) => {
		formData.bedrooms = e.detail.value;
        dispatch('formDataUpdated', formData)
	};

	const handleBathroomsSelected = (e: CustomEvent<{ label: string; value: number }>) => {
		formData.bathrooms = e.detail.value;
        dispatch('formDataUpdated', formData)
	};

	const handleTypeSelected = (e: CustomEvent<{ label: string; value: string }>) => {
		formData.type = e.detail.value;
        dispatch('formDataUpdated', formData)
	};

	const handleFrequencySelected = (e: CustomEvent<{ label: string; value: 1 | 7 | 30 }>) => {
		formData.frequency = e.detail.value;
        dispatch('formDataUpdated', formData)
	};

	const handlePriceSelected = (e: CustomEvent<{ label: string; value: number }>) => {
		formData.price_max = e.detail.value;
        dispatch('formDataUpdated', formData)
	};


</script>


<div class="grid gap-4 z-100000">
    <div class="grid items-center gap-4">
        <InputWithLabel textColor="text-black" label="First Name">
            <Input
                required
                placeholder="What is your first name?"
                bind:value={formData.first_name}
            />
        </InputWithLabel>
        <InputWithLabel textColor="text-black" label="Email">
            <Input
                required
                placeholder="Where should we send the alerts?"
                bind:value={formData.email}
            />
        </InputWithLabel>
        <RegionSelect on:region-selected={handleRegionSelected} />
        <AreaSelect
            areaSelectLabelColor="text-black"
            options={regionAreas}
            selected={formData.areas}
            on:area-selected={handleAreaSelected}
        />
        <BedAndBathroomSelect
            bedOrBath="bedrooms"
            on:bedrooms-selected={handleBedroomsSelected}
        />
        <BedAndBathroomSelect
            bedOrBath="bathrooms"
            on:bathrooms-selected={handleBathroomsSelected}
        />
        <TypeSelect on:type-selected={handleTypeSelected} />
        <FrequencySelect on:frequency-selected={handleFrequencySelected} />
        <PriceSelect on:price-selected={handlePriceSelected} />
    </div>
</div>