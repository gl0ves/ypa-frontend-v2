/** @type {import('./$types').PageServerLoad} */
export const load = async ({ fetch, params }) => {
	const response = await fetch(`/backend/v2/listings/${params.ref}/`);
	const data = await response.json();
	return {
		listing: data
	};
};
