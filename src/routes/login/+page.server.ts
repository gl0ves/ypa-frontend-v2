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
	default: async ({ request, fetch }) => {
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

		console.log(responseData);

		if (response.status === 400) {
			for (const [key, value] of Object.entries(responseData)) {
				if (Array.isArray(value) && value.length > 0) {
					setError(form, key, value[0]);
				}
			}
			return fail(400, { form });
		}
		return redirect(300, '/status=success');
	}
} satisfies Actions;
