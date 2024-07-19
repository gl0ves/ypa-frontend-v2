import type { Load } from '@sveltejs/kit';

// Define the type for the fetch function parameter using the Fetch function from the Load context
type FetchFunction = Parameters<Load>[0]['fetch'];

const fetchListings = async (url: URL, fetch: FetchFunction, region?: string) => {
	const limit = 18;
	const page = url.searchParams.get('page') || 1;
	const offset = (Number(page) - 1) * limit;
	const searchParams = url.searchParams;
	searchParams.set('limit', limit.toString());
	searchParams.set('offset', offset.toString());
	if (region) searchParams.set('region', region);
	const res = await fetch(`/api/v2/listings/?${searchParams.toString()}`);
	return await res.json();
};

const fetchAreas = async (url: URL, fetch: FetchFunction, region?: string) => {
	const searchRegion = region ?? url.searchParams.get('region') ?? undefined;
	if (!searchRegion) return { results: [], next: null };
	const res = await fetch(`/api/v2/listings/?limit=1000&display=areas&region=${searchRegion}`);
	return (await res.json()) as { results: { area: string }[]; next: string };
};

export { fetchListings, fetchAreas };