import { fetchListings, fetchAreas } from '$lib/api/index';
import {
	emailFrequencyOptions,
	maxPriceOptions,
	propertyRegionOptions,
	propertyTypeOptions,
	bedAndBathroomOptions
} from '$lib/data/options';

/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch, params, url }) => {
	const { region } = params;
	const listings = await fetchListings(url, fetch, region);
	const areas = await fetchAreas(url, fetch, region);

	const currentRegion = propertyRegionOptions.find((r) => r.value === region)?.label;

	return {
		listings: listings.results,
		listingsCount: listings.count,
		areas: areas,
		region: currentRegion,
		options: {
			propertyRegionOptions,
			propertyTypeOptions,
			emailFrequencyOptions,
			maxPriceOptions,
			bedAndBathroomOptions
		}
	};
};
