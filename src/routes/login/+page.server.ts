import { superValidate, fail, setError } from 'sveltekit-superforms';
import { loginFormSchema } from '$lib/components/Forms/LoginForm/LoginFormSchema';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async ({ url }) => {
	const email = url.searchParams.get('email');
	const form = await superValidate(zod(loginFormSchema));

	if (email) {
		form.data.email = email;
	}

	return {
		form: form
	};
};

export const actions = {
	default: async ({ request, fetch, cookies }) => {
		const data = await request.formData();
		const form = await superValidate(data, zod(loginFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		console.log(form.data);
		const requestData = {
			email: form.data.email,
			password: form.data.password
		};
		const response = await fetch('/backend/v2/auth/login/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestData)
		});

		const responseData = await response.json();

		if (response.status === 401) {
			setError(form, 'password', 'Invalid email or password');
			return fail(400, { form });
		}

		// Set session cookie
		cookies.set('session', responseData.session_token, {
			httpOnly: true,
			path: '/',
			// TODO: Implement remember me
			maxAge: 60 * 60 * 24 * 7
		});

		return redirect(300, '/');
	}
} satisfies Actions;
