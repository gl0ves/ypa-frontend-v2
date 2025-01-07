<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import type { Snippet } from 'svelte';
	const { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<link rel="icon" type="ico" href="https://cdn.yourpropertyabroad.com/static/favicon.ico" />
</svelte:head>

<Navbar />
{@render children?.()}
