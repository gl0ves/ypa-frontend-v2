<script lang="ts">
	import AreaSelect from './AreaSelect.svelte';
	import RegionSelect from './RegionSelect.svelte';
	import BedAndBathroomSelect from './BedAndBathroomSelect.svelte';
	import TypeSelect from './TypeSelect.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { fetchApi } from '$lib/api';
	import { onMount } from 'svelte';

	type FormData = {
		region: string | null;
		areas: string[];
		bedrooms: number | null;
		bathrooms: number | null;
		min_price: number;
		max_price: number;
		type: string | null;
	};

	const defaultFormData: FormData = {
		region: null,
		areas: [],
		bedrooms: null,
		bathrooms: null,
		min_price: 0,
		max_price: 1000000,
		type: null
	};

	$: formData = {
		region: null,
		areas: [],
		bedrooms: null,
		bathrooms: null,
		min_price: 0,
		max_price: 1000000,
		type: null
	} as FormData;

	$: regionAreas = [];

	const fetchAreas = async (region: string) => {
		const res = await fetchApi(`/api/v2/listings/?limit=1000&display=areas&region=${region}`);
		const data = await res.results;
		regionAreas = data;
	};

	const handleAreaSelected = (e: CustomEvent<string[]>) => {
		formData.areas = e.detail;
	};

	const handleRegionSelected = (e: CustomEvent<string>) => {
		formData.region = e.detail;
		formData.areas = [];
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

	onMount(() => {
		formData = defaultFormData;
	});

	$: {
		console.log({ ...formData });
	}
</script>

<div class="flex flex-col">
	<Dialog.Root>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}
			>CREATE PROPERTY ALERT</Dialog.Trigger
		>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>CREATE PROPERTY ALERT</Dialog.Title>
				<Dialog.Description>
					Create an email alert to get notified as soon as you have a match. Our website is updated
					daily and you'll be the first to know when your dream property is up for sale.
				</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4">
				<div class="grid items-center">
					<RegionSelect on:region-selected={handleRegionSelected} />
					<AreaSelect propAreas={regionAreas} on:area-selected={handleAreaSelected} />
					<BedAndBathroomSelect
						bedOrBath="bedrooms"
						on:bedrooms-selected={handleBedroomsSelected}
					/>
					<BedAndBathroomSelect
						bedOrBath="bathrooms"
						on:bathrooms-selected={handleBathroomsSelected}
					/>
					<TypeSelect on:type-selected={handleTypeSelected} />
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">CREATE</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</div>
