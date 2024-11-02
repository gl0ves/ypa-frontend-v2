<script lang="ts">
	import IconBed from '~icons/mdi/bed';
	import IconShower from '~icons/mdi/shower';
	import IconHouse from '~icons/mdi/house';
	import IconLocation from '~icons/mdi/location';
	import Separator from '../ui/separator/separator.svelte';
	import Button from '../ui/button/button.svelte';
	import ShareButtons from '../ShareButtons/ShareButtons.svelte';
	import { goto } from '$app/navigation';
	import { formatPrice } from '$lib/utils';
	import type { Listing } from '$lib/ypaTypes';
	import { type PropertyRegionOption } from '$lib/data/options';
	import { PUBLIC_DOMAIN } from '$env/static/public';

	const {
		listing,
		propertyRegionOptions
	}: { listing: Listing; propertyRegionOptions: PropertyRegionOption[] } = $props();

	const listingRegion = $derived(
		() => propertyRegionOptions.find((option) => option.label === listing.region)?.value
	);

	const listingUrl = $derived(() => `/${listingRegion()}/properties/${listing.ref}`);

	const shareUrl = $derived(
		() => new URL(`${PUBLIC_DOMAIN}/${listingRegion()}/properties/${listing.ref})`)
	);

	const goToListing = () => {
		goto(listingUrl());
	};
</script>

<div class="w-96 bg-white shadow rounded-lg overflow-hidden">
	<div class="relative h-48 w-full">
		<button onclick={() => goToListing()} class="absolute inset-0">
			<img
				src={listing.image}
				alt="Listing thumbnail"
				class="h-full w-full object-cover cursor-pointer"
			/>
		</button>
		<div class="absolute bottom-0 left-0 bg-secondary text-white font-semibold p-2">
			{listing.region}
		</div>
		<div class="absolute bottom-0 right-0 bg-secondary text-white font-semibold p-2">
			{listing.ref}
		</div>
	</div>
	<div class="p-6">
		<div class="mt-4 flex justify-between">
			<div class="flex items-center">
				<IconHouse class="text-primary mr-1" />
				<p class=" uppercase text-gray-700">{listing.type}</p>
			</div>
			<p class=" text-gray-700">{formatPrice(listing.price)}</p>
		</div>
		<div class="mt-4 min-h-[5em] flex justify-between">
			<div class="flex items-center">
				<IconLocation class="mr-1 text-primary flex-shrink-0" />
				<p class="mr-2 text-gray-700">{listing.area}</p>
			</div>
			<div class="flex items-center space-x-2">
				<IconBed class="text-primary " />
				<span>{listing.bedrooms}</span>
				<IconShower class="text-primary " />
				<span>{listing.bathrooms}</span>
			</div>
		</div>
		<Separator class="mt-6" />
		<div class="flex mt-4 justify-between">
			<Button class="font-semibold" on:click={() => goToListing()}>VIEW</Button>
			<div class="flex space-x-2 justify-end">
				<ShareButtons listingUrl={shareUrl()} />
			</div>
		</div>
	</div>
</div>
