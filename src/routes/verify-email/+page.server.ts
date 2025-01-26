import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async ({ url, fetch }) => {
	const token = url.searchParams.get('token');
	const response = await fetch(`/backend/v2/auth/verify_email/?token=${token}`);

	if (response.status === 200) {
		const { email } = await response.json();
		return { email };
	}

	return { email: null };
};
