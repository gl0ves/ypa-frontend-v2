<script lang="ts">
	import ListingPage from '$lib/components/ListingPage/ListingPage.svelte';
	import Search from '$lib/components/Search/Search.svelte';

	let { data } = $props();

	const scrollToListings = () => {
		const listingsContainer = document.getElementById('listings-container');
		if (listingsContainer) {
			const isMobile = window.matchMedia('(max-width: 768px)').matches;
			const headerOffset = isMobile ? 35 : 170; // Half the offset on mobile
			const elementPosition = listingsContainer.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		}
	};

	const searchTriggered = () => {
		scrollToListings();
	};
</script>

<Search {searchTriggered} {data} />
<ListingPage {data} />
