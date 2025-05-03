<script lang="ts">
	import '../app.css';
	import '@fontsource/ubuntu/300.css';
	import '@fontsource/ubuntu/400.css';
	import '@fontsource/ubuntu/500.css';
	import '@fontsource/ubuntu/700.css';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import type { Snippet } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<link rel="icon" type="ico" href="https://cdn.yourpropertyabroad.com/static/favicon.ico" />
</svelte:head>

<div class="font-ubuntu">
	<Navbar />
	<div class="min-h-screen">
		{@render children?.()}
	</div>
	<Footer />
</div>
