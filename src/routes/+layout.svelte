<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if ((!document as any).startViewTransition) return;

		return new Promise((resolve) => {
			(document as any).startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<Navbar />

<div class="max-w-7xl mx-auto">
	<slot />
</div>
