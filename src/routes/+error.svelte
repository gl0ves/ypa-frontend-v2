<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import YpaText from '$lib/components/ui/text/YpaText.svelte';
	import YpaTitle from '$lib/components/ui/text/YpaTitle.svelte';
	import { goto } from '$app/navigation';

	$: status = $page.status;
	$: message = $page.error?.message || 'An error occurred';

	const goToSearch = () => {
		goto('/');
	};
</script>

<svelte:head>
	<title>{status} - Your Property Abroad</title>
</svelte:head>

<div class="min-h-screen w-full relative flex items-center justify-center p-4">
	<!-- Hero Background Image -->
	<img
		src="https://cdn.yourpropertyabroad.com/static/banner.jpg"
		alt="Your Property Abroad Banner"
		class="absolute inset-0 w-full h-full object-cover z-0"
		fetchpriority="high"
		decoding="async"
		aria-hidden="true"
		draggable="false"
	/>
	
	<!-- Dark Overlay -->
	<div class="absolute inset-0 bg-black opacity-60 z-10"></div>
	
	<!-- Content -->
	<div class="relative z-50 text-center max-w-2xl mx-auto px-4">
		<div class="text-6xl md:text-8xl font-bold text-white mb-6">
			<YpaText size="lg" color="white" weight="bold" class="text-6xl md:text-8xl">
				{status}
			</YpaText>
		</div>
		
		<div class="mb-8">
			{#if status === 404}
				<YpaText size="md" color="white" weight="normal" class="text-xl md:text-2xl leading-relaxed">
					Oops, sorry this page doesn't seem to exist anymore.<br>
					If you clicked on a property, it has probably just been snatched up by another buyer!<br><br>
					Let us know what you're looking for by Whatsapping us at 
					<a href="https://wa.me/31618472480" class="text-tertiary hover:text-tertiary/80 underline font-semibold" target="_blank" rel="noopener noreferrer">
						+31618472480
					</a>.
				</YpaText>
			{:else}
				<YpaText size="lg" color="white" weight="normal" class="text-xl md:text-2xl leading-relaxed">
					{message}
				</YpaText>
			{/if}
		</div>
		
		<Button 
			variant="tertiary" 
			size="lg" 
			class="text-lg px-8 py-4 font-semibold"
			onclick={goToSearch}
		>
			BACK TO SEARCH
		</Button>
	</div>
</div> 