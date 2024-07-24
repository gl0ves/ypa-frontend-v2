<script lang="ts">
	import { page } from '$app/stores'; // Import the page store for accessing route parameters
	import RegionSelect from './RegionSelect.svelte';
	import AreaSelect from './AreaSelect.svelte';
	import BedAndBathroomSelect from './BedAndBathroomSelect.svelte';
	import TypeSelect from './TypeSelect.svelte';
	import Slider from './Slider.svelte';
	import RefInput from './RefInput.svelte';
	import PropertyAlertyForm from '../PropertyAlertForm/PropertyAlertForm.svelte';
	import { Button } from '$lib/components/ui/button';

	import { listingsCount } from '$lib/store';
	import { goto } from '$app/navigation';

	$: showRegionSelect = $page.params.region === undefined;

	const resetSearch = (_e: Event) => {
		goto('/');
	};
</script>

<h2 class="uppercase font-semibold text-xl text-white">
	Properties,{' '}
	{#if $page.url.searchParams.get('region')}
		{$page.url.searchParams.get('region')}
	{:else}
		All regions
	{/if}
</h2>
<h2 class="uppercase font-semibold text-xl text-white">
	{$listingsCount} results
</h2>

<div class="flex-wrap text-left flex justify-center gap-8 pb-6 mb-6 pt-6 rounded-lg">
	{#if showRegionSelect}
		<RegionSelect />
	{/if}

	<AreaSelect />

	<BedAndBathroomSelect bedOrBath="bedrooms" />
	<BedAndBathroomSelect bedOrBath="bathrooms" />

	<TypeSelect />
	<RefInput />
</div>
<div class="flex flex-wrap justify-center">
	<Slider />
</div>
<div class="flex justify-center gap-8">
	<Button on:click={(e) => resetSearch(e)}>RESET</Button>
	<PropertyAlertyForm />
</div>
