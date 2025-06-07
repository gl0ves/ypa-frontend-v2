<script lang="ts">
	import type { ListingDetails } from '$lib/ypaTypes';
	import Carousel from '$lib/components/ui/ypa-carousel/carousel.svelte';
	import YpaText from '$lib/components/ui/text/YpaText.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import ShareButtons from '$lib/components/ShareButtons/ShareButtons.svelte';
	import IconBed from '~icons/mdi/bed';
	import IconShower from '~icons/mdi/shower';
	import IconLocation from '~icons/mdi/location';
	import IconMap from '~icons/mdi/map';
	import IconCheck from '~icons/mdi/check-circle';
	import PropertyAlertForm from '$lib/components/PropertyAlertForm/PropertyAlertForm.svelte';
	import type { Options } from '$lib/data/options';
	import WhatsAppButton from '../WhatsAppButton/WhatsAppButton.svelte';
	import Map from '../Map/Map.svelte';
	import Description from './Description.svelte';
	import EnquiryForm from '$lib/components/EnquiryForm.svelte';
	import RelatedListings from '../RelatedListings.svelte';
	let { listing, options }: { listing: ListingDetails; options: Options } = $props();
	const { propertyRegionOptions } = options;

	const longitude = $derived(() => {
		if (!listing.longitude) return;
		return parseFloat(listing.longitude);
	});
	const latitude = $derived(() => {
		if (!listing.latitude) return;
		return parseFloat(listing.latitude);
	});
</script>

<div class="flex justify-between pt-4 mb-2">
	<YpaText weight="semibold" size="md">{listing.ref}</YpaText>
	<div class="flex justify-end">
		<ShareButtons />
	</div>
</div>
<Separator />
<div class="flex flex-col md:flex-row md:justify-between pt-4 mb-2">
	<YpaText weight="bold" size="lg"
		>{listing.bedrooms} bedroom {listing.type} in {listing.area} - {listing.ref}</YpaText
	>
	<YpaText weight="bold" size="lg" class="text-right md:text-left">{listing.price.toLocaleString()}€</YpaText>
</div>
<div class="mb-6">
	<Carousel {listing} />
</div>
<div class="flex w-full flex-col lg:flex-row justify-between">
	<div class="flex-col mb-2 mr-10 lg:max-w-[700px] w-full">
		<div class="mb-6">
			<YpaText weight="semibold" size="md">{listing.type}</YpaText>
			<Separator />
		</div>
		<div class="flex-col flex-wrap pb-6">
			<div class="flex items-center mr-2">
				<IconMap class="text-primary  mr-1" />
				<YpaText weight="semibold" size="sm">Region: {listing.region}</YpaText>
			</div>
			<div class="flex items-center mr-2">
				<IconLocation class="text-primary mr-1" />
				<YpaText weight="semibold" size="sm">Area: {listing.area}</YpaText>
			</div>
			<div class="flex items-center mr-2">
				<IconBed class="text-primary  mr-1" />
				<YpaText weight="semibold" size="sm">Bedrooms: {listing.bedrooms}</YpaText>
			</div>
			<div class="flex items-center mr-2">
				<IconShower class="text-primary  mr-1" />
				<YpaText weight="semibold" size="sm">Bathrooms: {listing.bathrooms}</YpaText>
			</div>
		</div>
		{#if listing.features.length}
			<div class="mb-6">
				<YpaText weight="semibold" size="md">Features</YpaText>
				<Separator />
			</div>
		{/if}
		<div class="mb-6 flex flex-wrap">
			{#each listing.features as feature}
				<div class="flex items-center mr-2 capitalize">
					<IconCheck class="text-tertiary	  mr-1" />
					<YpaText weight="semibold" size="sm">{feature}</YpaText>
				</div>
			{/each}
		</div>
		<div class="mb-6 flex flex-col lg:flex-row gap-2 w-[100%]">
			<PropertyAlertForm {listing} {options} />
			<WhatsAppButton />
		</div>
		<div class="flex flex-col mb-6">
			<Description descriptions={listing.descriptions} />
		</div>
	</div>
	<div class="flex min-w-[300px] h-full justify-center lg:justify-end">
		<EnquiryForm ref={listing.ref} />
	</div>
</div>
<div class="mb-6">
	{#if listing.latitude && listing.longitude}
		<YpaText weight="semibold" size="md">Location</YpaText>
		<Separator />
		<Map longitude={longitude()} latitude={latitude()} />
	{/if}
</div>
<RelatedListings relatedListings={listing.related_listings} {propertyRegionOptions} />
