<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
</script>

<Navbar />
<div class="w-full">
	<slot />
</div>
