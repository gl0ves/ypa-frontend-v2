import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, fetch }) => {
	// Simply forward the original FormData to the backend
	try {
		const backendResponse = await fetch('/backend/upload/', {
			method: 'POST',
			// Let the browser set the Content-Type header with the correct boundary
			body: await request.formData()
		});

		const data = await backendResponse.json();
		return new Response(JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Upload error:', error);
		return new Response(JSON.stringify({ error: 'Upload failed' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
