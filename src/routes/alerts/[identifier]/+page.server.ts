import { fetchAlerts } from '$lib/api/index';

export const load = async ({ fetch, url, params }) => {
	const identifier = params.identifier;
	const alert = await fetchAlerts(url, fetch, identifier);

	return {
		alert
	};
};
