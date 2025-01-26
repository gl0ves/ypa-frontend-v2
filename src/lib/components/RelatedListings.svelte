<script lang="ts">
	import ListingCard from '$lib/components/ListingCard/ListingCard.svelte';
	import type { Listing } from '$lib/ypaTypes';
	import type { PropertyRegionOption } from '$lib/data/options';
	import YpaText from './ui/text/YpaText.svelte';
	import Separator from './ui/separator/separator.svelte';

	let {
		relatedListings,
		propertyRegionOptions
	}: { relatedListings: Listing[]; propertyRegionOptions: PropertyRegionOption[] } = $props();
</script>

{#if relatedListings.length > 0}
	<div class="mb-3">
		<YpaText size="md" weight="semibold">Related Listings</YpaText>
		<Separator />
	</div>
	<div class="flex flex-col w-full items-center gap-4 mb-6 lg:flex-row">
		{#each relatedListings as related}
			<ListingCard listing={related} {propertyRegionOptions} />
		{/each}
	</div>
{/if}
