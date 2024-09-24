export async function POST({ request, fetch }) {
	const requestData = await request.json();
	const response = await fetch(`/backend/alerts/null/create_property_alert/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(requestData)
	});
	const data = await response.json();
	return new Response(JSON.stringify(data), {
		headers: { 'Content-Type': 'application/json' }
	});
}
