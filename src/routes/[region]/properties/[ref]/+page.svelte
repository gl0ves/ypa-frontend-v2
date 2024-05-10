<script lang="ts">
	import type { Listing } from '$lib/ypaTypes';
	import Carousel from '$lib/components/ui/carousel/carousel.svelte';
	export let data: { listings: Listing[] };

	let currentIndex = 0;
	let currentListing = data.listings[currentIndex];
</script>

{#if currentListing}
	<Carousel propValue={currentListing} />
{/if}

<style lang="scss">
	.row {
		display: flex;
		justify-content: space-evenly;
		font-size: 32px;
		margin-bottom: 0.7em;
		&--first {
			margin-top: 1em;
		}
	}

	.bed-and-bath {
		display: flex;

		align-items: center;
		font-size: 32px;
		.icon {
			display: flex;
			align-items: center;
			margin-left: 0.5rem;
		}
	}

	.row {
		display: flex;
		justify-content: space-evenly;
	}
	.button {
		margin-top: 1em;
		display: inline-block;
		font-size: 0.5em;
		font-weight: 600;
		padding: 0.5em 2em;
		color: #ffffff;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		outline: none;
		position: relative;
		overflow: hidden;
		transition: all 0.7s ease;
		background-position: center;
		background-size: 150% 150%;

		/* Default button styles */
		background-color: #f44336; /* softer red */
		box-shadow: 0 5px #b71c1c; /* darker red for shadow */
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

		&:hover {
			background: radial-gradient(circle, #f44336 0%, #f44336 50%, transparent 50%);
		}

		/* Styles for the --higher variant */
		&--higher {
			background-color: #8bc34a; /* softer green */
			box-shadow: 0 5px #558b2f; /* darker green for shadow */

			&:hover {
				background: radial-gradient(circle, #8bc34a 0%, #8bc34a 50%, transparent 50%);
			}
		}
	}

	.button:active {
		box-shadow: 0 2px #990052;
		transform: translateY(3px);
	}

	.button:before {
		content: '';
		background: rgba(255, 255, 255, 0.5);
		width: 0;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transition: all 0.7s ease;
	}

	.button:hover:before {
		width: 100%;
	}
</style>
