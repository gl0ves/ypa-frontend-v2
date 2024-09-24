export async function GET({ url, fetch }) {
	const region = url.searchParams.get('region');
	const response = await fetch(`/backend/v2/listings/?limit=1000&display=areas&region=${region}`);
	const data = await response.json();
	return new Response(JSON.stringify(data), {
		headers: { 'Content-Type': 'application/json' }
	});
}
