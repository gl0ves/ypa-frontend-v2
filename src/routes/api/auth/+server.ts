import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies, fetch }) => {
	const response = await fetch('/backend/v2/auth/logout/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (response.status == 204) {
		cookies.delete('session_token', { path: '/' });
		return new Response(JSON.stringify({ status: 204 }));
	}
	return new Response(JSON.stringify({ status: response.status }));
};

export const GET: RequestHandler = async ({ cookies, fetch }) => {
	const response = await fetch('/backend/v2/auth/me/', {
		headers: {
			'Content-Type': 'application/json',
			'X-Session-Token': cookies.get('session_token') || ''
		}
	});
	
	return new Response(JSON.stringify({ 
		status: response.status,
		data: await response.json()
	}));
};
