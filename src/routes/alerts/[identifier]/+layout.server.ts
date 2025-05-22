import { fetchAlert } from '$lib/api/index';
import { type AlertFormData } from '$lib/ypaTypes';
import {
	propertyRegionOptions,
	propertyTypeOptions,
	bedAndBathroomOptions,
	maxPriceOptions,
	emailFrequencyOptions
} from '$lib/data/options';
import { type Options } from '$lib/data/options';

/** @type {import('./$types').LayoutLoad} */
export const load = async ({
	fetch,
	params
}): Promise<{ alert: AlertFormData | null; options: Options; status: number }> => {
	const { alert, status } = (await fetchAlert(fetch, params.identifier)) as {
		alert: AlertFormData;
		status: number;
	};

	return {
		alert: status === 404 ? null : alert,
		options: {
			propertyRegionOptions,
			propertyTypeOptions,
			bedAndBathroomOptions,
			maxPriceOptions,
			emailFrequencyOptions
		},
		status
	};
}; 