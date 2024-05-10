<script lang="ts">
	import { goto } from '$app/navigation';
	import RegionSelect from './RegionSelect.svelte';
	type SearchProperties = {
		ref: string;
		area: string;
		region: string;
		bedrooms: number;
		bathrooms: number;
		type: string;
		price_min: number;
		price_max: number;
	};

	let searchProperties: SearchProperties = {
		ref: '',
		area: '',
		region: '',
		bedrooms: 0,
		bathrooms: 0,
		type: '',
		price_min: 0,
		price_max: 10000000
	};

	const search = () => {
		const params = new URLSearchParams(window.location.search);
		for (const key in searchProperties) {
			const searchKey = key as keyof typeof searchProperties;
			if (searchProperties[searchKey] === '') continue;
			if (searchProperties[searchKey] === 10000000) continue;
			if (searchKey === 'price_min' && searchProperties[searchKey] === 0) continue;
			if (searchKey === 'bathrooms' && searchProperties[searchKey] === 0) continue;
			if (searchKey === 'bedrooms' && searchProperties[searchKey] === 0) continue;
			params.append(searchKey, searchProperties[searchKey].toString());
		}
		goto(`?${params.toString()}`);
	};
</script>

<div class="flex flex-wrap gap-4">
	<input
		type="text"
		placeholder="Reference"
		class="border border-gray-300 rounded-md p-2"
		bind:value={searchProperties.ref}
	/>

	<input
		type="text"
		placeholder="Area"
		class="border border-gray-300 rounded-md p-2"
		bind:value={searchProperties.area}
	/>

	<RegionSelect />

	<input
		type="number"
		placeholder="Bedrooms"
		class="border border-gray-300 rounded-md p-2"
		bind:value={searchProperties.bedrooms}
	/>

	<input
		type="number"
		placeholder="Bathrooms"
		class="border border-gray-300 rounded-md p-2"
		bind:value={searchProperties.bathrooms}
	/>

	<input
		type="text"
		placeholder="Type"
		class="border border-gray-300 rounded-md p-2"
		bind:value={searchProperties.type}
	/>

	<input
		type="number"
		placeholder="Min Price"
		class="border border-gray-300 rounded-md p-2"
		bind:value={searchProperties.price_min}
	/>

	<input
		type="number"
		placeholder="Max Price"
		class="border border-gray-300 rounded-md p-2"
		bind:value={searchProperties.price_max}
	/>

	<button class="bg-blue-500 text-white p-2 rounded-md" on:click={search}> Search </button>
</div>
