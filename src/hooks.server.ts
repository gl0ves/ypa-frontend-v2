/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ request, fetch, event }) {
	if (request.url.startsWith('http://localhost:5173/backend/')) {
		// Create new headers
		const headers = new Headers(request.headers);

		// Add authentication and CSRF tokens
		const sessionToken = event?.cookies?.get('session');
		const csrfToken = event?.cookies?.get('csrftoken');

		if (sessionToken) {
			// Set both session tokens and CSRF token in Cookie header
			const cookies = [`sessionid=${sessionToken}`];
			if (csrfToken) {
				cookies.push(`csrftoken=${csrfToken}`);
			}
			headers.set('Cookie', cookies.join('; '));
			headers.set('X-Session-Token', sessionToken);
		}

		// Add CSRF token for non-GET requests
		if (request.method !== 'GET' && csrfToken) {
			headers.set('X-CSRFToken', csrfToken);
		}

		// Create options for the new request
		const options: RequestInit = {
			method: request.method,
			headers: headers,
			// Don't modify the body - pass it through as is
			body: request.body,
			credentials: 'same-origin' as RequestCredentials
		};

		// Create a new request with the modified URL and options
		request = new Request(
			request.url.replace('http://localhost:5173/backend/', 'http://ypa-backend:8000/api/'),
			options
		);
	}
	return fetch(request);
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// Use 'sessionid' for Django sessions
	const sessionToken = event.cookies.get('session');
	const csrfToken = event.cookies.get('csrftoken');

	if (sessionToken) {
		event.locals.sessionToken = sessionToken;
	}

	if (event.url.pathname.startsWith('/backend/')) {
		const headers = new Headers(event.request.headers);
		if (sessionToken) {
			// Set both session tokens and CSRF token in Cookie header
			const cookies = [`sessionid=${sessionToken}`];
			if (csrfToken) {
				cookies.push(`csrftoken=${csrfToken}`);
			}
			headers.set('Cookie', cookies.join('; '));
			headers.set('X-Session-Token', sessionToken);
		}

		// Add CSRF token for non-GET requests
		if (event.request.method !== 'GET' && csrfToken) {
			headers.set('X-CSRFToken', csrfToken);
		}

		// Clone the request to preserve the body
		const clonedRequest = event.request.clone();

		// For client-side requests, the URL will be /api/...
		const response = await fetch(
			event.url.href.replace(`${event.url.origin}/api/`, 'http://ypa-backend:8000/api/'),
			{
				method: event.request.method,
				headers: headers,
				// Pass the body through without modification
				body: clonedRequest.body,
				credentials: 'same-origin'
			}
		);

		// Forward the session cookie from Django's response
		const responseCookies = response.headers.get('set-cookie');
		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: new Headers({
				...Object.fromEntries(response.headers.entries()),
				'set-cookie': responseCookies || ''
			})
		});
	}

	return resolve(event);
}
