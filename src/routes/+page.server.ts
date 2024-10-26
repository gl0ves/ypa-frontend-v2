import { fetchListings, fetchAreas } from '$lib/api/index';
import {
	propertyRegionOptions,
	propertyTypeOptions,
	bedAndBathroomOptions,
	maxPriceOptions,
	emailFrequencyOptions
} from '$lib/data/options';

/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch, url }) => {
	const [listings, areas] = await Promise.all([fetchListings(url, fetch), fetchAreas(url, fetch)]);

	return {
		listings: listings.results,
		listingsCount: listings.count,
		areas: areas,
		options: {
			propertyRegionOptions,
			propertyTypeOptions,
			bedAndBathroomOptions,
			maxPriceOptions,
			emailFrequencyOptions
		}
	};
};
