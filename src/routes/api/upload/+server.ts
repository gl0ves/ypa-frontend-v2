import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, fetch }) => {
	// Get the form data from the request
	const formData = await request.formData();
	const file = formData.get('file');

	if (!file) {
		return new Response(JSON.stringify({ error: 'No file uploaded' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	// Forward the FormData to your backend
	const backendResponse = await fetch('/backend/upload/', {
		method: 'POST',
		// No Content-Type header needed as it will be set automatically with boundary
		body: formData
	});

	const data = await backendResponse.json();

	return new Response(JSON.stringify(data), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
