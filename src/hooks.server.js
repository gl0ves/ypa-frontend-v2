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
