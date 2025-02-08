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

		if (response.status === 400) {
			const responseData = await response.json();
			if (responseData?.password?.length) setError(form, 'password', responseData.password[0]);
			if (responseData?.email?.length) setError(form, 'email', responseData.email[0]);
			return fail(400, { form });
		}
		return redirect(300, '/register?status=success');
	}
} satisfies Actions;
