import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, fetch }) => {
	const requestData = await request.json();
	const response = await fetch(`/api/form/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(requestData)
	});
	const data = await response.json();
	return new Response(JSON.stringify(data));
};
