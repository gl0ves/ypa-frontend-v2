<script lang="ts">
	import { Slider } from '$lib/components/ui/slider';
	import FormLabel from '../ui/form-label/FormLabel.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const MIN = 0;
	const MAX = 1000000;
	const STEP = 25000;

	let sliderValues: [number, number];

	$: {
		const minPrice = Number($page.url.searchParams.get('min_price')) || MIN;
		const maxPrice = Number($page.url.searchParams.get('max_price')) || MAX;
		sliderValues = [minPrice, maxPrice];
	}

	let debounceTimeout: number;

	const updateValues = (values: number[]) => {
		clearTimeout(debounceTimeout);

		debounceTimeout = setTimeout(() => {
			const [min, max] = values;
			const params = new URLSearchParams($page.url.searchParams);

			params.delete('page');
			if (min === MIN) params.delete('min_price');
			else params.set('min_price', min.toString());

			if (max === MAX) params.delete('max_price');
			else params.set('max_price', max.toString());

			goto(`?${params.toString()}`);
		}, 200);
	};
</script>

<div class="text-left w-[600px] min-w-[200px]">
	<FormLabel label="Price">
		<Slider value={sliderValues} min={MIN} max={MAX} step={STEP} onValueChange={updateValues} />
	</FormLabel>
	<div class="flex justify-between text-md text-white">
		<span>€{new Intl.NumberFormat('en-US').format(sliderValues[0])}</span>
		<span>
			€{new Intl.NumberFormat('en-US').format(sliderValues[1])}
			{sliderValues[1] >= MAX ? '+' : ''}
		</span>
	</div>
</div>
