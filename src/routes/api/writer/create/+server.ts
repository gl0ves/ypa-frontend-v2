import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, fetch }) => {
	const data = await request.json();
	console.log(data);

	// Forward the request to the Django backend
	const response = await fetch('/backend/blog/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	console.log(response);

	return json(await response.json());
};
