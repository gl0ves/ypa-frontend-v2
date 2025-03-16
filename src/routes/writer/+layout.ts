export const ssr = false;

import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, url }) => {
    const response = await fetch('/api/auth');
    const result = await response.json();
    
    if (result.status !== 200) {
        throw redirect(302, `/login?returnTo=${encodeURIComponent(url.pathname)}`);
    }
    
    return {};
};
