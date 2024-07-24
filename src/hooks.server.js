/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ request, fetch }) {
	if (request.url.startsWith('http://localhost:5173/api/')) {
		// clone the original request, but change the URL
		request = new Request(
			request.url.replace('http://localhost:5173/api/', 'http://ypa-backend:8000/api/'),
			request
		);
	}
	return fetch(request);
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/api/')) {
		// Proxy API requests
		const response = await fetch(
			event.url.href.replace(`${event.url.origin}/api/`, 'http://ypa-backend:8000/api/'),
			{
				method: event.request.method,
				headers: event.request.headers,
				body: event.request.body
			}
		);

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: response.headers
		});
	}

	return resolve(event);
}
