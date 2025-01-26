<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import { browser } from '$app/environment';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';

	interface MapProps {
		region?: string;
		longitude?: number | null;
		latitude?: number | null;
		initialZoom?: number;
		style?: string;
		minZoom?: number;
		maxZoom?: number;
		interactive?: boolean;
	}

	const REGION_COORDINATES: Record<string, [string, string]> = {
		'Costa Cálida': ['38.030540', '-1.209820'],
		'Costa Almeria': ['38.072230', '-0.720350'],
		'Costa Blanca': ['38.497375', '-0.255483'],
		'Costa del Sol': ['36.797045', '-2.583601'],
		Lanzarote: ['29.035000', '-13.633000'],
		Mallorca: ['39.571625', '2.650544'],
		Menorca: ['39.949631', '4.110445'],
		Tenerife: ['28.291565', '-16.629129'],
		'Gran Canaria': ['28.124830', '-15.430020'],
		Ibiza: ['39.020012', '1.482148']
	};

	let {
		region,
		longitude,
		latitude,
		initialZoom = 12,
		style = 'mapbox://styles/mapbox/streets-v11',
		minZoom = 0,
		maxZoom = 20,
		interactive = true
	}: MapProps = $props();

	let mapContainer: HTMLDivElement;
	let map = $state<mapboxgl.Map | null>(null);
	let isLoading = $state(true);
	let error = $state<string | null>(null);
	let isMapInteractive = $state(false);

	const lat = $derived(() => {
		if (latitude !== null && latitude !== undefined) {
			return latitude;
		}
		return region ? parseFloat(REGION_COORDINATES[region][0]) : null;
	});

	const lng = $derived(() => {
		if (longitude !== null && longitude !== undefined) {
			return longitude;
		}
		return region ? parseFloat(REGION_COORDINATES[region][1]) : null;
	});

	let zoom = $state(initialZoom);
	let moveTimeout: number;

	function debouncedUpdateData() {
		clearTimeout(moveTimeout);
		moveTimeout = setTimeout(() => {
			if (!map) return;
			const currentZoom = map.getZoom();
			zoom = currentZoom;
		}, 100) as unknown as number;
	}

	function addCircleOverlay(map: mapboxgl.Map, coordinates: [number, number]) {
		map.addSource('source_circle_500', {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry: {
							type: 'Point',
							coordinates: coordinates
						},
						properties: {}
					}
				]
			}
		});

		map.addLayer({
			id: 'circle500',
			type: 'circle',
			source: 'source_circle_500',
			paint: {
				'circle-radius': {
					stops: [
						[2, 1],
						[15, 512]
					],
					base: 2.5
				},
				'circle-color': '#fca311',
				'circle-opacity': 0.2
			}
		});
	}

	function toggleMapInteraction() {
		if (!map) return;
		isMapInteractive = !isMapInteractive;

		if (isMapInteractive) {
			map.scrollZoom.enable();
			map.boxZoom.enable();
			map.dragPan.enable();
			map.dragRotate.enable();
			map.keyboard.enable();
			map.doubleClickZoom.enable();
			map.touchZoomRotate.enable();
		} else {
			map.scrollZoom.disable();
			map.boxZoom.disable();
			map.dragPan.disable();
			map.dragRotate.disable();
			map.keyboard.disable();
			map.doubleClickZoom.disable();
			map.touchZoomRotate.disable();
		}
	}

	function initializeMap() {
		if (!browser || !mapContainer || !PUBLIC_MAPBOX_TOKEN) {
			error = 'Unable to initialize map: Missing required dependencies';
			return;
		}

		const currentLat = lat();
		const currentLng = lng();

		if (currentLat === null || currentLng === null) {
			error = 'Unable to initialize map: Invalid coordinates';
			return;
		}

		try {
			const mapOptions: mapboxgl.MapOptions = {
				container: mapContainer,
				accessToken: PUBLIC_MAPBOX_TOKEN,
				style,
				center: [currentLng, currentLat],
				zoom: initialZoom,
				minZoom,
				maxZoom,
				interactive,
				attributionControl: true
			};

			map = new mapboxgl.Map(mapOptions);

			// Disable all interactions by default
			map.scrollZoom.disable();
			map.boxZoom.disable();
			map.dragPan.disable();
			map.dragRotate.disable();
			map.keyboard.disable();
			map.doubleClickZoom.disable();
			map.touchZoomRotate.disable();

			map.addControl(new mapboxgl.NavigationControl(), 'top-right');
			map.addControl(new mapboxgl.FullscreenControl());

			map.on('load', () => {
				isLoading = false;

				if (latitude !== null && longitude !== null) {
					if (!map) return;
					addCircleOverlay(map, [currentLng, currentLat]);
				}
			});

			map.on('error', (e) => {
				error = `Map error: ${e.error.message}`;
			});

			map.on('move', debouncedUpdateData);
		} catch (e) {
			error = `Failed to initialize map: ${e instanceof Error ? e.message : 'Unknown error'}`;
			isLoading = false;
		}
	}

	onMount(() => {
		initializeMap();
	});

	onDestroy(() => {
		clearTimeout(moveTimeout);
		map?.remove();
	});

	$effect(() => {
		const currentLat = lat();
		const currentLng = lng();
		if (currentLat && currentLng && map) {
			map.setCenter([currentLng, currentLat]);
		}
	});
</script>

<div class="map-container">
	{#if error}
		<div class="error-message" role="alert">
			{error}
		</div>
	{/if}

	{#if isLoading}
		<div class="loading-overlay" role="status">
			<span class="loading-text">Loading map...</span>
		</div>
	{/if}

	<div class="map-wrap">
		<div class="map" bind:this={mapContainer}></div>
		<button
			class="map-overlay"
			class:active={isMapInteractive}
			onclick={toggleMapInteraction}
			type="button"
			aria-label={isMapInteractive ? 'Disable map interaction' : 'Enable map interaction'}
		>
			<span class="overlay-text">
				{isMapInteractive ? 'Click to disable map interaction' : 'Click to enable map interaction'}
			</span>
		</button>
	</div>
</div>

<style>
	.map-container {
		position: relative;
		width: 100%;
		height: 500px;
	}

	.map-wrap {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.map {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.map-overlay {
		position: absolute;
		inset: 0;
		background: transparent;
		border: none;
		width: 100%;
		height: 100%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.2s ease;
		z-index: 1;
	}

	.map-overlay:hover {
		background-color: rgb(0 0 0 / 5%);
	}

	.map-overlay.active {
		display: none;
	}

	.overlay-text {
		background-color: rgb(255 255 255 / 90%);
		padding: 8px 16px;
		border-radius: 4px;
		font-size: 14px;
		color: #374151;
		box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
		pointer-events: none;
	}

	.loading-overlay {
		position: absolute;
		inset: 0;
		background-color: rgb(255 255 255 / 80%);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
	}

	.loading-text {
		background-color: rgb(35 55 75 / 90%);
		color: #fff;
		padding: 8px 16px;
		border-radius: 4px;
		font-size: 14px;
	}

	.error-message {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: rgb(220 38 38 / 90%);
		color: white;
		padding: 12px 24px;
		border-radius: 4px;
		z-index: 2;
		text-align: center;
		max-width: 80%;
	}
</style>
