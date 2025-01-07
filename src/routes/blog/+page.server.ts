import { type BlogPost } from '$lib/ypaTypes.js';

/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch }) => {
	const tagsResponse = await fetch('/backend/tags/?category=blog');
	const blogResponse = await fetch('/backend/blog/?category=blog');
	const blogData: BlogPost[] = await blogResponse.json();
	const { tags }: { tags: string[] } = await tagsResponse.json();

	return {
		posts: blogData,
		tags: tags
	};
};
