<script lang="ts">
	import { page } from '$app/stores'; // Import the page store for accessing route parameters
	import RegionSelect from './RegionSelect.svelte';
	import AreaSelect from './AreaSelect.svelte';
	import BedAndBathroomSelect from './BedAndBathroomSelect.svelte';
	import TypeSelect from './TypeSelect.svelte';
	import Slider from './Slider.svelte';
	import RefInput from './RefInput.svelte';

	import { listingsCount } from '$lib/store';

	$: showRegionSelect = $page.params.region === undefined;
</script>

<h2 class="uppercase font-semibold text-xl text-white">
	Properties,{' '}
	{#if $page.params.region}
		{$page.params.region}
	{:else}
		All regions
	{/if}
</h2>
<h2 class="uppercase font-semibold text-xl text-white">
	<!-- Show how many results there are -->
	{$listingsCount} results
</h2>
<div class="flex-wrap text-left flex justify-center gap-8 pb-6 mb-6 pt-6 rounded-lg">
	<div class="flex flex-wrap justify-center gap-4">
		{#if showRegionSelect}
			<RegionSelect />
		{/if}
		<AreaSelect />
	</div>
	<div class="flex flex-wrap justify-center gap-4">
		<BedAndBathroomSelect bedOrBath="bedrooms" />
		<BedAndBathroomSelect bedOrBath="bathrooms" />
	</div>
	<div class="flex flex-wrap justify-center gap-4">
		<TypeSelect />
		<RefInput />
	</div>
</div>
<div class="flex flex-wrap justify-center gap-4">
	<Slider />
</div>
