import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	console.log('Logging out');

	const response = await fetch('/backend/v2/auth/logout/', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if ([204, 403].includes(response.status)) {
		cookies.delete('sessionid', { path: '/' });
		cookies.delete('csrftoken', { path: '/' });
		// Redirect to home
		throw redirect(302, '/');
	}

	console.error('Logout failed');
	throw error(500, 'Logout failed');
};
