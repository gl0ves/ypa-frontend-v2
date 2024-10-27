<script lang="ts">
	import IconBed from '~icons/mdi/bed';
	import IconShower from '~icons/mdi/shower';
	import IconFacebook from '~icons/mdi/facebook';
	import IconWhatsApp from '~icons/mdi/whatsapp';
	import IconEmail from '~icons/mdi/email-outline';
	import IconCopy from '~icons/mdi/content-copy';
	import IconHouse from '~icons/mdi/house';
	import IconLocation from '~icons/mdi/location';

	import type { Listing } from '$lib/ypaTypes';

	// TODO Import some type
	// import { type ... }

	import Separator from '../ui/separator/separator.svelte';
	import Button from '../ui/button/button.svelte';

	import { goto } from '$app/navigation';

	import { formatPrice } from '$lib/utils';

	const { listing }: { listing: Listing } = $props();

	// TODO: Add env variable for the domain
	const baseUrl = 'localhost:5173';
	const listingUrl = `/${listing.region}/properties/${listing.ref}`;

	const goToListing = () => {
		goto(listingUrl);
	};
</script>

<div class="w-96 bg-white shadow rounded-lg overflow-hidden">
	<div class="relative h-48 w-full">
		<button onclick={() => goToListing()}>
			<img
				src={listing.image}
				alt="Listing thumbnail"
				class="absolute h-full w-full object-cover cursor-pointer"
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
			<Button class="font-semibold">MORE INFO</Button>
			<div class="flex space-x-2 justify-end">
				<a
					href="https://www.facebook.com/sharer/sharer.php?u={listingUrl}"
					target="_blank"
					class="p-2 rounded-full flex items-center text-facebook hover:bg-gray-100"
				>
					<IconFacebook class="h-6 w-6" />
				</a>
				<a
					href="whatsapp://send?text={listingUrl}"
					data-action="share/whatsapp/share"
					target="_blank"
					class="p-2 rounded-full flex items-center text-whatsapp hover:bg-gray-100"
				>
					<IconWhatsApp class="h-6 w-6" />
				</a>
				<a
					href={`mailto:?subject=Check out this&body=${listingUrl}`}
					target="_blank"
					class="p-2 rounded-full flex items-center hover:bg-gray-100"
				>
					<IconEmail class="h-6 w-6 text-gmail" />
				</a>

				<button
					class="p-2 rounded-full flex items-center hover:bg-gray-100 cursor-pointer"
					onclick={() => navigator.clipboard.writeText(listingUrl)}
					onkeydown={(event) => {
						if (event.key === 'Enter' || event.key === ' ') {
							navigator.clipboard.writeText(listingUrl);
						}
					}}
				>
					<IconCopy class="h-6 w-6 text-primary" />
				</button>
			</div>
		</div>
	</div>
</div>
