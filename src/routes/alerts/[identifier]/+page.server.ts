import { fetchAlert } from '$lib/api/index';
import { type AlertFormData } from '$lib/ypaTypes';
import { error } from '@sveltejs/kit';
import {
	propertyRegionOptions,
	propertyTypeOptions,
	bedAndBathroomOptions,
	maxPriceOptions,
	emailFrequencyOptions
} from '$lib/data/options';
import { type Options } from '$lib/data/options';

/** @type {import('./$types').PageLoad} */
export const load = async ({
	fetch,
	params
}): Promise<{ alert: AlertFormData; options: Options } | never> => {
	const { alert, status } = (await fetchAlert(fetch, params.identifier)) as {
		alert: AlertFormData;
		status: number;
	};

	if (status === 404) {
		throw error(404, 'Not Found');
	}

	return {
		alert: alert,
		options: {
			propertyRegionOptions,
			propertyTypeOptions,
			bedAndBathroomOptions,
			maxPriceOptions,
			emailFrequencyOptions
		}
	};
};
