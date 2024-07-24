<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
</script>

<Navbar />
<div class="w-full px-4 md:px-0">
	<slot />
</div>
