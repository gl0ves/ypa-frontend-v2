import { fetchAlerts } from '$lib/api/index';
import { type AlertFormData } from '$lib/ypaTypes';

export const load = async ({ fetch, params }) => {
	const identifier = params.identifier;
	const alert = await fetchAlerts( fetch, identifier) as AlertFormData;

	return {
		alert
	};
};
