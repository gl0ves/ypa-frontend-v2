<script lang="ts">
	import { Slider } from '$lib/components/ui/slider';
	import FormLabel from '../ui/form-label/FormLabel.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	const MIN = 0;
	const MAX = 1000000;
	const STEP = 25000;

	const minPrice = $derived(() => parseInt(page.url.searchParams.get('min_price') || '0'));
	const maxPrice = $derived(() => parseInt(page.url.searchParams.get('max_price') || '1000000'));

	let debounceTimeout: number;

	const updateValues = (values: number[]) => {
		clearTimeout(debounceTimeout);

		debounceTimeout = setTimeout(() => {
			const [min, max] = values;
			const params = new URLSearchParams(page.url.searchParams);

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
		<Slider
			value={[minPrice(), maxPrice()]}
			min={MIN}
			max={MAX}
			step={STEP}
			onValueChange={updateValues}
		/>
	</FormLabel>
	<div class="flex justify-between text-md text-white">
		<span>€{new Intl.NumberFormat('en-US').format(minPrice())}</span>
		<span>
			€{new Intl.NumberFormat('en-US').format(maxPrice())}
			{maxPrice() >= MAX ? '+' : ''}
		</span>
	</div>
</div>
