import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, fetch }) => {
	// Simply forward the original FormData to the backend
	try {
		const formData = await request.formData();
		const isCover = formData.get('cover') === 'true';

		const backendResponse = await fetch('/backend/upload/', {
			method: 'POST',
			// Let the browser set the Content-Type header with the correct boundary
			body: formData
		});

		// If it's a cover image upload with 202 status, return a valid JSON response
		if (isCover && backendResponse.status === 202) {
			return new Response(JSON.stringify({ success: true }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// For regular responses, try to parse JSON
		try {
			// Check if there's content to parse
			const text = await backendResponse.text();
			if (!text || text.trim() === '') {
				// If no content but status is successful, return a valid JSON response
				if (backendResponse.ok) {
					return new Response(JSON.stringify({ success: true }), {
						status: 200,
						headers: { 'Content-Type': 'application/json' }
					});
				} else {
					// If no content and status is not successful, return an error
					return new Response(
						JSON.stringify({
							error: `Server returned empty response with status ${backendResponse.status}`
						}),
						{
							status: backendResponse.status,
							headers: { 'Content-Type': 'application/json' }
						}
					);
				}
			}

			// Try to parse the response as JSON
			const data = JSON.parse(text);
			return new Response(JSON.stringify(data), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			});
		} catch (error) {
			console.error('Error parsing response:', error);

			// If JSON parsing fails but status is successful, return a valid JSON response
			if (backendResponse.ok) {
				return new Response(JSON.stringify({ success: true }), {
					status: 200,
					headers: { 'Content-Type': 'application/json' }
				});
			}

			// Otherwise, return an error
			return new Response(
				JSON.stringify({
					error: 'Invalid response from server',
					details: error instanceof Error ? error.message : String(error)
				}),
				{
					status: 500,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}
	} catch (error) {
		console.error('Upload error:', error);
		return new Response(
			JSON.stringify({
				error: 'Upload failed',
				details: error instanceof Error ? error.message : String(error)
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}
};
