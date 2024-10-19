import { fetchAlert } from '$lib/api/index';
import { type AlertFormData } from '$lib/ypaTypes';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, params }): Promise<{ alert: AlertFormData } | never> => {
	const { alert, status } = await fetchAlert(fetch, params.identifier) as { alert: AlertFormData, status: number };

	if (status === 404) {
		throw error(404, 'Not Found');
	}

	return { alert };
};