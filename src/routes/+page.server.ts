import { fetchListings, fetchAreas } from '$lib/api/index';

export const load = async ({ fetch, url, depends }) => {
	depends('app:listingsCount');

	const [listings, areas] = await Promise.all([fetchListings(url, fetch), fetchAreas(url, fetch)]);

	return {
		listings: listings.results,
		listingsCount: listings.count,
		areas: areas.results.map((a) => a.area)
	};
};
