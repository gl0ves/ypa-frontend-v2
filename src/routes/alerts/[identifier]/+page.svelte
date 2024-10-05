<script lang="ts">
	import AreaSelect from '$lib/components/AreaSelect.svelte';
	import RegionSelect from '$lib/components/PropertyAlertForm/RegionSelect.svelte';
	import BedAndBathroomSelect from '$lib/components/PropertyAlertForm/BedAndBathroomSelect.svelte';
	import TypeSelect from '$lib/components/PropertyAlertForm/TypeSelect.svelte';
	import FrequencySelect from '$lib/components/PropertyAlertForm/FrequencySelect.svelte';
	import InputWithLabel from '$lib/components/ui/input-with-label/InputWithLabel.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import MaximumPriceSelect from '$lib/components/PropertyAlertForm/MaximumPriceSelect.svelte';
	import { type AlertFormData } from '$lib/ypaTypes';
	import { onMount } from 'svelte';
	export let data: { alert: AlertFormData };

	let formData = data.alert;
	let regionAreas = data.alert.areas;
	$: formData;

	console.log(formData.areas);

	const fetchAreas = async (region: string) => {
		const res = await fetch(`/api/areas?region=${region}`);
		regionAreas = await res.json();
	};

	// const handleAreaSelected = (e: CustomEvent<string[]>) => {
	// 	formData.areas = e.detail;
	// };

	const handleRegionSelected = (e: CustomEvent<string>) => {
		formData.region = e.detail;
		if (formData.region) fetchAreas(e.detail);
	};

	const handleBedroomsSelected = (e: CustomEvent<{ label: string; value: number }>) => {
		formData.bedrooms = e.detail.value;
	};

	const handleBathroomsSelected = (e: CustomEvent<{ label: string; value: number }>) => {
		formData.bathrooms = e.detail.value;
	};

	const handleTypeSelected = (e: CustomEvent<{ label: string; value: string }>) => {
		formData.type = e.detail.value;
	};

	const handleFrequencySelected = (e: CustomEvent<{ label: string; value: 1 | 7 | 30 }>) => {
		formData.frequency = e.detail.value;
	};

	const handlePriceSelected = (e: CustomEvent<{ label: string; value: number }>) => {
		formData.price_max = e.detail.value;
	};

	onMount(() => {
		if (formData.region) handleRegionSelected({ detail: formData.region } as CustomEvent<string>);
	});
</script>

<div class="flex flex-col items-center justify-center h-full py-5">
	<div class="text-lg font-semibold">Update property alert</div>
	<div class="grid items-center gap-4">
		<InputWithLabel textColor="text-black" label="First Name">
			<Input bind:value={formData.first_name} />
		</InputWithLabel>
		<RegionSelect selected={formData.region} on:region-selected={handleRegionSelected} />
		<AreaSelect selected={regionAreas} on:area-selected={handleAreaSelected} />
		<BedAndBathroomSelect
			selected={formData.bedrooms}
			bedOrBath="bedrooms"
			on:bedrooms-selected={handleBedroomsSelected}
		/>
		<BedAndBathroomSelect
			selected={formData.bedrooms}
			bedOrBath="bathrooms"
			on:bathrooms-selected={handleBathroomsSelected}
		/>
		<TypeSelect selected={formData.type} on:type-selected={handleTypeSelected} />
		<FrequencySelect
			selected={formData.frequency}
			on:frequency-selected={handleFrequencySelected}
		/>
		<MaximumPriceSelect selected={formData.price_max} on:price-selected={handlePriceSelected} />
	</div>
</div>
