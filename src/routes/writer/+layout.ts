export const ssr = false;

import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, url }) => {
	const response = await fetch('/api/v2/auth/me', {
		credentials: 'include'
	});

	if (response.status !== 200) {
		throw redirect(302, `/login?returnTo=${encodeURIComponent(url.pathname)}`);
	}

	return {};
};
