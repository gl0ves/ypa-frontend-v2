/** @type {import('./$types').PageServerLoad} */
export const load = async ({ fetch, params }) => {
	// Access the 'ref' URL parameter
	const fetchListings = async () => {
		const response = await fetch(`/api/listings/${params.ref}`);
		const data = await response.json();
		return data.results;
	};
	return {
		data: await fetchListings()
	};
};
