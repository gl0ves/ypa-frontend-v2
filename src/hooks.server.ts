/**
 * Helper function to prepare authentication headers
 */
function prepareAuthHeaders(
	headers: Headers,
	cookies: { get: (name: string) => string | undefined },
	method: string
) {
	// Create a new Headers object if none was provided
	headers = headers || new Headers();

	// Get authentication and CSRF tokens
	const sessionToken = cookies?.get('sessionid');
	const csrfToken = cookies?.get('csrftoken');

	// Build the cookie header with necessary cookies
	const cookieParts = [];
	if (sessionToken) cookieParts.push(`sessionid=${sessionToken}`);
	if (csrfToken) cookieParts.push(`csrftoken=${csrfToken}`);

	// Set the combined cookie header if we have any cookies
	if (cookieParts.length > 0) {
		headers.set('Cookie', cookieParts.join('; '));
	}

	// Add CSRF token to headers for non-GET/HEAD requests
	if (csrfToken && method !== 'GET' && method !== 'HEAD') {
		headers.set('X-CSRFToken', csrfToken);
	}

	return headers;
}

/**
 * Helper function to process request body based on content type
 */
async function processRequestBody(request: Request) {
	const contentType = request.headers.get('content-type') || '';

	// Skip for GET/HEAD requests
	if (request.method === 'GET' || request.method === 'HEAD') {
		return null;
	}

	// Handle based on content type
	if (
		contentType.includes('multipart/form-data') ||
		contentType.includes('image/') ||
		contentType.includes('application/octet-stream')
	) {
		// For binary data, preserve it as is
		return await request.arrayBuffer();
	} else {
		// For text data, convert to text
		return await request.text();
	}
}

/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ request, fetch, event }) {

	if (request.url.startsWith('http://localhost/backend/')) {
		const body = await processRequestBody(request);
		const headers = prepareAuthHeaders(new Headers(request.headers), event.cookies, request.method);
		const options = {
			method: request.method,
			headers,
			body,
			credentials: 'include' as RequestCredentials
		};

		request = new Request(
			request.url.replace('http://localhost/backend/', 'http://ypa-backend:8000/api/'),
			options
		);

		const response = await fetch(request);

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: response.headers
		});
	}
	return fetch(request);
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const sessionToken = event.cookies.get('sessionid');
	if (sessionToken) {
		event.locals.sessionToken = sessionToken;
	}

	if (event.url.pathname.startsWith('/backend/')) {
		const body = await processRequestBody(event.request);
		const headers = prepareAuthHeaders(
			new Headers(event.request.headers),
			event.cookies,
			event.request.method
		);

		const proxyUrl = event.url.href.replace(
			`${event.url.origin}/backend/`,
			'http://ypa-backend:8000/api/'
		);

		const response = await fetch(proxyUrl, {
			method: event.request.method,
			headers,
			body,
			credentials: 'include'
		});

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: response.headers
		});
	}

	if (
		event.url.pathname.startsWith(
			'/.well-known/appspecific/com.chrome.devtools'
		)
	) {
		return new Response(null, { status: 204 }); // Return empty response with 204 No Content
	}

	return resolve(event);
}
