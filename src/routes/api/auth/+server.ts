import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies, fetch, request }) => {
	const csrfToken = cookies.get('csrftoken');

	console.log('Logging out from server');

	const response = await fetch('/backend/v2/auth/logout/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrfToken || ''
		},
		credentials: 'include'
	});

	const newHeaders = new Headers({
		'Content-Type': 'application/json'
	});

	response.headers.forEach((value, key) => {
		if (key.toLowerCase() === 'set-cookie') {
			newHeaders.append(key, value);
		}
	});

	return new Response(JSON.stringify({ status: response.status }), {
		status: response.status,
		headers: newHeaders
	});
};
