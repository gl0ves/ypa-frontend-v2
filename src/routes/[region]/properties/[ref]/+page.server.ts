import {
	propertyRegionOptions,
	propertyTypeOptions,
	bedAndBathroomOptions,
	maxPriceOptions,
	emailFrequencyOptions
} from '$lib/data/options';
import { type ListingDetails } from '$lib/ypaTypes.js';
/** @type {import('./$types').PageServerLoad} */
export const load = async ({ fetch, params }) => {
	const { ref } = params;
	const response = await fetch(`/backend/v2/listings/${ref}/`);
	const data: ListingDetails = await response.json();
	return {
		listing: data,
		options: {
			propertyRegionOptions,
			propertyTypeOptions,
			bedAndBathroomOptions,
			maxPriceOptions,
			emailFrequencyOptions
		}
	};
};
