/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ request, fetch, event }) {
	if (request.url.startsWith('http://localhost:5173/backend/')) {
		// Get the content type
		const contentType = request.headers.get('content-type') || '';

		// Handle the body based on content type
		let body;
		if (request.method !== 'GET' && request.method !== 'HEAD') {
			if (
				contentType.includes('multipart/form-data') ||
				contentType.includes('image/') ||
				contentType.includes('application/octet-stream')
			) {
				// For binary data, preserve it as is
				body = await request.arrayBuffer();
			} else {
				// For text data, convert to text
				body = await request.text();
			}
		}

		const sessionToken = event?.cookies?.get('session'); // Change to 'sessionid' for Django

		const headers = new Headers(request.headers);
		if (sessionToken) {
			// Set the Django session cookie
			headers.set('Cookie', `sessionid=${sessionToken}`);
		}

		const options: RequestInit = {
			method: request.method,
			headers: headers,
			body: body,
			credentials: 'same-origin' as RequestCredentials
		};

		console.log('Request options:', {
			method: options.method,
			headers: Object.fromEntries(headers.entries()),
			hasBody: !!body,
			contentType
		});

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
	if (sessionToken) {
		event.locals.sessionToken = sessionToken;
	}

	if (event.url.pathname.startsWith('/backend/')) {
		const headers = new Headers(event.request.headers);
		if (sessionToken) {
			headers.set('Cookie', `sessionid=${sessionToken}`);
		}

		// Get the content type
		const contentType = event.request.headers.get('content-type') || '';

		// Handle the body based on content type
		let body;
		if (event.request.method !== 'GET' && event.request.method !== 'HEAD') {
			if (
				contentType.includes('multipart/form-data') ||
				contentType.includes('image/') ||
				contentType.includes('application/octet-stream')
			) {
				// For binary data, preserve it as is
				body = await event.request.arrayBuffer();
			} else {
				// For text data, convert to text
				body = await event.request.text();
			}
		}

		// Create new request
		const proxyUrl = event.url.href.replace(
			`${event.url.origin}/backend/`,
			'http://ypa-backend:8000/api/'
		);

		const response = await fetch(proxyUrl, {
			method: event.request.method,
			headers: headers,
			body: body,
			credentials: 'same-origin'
		});

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
