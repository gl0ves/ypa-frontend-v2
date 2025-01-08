import { type BlogPost } from '$lib/ypaTypes.js';

/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch, url }) => {
	const paramTag = url.searchParams.get('tag');
	let blogUrl = `/backend/blog/?category=blog`;
	if (paramTag) blogUrl += `&tag=${paramTag}`;

	const tagsResponse = await fetch('/backend/tags/?category=blog');
	const blogResponse = await fetch(blogUrl);
	const blogData: BlogPost[] = await blogResponse.json();
	const { tags }: { tags: string[] } = await tagsResponse.json();

	return {
		posts: blogData,
		tags: tags
	};
};
