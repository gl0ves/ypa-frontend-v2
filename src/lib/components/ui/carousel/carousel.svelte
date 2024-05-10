<script lang="ts">
	import type { Listing } from '$lib/ypaTypes';
	import type { EmblaCarouselType } from 'embla-carousel';
	import EmblaCarousel from 'embla-carousel-svelte';
	export let propValue: Listing;

	let selectedIndex = 0;
	let emblaApi: EmblaCarouselType;
	let thumbsApi: EmblaCarouselType;

	function onInit(event: CustomEvent): void {
		emblaApi = event.detail;
		emblaApi.on('scroll', setIndex);
	}

	function onThumbsInit(event: CustomEvent) {
		thumbsApi = event.detail;
		thumbsApi.on('scroll', setIndex);
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
	<div use:EmblaCarousel on:emblaInit={onInit} on:scroll={setIndex} class="embla__viewport">
		<div class="embla__container">
			{#each propValue.images as image, i}
				<div class="embla__slide">
					<img class="embla__slide__img" src={image} alt="Real estate" />
				</div>
			{/each}
		</div>
	</div>
</div>

<div class="embla-thumbs">
	<div use:EmblaCarousel on:emblaInit={onThumbsInit} class="embla-thumbs__viewport">
		<div class="embla-thumbs__container">
			{#each propValue.thumbnails as image, i}
				<div class="embla-thumbs__slide" class:embla-thumbs__slide--selected={i === selectedIndex}>
					<button class="embla-thumbs__slide__button" type="button" on:click={() => scrollTo(i)}>
						<img class="embla-thumbs__slide__img" src={image} alt="Real estate thumbnail" />
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.embla {
		--slide-spacing: 0rem;
		--slide-size: 100%;
		--slide-height: 19rem;
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
		flex: 0 0 var(--slide-size);
		min-width: 0;
		padding-left: var(--slide-spacing);
		position: relative;
	}
	.embla__slide__img {
		display: block;
		height: var(--slide-height);
		width: 100%;
		object-fit: cover;
	}
	.embla-thumbs {
		--thumbs-slide-spacing: 0.2rem;
		--thumbs-slide-height: 5rem;
		margin-top: var(--thumbs-slide-spacing);
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
		flex: 0 0 40%;
		min-width: 0;
		padding-left: var(--thumbs-slide-spacing);
		position: relative;
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
		opacity: 0.2;
		transition: opacity 0.2s;
	}
	.embla-thumbs__slide--selected .embla-thumbs__slide__button {
		opacity: 1;
	}
	.embla-thumbs__slide__img {
		display: block;
		height: var(--thumbs-slide-height);
		width: 100%;
		object-fit: cover;
	}
</style>
