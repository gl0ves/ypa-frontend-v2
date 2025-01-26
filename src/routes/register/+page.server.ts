import { superValidate, fail, setError } from 'sveltekit-superforms';
import { signupFormSchema } from '$lib/components/Forms/SignupForm/SignupFormSchema';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async () => {
	return {
		form: await superValidate(zod(signupFormSchema))
	};
};

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const form = await superValidate(data, zod(signupFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const requestData = {
			first_name: form.data.firstName,
			email: form.data.email,
			password: form.data.password,
			password_confirm: form.data.passwordConfirmation
		};
		const response = await fetch('/backend/v2/auth/register/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestData)
		});

		const responseData = await response.json();

		if (response.status === 400) {
			for (const [key, value] of Object.entries(responseData)) {
				if (Array.isArray(value) && value.length > 0) {
					setError(form, key, value[0]);
				}
			}
			return fail(400, { form });
		}
		return redirect(300, '/register?status=success');
	}
} satisfies Actions;
