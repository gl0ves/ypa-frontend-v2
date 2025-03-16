import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
    // Call the logout endpoint
    await fetch('/api/auth', {
        method: 'POST'
    });

    // Clear the session cookie
    cookies.delete('session', { path: '/' });
    
    // Redirect to home
    throw redirect(302, '/');
}; 