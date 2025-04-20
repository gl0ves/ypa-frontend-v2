import { superValidate, fail, setError } from 'sveltekit-superforms';
import { loginFormSchema } from '$lib/components/Forms/LoginForm/LoginFormSchema';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load: PageLoad = async ({ url }) => {
	const email = url.searchParams.get('email');
	const returnTo = url.searchParams.get('returnTo');
	const form = await superValidate(zod(loginFormSchema));

	if (email) {
		form.data.email = email;
	}

	return {
		form: form,
		returnTo
	};
};

// Function to extract cookies from Set-Cookie header
function extractCookies(setCookieHeader: string): Record<string, string> {
	const cookies: Record<string, string> = {};

	// Split multiple cookies (they're separated by comma)
	const cookiesArray = setCookieHeader.split(', ');

	cookiesArray.forEach((cookieStr) => {
		// Get the first part before semicolon which has the name=value
		const mainPart = cookieStr.split(';')[0];
		const [name, value] = mainPart.split('=');

		cookies[name] = value;
	});

	return cookies;
}

export const actions: Actions = {
	default: async ({ request, fetch, cookies }) => {
		const data = await request.formData();
		const form = await superValidate(data, zod(loginFormSchema));
		const returnTo = data.get('returnTo')?.toString();

		if (!form.valid) {
			return fail(400, { form });
		}

		const requestData = {
			email: form.data.email,
			password: form.data.password
		};
		const response = await fetch('/backend/v2/auth/login/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestData),
			credentials: 'include'
		});

		if (response.status === 401) {
			setError(form, 'password', 'Invalid email or password');
			return fail(400, { form });
		}

		// Extract the Set-Cookie header from the response
		const setCookieHeader = response.headers.get('set-cookie');

		if (setCookieHeader) {
			// Extract cookies
			const extractedCookies = extractCookies(setCookieHeader);

			// Set the cookies in SvelteKit
			if (extractedCookies.csrftoken) {
				cookies.set('csrftoken', extractedCookies.csrftoken, {
					path: '/',
					httpOnly: true,
					sameSite: 'lax',
					maxAge: 31449600 // Match the original expiry
				});
			}

			if (extractedCookies.sessionid) {
				cookies.set('sessionid', extractedCookies.sessionid, {
					path: '/',
					httpOnly: true,
					sameSite: 'lax',
					maxAge: 1209600 // Match the original expiry
				});
			}
		}

		return redirect(302, returnTo || '/');
	}
};
