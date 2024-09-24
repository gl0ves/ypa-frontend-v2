import { fetchListings, fetchAreas } from '$lib/api/index';

export const load = async ({ fetch, params, url }) => {
	const { region } = params;
	const listings = await fetchListings(url, fetch, region);
	const areas = await fetchAreas(url, fetch, region);

	return {
		listings: listings.results,
		listingsCount: listings.count,
		areas: areas
	};
};
