<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import Search from '$lib/components/Search/Search.svelte';
</script>

<Navbar />
<div class="min-w-full bg-hero bg-cover bg-center p-4 md:p-12 mb-8 relative">
	<div class="absolute inset-0 bg-black opacity-50"></div>
	<div class="flex justify-center z-10 relative">
		<div class="w-full max-w-[1216px] text-center px-4">
			<h1 class="text-xl md:text-3xl font-bold text-white z-10 relative">
				FIND A PROPERTY FOR SALE IN SPAIN
			</h1>
			<Search />
		</div>
	</div>
</div>
<div class="w-full px-4 md:px-0 max-w-7xl mx-auto">
	<slot />
</div>
