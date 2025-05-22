import type { Load } from '@sveltejs/kit';
import {
	type AlertFormData,
	type BlogData,
	type Listing,
	type BlogUpdateData
} from '$lib/ypaTypes';

// Define the type for the fetch function parameter using the Fetch function from the Load context
type FetchFunction = Parameters<Load>[0]['fetch'];

const fetchListings = async (url: URL, fetch: FetchFunction, region?: string) => {
	const limit = 18;
	const page = url.searchParams.get('page') || 1;
	const offset = (Number(page) - 1) * limit;
	const searchParams = url.searchParams;
	searchParams.set('limit', limit.toString());
	searchParams.set('offset', offset.toString());
	if (region) searchParams.set('region', region);
	const res = await fetch(`/backend/v2/listings/?${searchParams.toString()}`);
	return (await res.json()) as { results: Listing[]; count: number };
};

const fetchAreas = async (url: URL, fetch: FetchFunction, region?: string) => {
	const searchRegion = region ?? url.searchParams.get('region') ?? undefined;
	if (!searchRegion) return [];
	const response = await fetch(
		`/backend/v2/listings/?limit=1000&display=areas&region=${searchRegion}`
	);
	const { results } = (await response.json()) as { results: string[] };
	return results;
};

const fetchAlert = async (fetch: FetchFunction, identifier: string) => {
	const response = await fetch(`/backend/v2/alerts/${identifier}/`);
	const data = (await response.json()) as AlertFormData;
	return { alert: data, status: response.status };
};

const savePropertyAlert = async (alertFormData: AlertFormData) => {
	const response = await fetch(`/api/v2/alerts/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(alertFormData)
	});
	return response;
};

const updatePropertyAlert = async (identifier: string, data: AlertFormData) => {
	const response = await fetch(`/api/v2/alerts/${identifier}/`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return response;
};

const verifyPropertyAlert = async (identifier: string, data: { verified: boolean }) => {
	const response = await fetch(`/api/v2/alerts/${identifier}/`, {
		method: 'PATCH'
	});
	return response;
};

const deletePropertyAlert = async (identifier: string, all: boolean) => {
	const param = all ? '?all=true' : '';
	const response = await fetch(`/api/v2/alerts/${identifier}/` + param, {
		method: 'DELETE'
	});
	return response;
};

type UploadResponse = {
	url: string;
};

const upload = async (src: string): Promise<UploadResponse> => {
	const res = await fetch(src);
	const blob = await res.blob();

	const formData = new FormData();
	formData.append('file', blob);

	const response = await fetch('/api/upload', {
		method: 'POST',
		body: formData
	});

	const data = await response.json();

	return data;
};

const saveBlogPost = async (id: string, data: { html: string; title: string }) => {
	const response = await fetch(`/api/writer/${id}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ content: data.html, title: data.title })
	});
	return response;
};

type CreateBlogPostData = {
	title: string;
	category: string;
};

const createBlogPost = async (data: CreateBlogPostData) => {
	const response = await fetch('/api/writer/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	const responseData = await response.json();
	return responseData as BlogData;
};

const updateBlogPost = async (id: string, data: BlogUpdateData) => {
	if (!data.title) throw new Error('Title is required');
	if (!data.slug) throw new Error('Slug is required');
	if (data.slug) data.slug = data.slug.replace(/\s+/g, '-');
	const response = await fetch(`/api/writer/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});

	const responseData = await response.json();
	return responseData as BlogData;
};

// NOTE: The routes defined here are the ones that are in the routes/api folder
export {
	fetchListings,
	fetchAreas,
	fetchAlert,
	savePropertyAlert,
	updatePropertyAlert,
	verifyPropertyAlert,
	deletePropertyAlert,
	upload,
	saveBlogPost,
	createBlogPost,
	updateBlogPost
};
