<script lang="ts">
	import type { ListingDetails } from '$lib/ypaTypes';
	import Carousel from '$lib/components/ui/carousel/carousel.svelte';
	import YpaText from '$lib/components/ui/text/YpaText.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import ShareButtons from '$lib/components/ShareButtons/ShareButtons.svelte';
	// Import Icons: Map, Bed, Pin
	import IconBed from '~icons/mdi/bed';
	import IconShower from '~icons/mdi/shower';
	import IconLocation from '~icons/mdi/location';
	import IconMap from '~icons/mdi/map';
	import IconCheck from '~icons/mdi/check-circle';
	import PropertyAlertForm from '$lib/components/PropertyAlertForm/PropertyAlertForm.svelte';
	import type { Options } from '$lib/data/options';
	const { listing, options }: { listing: ListingDetails; options: Options } = $props();
</script>

<div class="flex justify-between pt-4 pb-2">
	<YpaText weight="semibold" size="md">{listing.ref}</YpaText>
	<div class="flex justify-end">
		<ShareButtons />
	</div>
</div>
<Separator />
<div class="flex justify-between pt-4 pb-2">
	<YpaText weight="bold" size="lg"
		>{listing.bedrooms} bedroom {listing.type} in {listing.area} - {listing.ref}</YpaText
	>
	<YpaText weight="bold" size="lg">{listing.price.toLocaleString()}€</YpaText>
</div>
<div class="pb-4">
	<Carousel {listing} />
</div>
<div class="flex-col pb-2 max-w-[500px]">
	<div class="pb-2">
		<YpaText weight="semibold" size="md">{listing.type}</YpaText>
		<Separator />
	</div>
	<div class="flex flex-wrap pb-6">
		<div class="flex items-center mr-2">
			<IconMap class="text-primary  mr-1" />
			<YpaText weight="semibold" size="sm">Region: {listing.region}</YpaText>
		</div>
		<div class="flex items-center mr-2">
			<IconLocation class="text-primary mr-1" />
			<YpaText weight="semibold" size="sm">Area: {listing.region}</YpaText>
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
	<div class="pb-2">
		<YpaText weight="semibold" size="md">Features</YpaText>
		<Separator />
	</div>
	<div class="">
		{#each listing.features as feature}
			<div class="flex items-center mr-2 capitalize">
				<IconCheck class="text-tertiary	  mr-1" />
				<YpaText weight="semibold" size="sm">{feature}</YpaText>
			</div>
		{/each}
	</div>
	<PropertyAlertForm {options} />
</div>
