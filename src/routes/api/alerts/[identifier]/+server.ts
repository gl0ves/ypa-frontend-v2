export async function DELETE({ request, fetch, params, url }) {
	const requestData = await request.json();
	const all = Boolean(url.searchParams.get('all')) === true ? '?all=true' : '';
	const response = await fetch(
		`/backend/alerts/${params.identifier}/delete_property_alert/${all}`,
		{
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(requestData)
		}
	);
	const data = await response.json();
	return new Response(JSON.stringify(data), {
		headers: { 'Content-Type': 'application/json' }
	});
}
