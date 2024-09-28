<script lang="ts">
	import AreaSelect from './AreaSelect.svelte';
	import RegionSelect from './RegionSelect.svelte';
	import BedAndBathroomSelect from './BedAndBathroomSelect.svelte';
	import TypeSelect from './TypeSelect.svelte';
	import FrequencySelect from './FrequencySelect.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { onMount } from 'svelte';
	import TermsAndConditions from '../Policy/TermsAndConditions.svelte';
	import InputWithLabel from '../ui/input-with-label/InputWithLabel.svelte';
	import Input from '../ui/input/input.svelte';
	import PriceSelect from './PriceSelect.svelte';
	import { type AlertFormData } from '$lib/ypaTypes';

	export let defaultFormData: AlertFormData = {
		first_name: null,
		email: null,
		region: null,
		areas: [],
		bedrooms: null,
		bathrooms: null,
		price_min: 0,
		price_max: 1000000,
		type: null,
		frequency: 7
	};

	$: formData = {
		first_name: null,
		email: null,
		region: null,
		areas: [],
		bedrooms: null,
		bathrooms: null,
		price_min: 0,
		price_max: 1000000,
		type: null,
		frequency: 7
	} as AlertFormData;

	let regionAreas: string[] = [];

	$: {
		regionAreas = []
	}

	const fetchAreas = async (region: string) => {
		const res = await fetch(`/api/areas?region=${region}`);
		const { results } = await res.json()
		regionAreas = results
	};

	const handleAreaSelected = (e: CustomEvent<string[]>) => {
		formData.areas = e.detail;
	};

	const handleRegionSelected = (e: CustomEvent<string>) => {
		console.log('region selected', e.detail);
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
		formData = defaultFormData;
	});

	let formSubmitted = false;
	let formSubmissionFailed = false;

	const submitForm = async () => {
		const response = await fetch('/api/alerts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});
		if (response.ok) {
			formSubmitted = true;
		} else {
			formSubmissionFailed = true;
		}
	};
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}
		>CREATE PROPERTY ALERT</Dialog.Trigger
	>
	<form id="alert-form" method="POST">
		<Dialog.Content class="sm:max-w-[426px] max-h-[80vh] overflow-auto">
			<Dialog.Header>
				<Dialog.Title>CREATE PROPERTY ALERT</Dialog.Title>
				<Dialog.Description>
					{#if formSubmitted}
						Your property alert has been successfully created. If this is your first alert, please
						check your email to verify your email address.
					{:else if formSubmissionFailed}
						There was an error creating your property alert. Please try again later.
					{:else}
						Create an email alert to get notified as soon as you have a match. Our website is
						updated daily and you'll be the first to know when your dream property is up for sale.
					{/if}
				</Dialog.Description>
			</Dialog.Header>

			{#if !formSubmitted}
				<div class="grid gap-4 z-100000">
					<div class="grid items-center gap-4">
						<InputWithLabel textColor="text-black" label="First Name">
							<Input bind:value={formData.first_name} />
						</InputWithLabel>
						<InputWithLabel textColor="text-black" label="Email">
							<Input bind:value={formData.email} />
						</InputWithLabel>
						<RegionSelect on:region-selected={handleRegionSelected} />
						<AreaSelect options={regionAreas} on:area-selected={handleAreaSelected} />
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
				<Dialog.Description>
					By clicking create below, you consent to allow Your Property Abroad to store and process
					the information submitted above to provide you the services requested. You can view the
					terms and conditions of our service <TermsAndConditions>here.</TermsAndConditions> Your Property
					Abroad may store and process my contact information to help me find a property.
				</Dialog.Description>
				<Dialog.Footer>
					<Button on:click={submitForm} type="submit">CREATE</Button>
				</Dialog.Footer>
			{/if}
		</Dialog.Content>
	</form>
</Dialog.Root>
