import { type BlogPost } from '$lib/ypaTypes.js';

/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch, url }) => {
	let blogUrl = `/backend/blog/?category=blog`;

	const blogResponse = await fetch(blogUrl);
	const blogData: BlogPost[] = await blogResponse.json();

	return {
		posts: blogData
	};
};
