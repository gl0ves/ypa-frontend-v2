import type { Load } from '@sveltejs/kit';
import { type AlertFormData, type Listing } from '$lib/ypaTypes';

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
	const response = await fetch(`/backend/alerts/${identifier}/get_property_alert/`);
	const data = (await response.json()) as AlertFormData;
	return { alert: data, status: response.status };
};

const savePropertyAlert = async (alertFormData: AlertFormData) => {
	const response = await fetch('/api/alerts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(alertFormData)
	});
	return response;
};

const deletePropertyAlert = async (identifier: string, all: boolean) => {
	const param = all ? '?all=true' : '';
	const response = await fetch(`/api/alerts/${identifier}` + param, {
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

export const save = async (slug: string) => {
	const response = await fetch(`/api/blog/${slug}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
	});
	return response;
};

// NOTE: The routes defined here are the ones that are in the routes/api folder
export { fetchListings, fetchAreas, fetchAlert, savePropertyAlert, deletePropertyAlert, upload };
