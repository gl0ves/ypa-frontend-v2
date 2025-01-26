<script lang="ts">
	import type { ListingDetails } from '$lib/ypaTypes';
	import type { EmblaCarouselType } from 'embla-carousel';
	import EmblaCarousel from 'embla-carousel-svelte';
	let { listing }: { listing: ListingDetails } = $props();
	const { originals, thumbnails } = $derived(listing.images);
	let selectedIndex = $state(0);
	let emblaApi: EmblaCarouselType;
	let thumbsApi: EmblaCarouselType;
	function onInit(event: CustomEvent): void {
		emblaApi = event.detail;
		emblaApi.on('select', setIndex);
	}
	function onThumbsInit(event: CustomEvent) {
		thumbsApi = event.detail;
	}
	function scrollTo(index: number) {
		selectedIndex = index;
		emblaApi.scrollTo(index);
		thumbsApi.scrollTo(index);
	}
	function setIndex() {
		selectedIndex = emblaApi.selectedScrollSnap();
	}
</script>

<div class="embla">
	<div use:EmblaCarousel onemblaInit={onInit} class="embla__viewport">
		<div class="embla__container">
			{#each originals as image, i}
				<div class="embla__slide">
					<button class="embla-thumbs__slide__button" type="button" onclick={() => scrollTo(i)}>
						<img class="embla__slide__img" src={image} alt="Real estate" />
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>

<div class="embla-thumbs">
	<div use:EmblaCarousel onemblaInit={onThumbsInit} class="embla-thumbs__viewport">
		<div class="embla-thumbs__container">
			{#each thumbnails as image, i}
				<div class="embla-thumbs__slide" class:embla-thumbs__slide--selected={i === selectedIndex}>
					<button class="embla-thumbs__slide__button" type="button" onclick={() => scrollTo(i)}>
						<img class="embla-thumbs__slide__img" src={image} alt="Real estate thumbnail" />
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.embla {
		--slide-spacing: 0.5rem;
		--slide-height: 400px;
	}
	.embla__viewport {
		overflow: hidden;
	}
	.embla__container {
		backface-visibility: hidden;
		display: flex;
		touch-action: pan-y;
		margin-left: calc(var(--slide-spacing) * -1);
	}
	.embla__slide {
		flex: 0 0 auto;
		min-width: 0;
		padding-left: var(--slide-spacing);
		position: relative;
		transition: opacity 0.2s ease-in-out;
	}
	.embla__slide__img {
		display: block;
		max-height: var(--slide-height);
		width: auto;
		object-fit: cover;
	}
	.embla-thumbs {
		--thumbs-slide-spacing: 0.5rem;
		--thumbs-slide-size: 7rem;
		margin-top: 0.1rem;
	}
	.embla-thumbs__viewport {
		overflow: hidden;
	}
	.embla-thumbs__container {
		display: flex;
		flex-direction: row;
		margin-left: calc(var(--thumbs-slide-spacing) * -1);
	}
	.embla-thumbs__slide {
		flex: 0 0 50%;
		min-width: 0;
		padding-left: var(--thumbs-slide-spacing);
		position: relative;
		opacity: 0.5;
		transition: opacity 0.2s ease-in-out;
		&.embla-thumbs__slide--selected {
			opacity: 1;
		}
	}
	@media (min-width: 576px) {
		.embla-thumbs__slide {
			flex: 0 0 18%;
		}
	}
	.embla-thumbs__slide__button {
		appearance: none;
		-webkit-appearance: none;
		background-color: transparent;
		touch-action: manipulation;
		display: block;
		text-decoration: none;
		cursor: pointer;
		border: 0;
		padding: 0;
		margin: 0;
		width: 100%;
		height: var(--thumbs-slide-size);
	}
	.embla-thumbs__slide--selected .embla-thumbs__slide__button {
		opacity: 1;
	}
	.embla-thumbs__slide__img {
		display: block;
		height: var(--thumbs-slide-size);
		width: 100%;
		object-fit: cover;
	}
</style>
