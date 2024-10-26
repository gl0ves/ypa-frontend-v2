import type { RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ fetch, params, url }) => {
	const all = Boolean(url.searchParams.get('all')) === true ? '?all=true' : '';
	const response = await fetch(
		`/backend/alerts/${params.identifier}/delete_property_alert/${all}`,
		{
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		}
	);
	return response;
};
