import { fetchListings, fetchAreas } from '$lib/api/index';

export const load = async ({ fetch, url }) => {
	const [listings, areas] = await Promise.all([fetchListings(url, fetch), fetchAreas(url, fetch)]);

	return {
		listings: listings.results,
		listingsCount: listings.count,
		areas: areas
	};
};
