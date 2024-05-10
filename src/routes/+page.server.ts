export const load = async ({ fetch, url }) => {
	const limit = 18;
	const fetchListings = async () => {
		const page = url.searchParams.get('page') || 1;
		const offset = (Number(page) - 1) * limit;
		const searchParams = new URLSearchParams(url.searchParams);
		searchParams.set('limit', limit.toString());
		searchParams.set('offset', offset.toString());
		const res = await fetch(`/api/listings/?${searchParams.toString()}`);
		return await res.json();
	};

	const getAreas = async () => {
		const region = url.searchParams.get('region');
		if (!region) return { data: [] };
		const res = await fetch(`/api/listings?display=areas&region=${region}`);
		return await res.json();
	};

	const { results, next, count } = await fetchListings();
	const { data } = await getAreas();

	return {
		listings: results,
		next,
		count,
		areas: data
	};
};
