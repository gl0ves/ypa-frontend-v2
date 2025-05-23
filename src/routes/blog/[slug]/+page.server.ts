import { type BlogData } from '$lib/ypaTypes.js';
import { propertyRegionOptions } from '$lib/data/options';

/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch, params }) => {
	const blogResponse = await fetch(`/backend/blog/${params.slug}`);
	const blogData: BlogData = await blogResponse.json();

	return {
		blog: blogData,
		options: {
			propertyRegionOptions
		}
	};
};
