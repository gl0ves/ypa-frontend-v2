import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { BlogUpdateData } from '$lib/ypaTypes';
export const PATCH: RequestHandler = async ({ request, params, fetch }) => {
	try {
		const data: BlogUpdateData = await request.json();
		const { id } = params;

		// Forward the request to the Django backend
		const response = await fetch(`/backend/writer/${id}/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			// If the backend returns an error, pass it through
			return new Response(null, {
				status: response.status,
				statusText: response.statusText
			});
		}

		// Return the successful response from the backend
		const responseData = await response.json();
		return json(responseData);
	} catch (error) {
		console.error('Error updating blog post:', error);
		return new Response(null, {
			status: 500,
			statusText: 'Internal Server Error'
		});
	}
};

export const GET: RequestHandler = async ({ request, params, fetch }) => {
	const { id } = params;

	const response = await fetch(`/backend/writer/${id}/`);
	return json(await response.json());
};
