import type { RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ fetch, params, url }) => {
	const all = Boolean(url.searchParams.get('all')) === true ? '?all=true' : '';
	const response = await fetch(
		`/backend/v2/alerts/${params.identifier}`,
		{
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		}
	);
	return response;
};
