<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import type { Snippet } from 'svelte';
	const { children }: { children: Snippet } = $props();
</script>

<Navbar />
<div class="w-full">
	{@render children?.()}
</div>
