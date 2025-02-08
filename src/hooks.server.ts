/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ request, fetch, event }) {
	if (request.url.startsWith('http://localhost:5173/backend/')) {
		const body =
			request.method !== 'GET' && request.method !== 'HEAD' ? await request.text() : undefined;

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

		console.log(options);

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

		const response = await fetch(
			event.url.href.replace(`${event.url.origin}/api/`, 'http://ypa-backend:8000/api/'),
			{
				method: event.request.method,
				headers: headers,
				body: event.request.body,
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
