<script lang="ts">
	import { Slider } from '$lib/components/ui/slider';
	import InputWithLabel from './InputWithLabel.svelte';
	import { goto } from '$app/navigation';

	let min = 0;
	let max = 1000000;
	let step = 25000;
	let sliderValues = { min: min, max: max };

	// Reactive statement to update sliderValues when min or max changes
	$: sliderValues = { min, max };

	// Ensure the sliderValues object updates when the slider's value changes
	const updateValues = (values: number[]) => {
		sliderValues.min = values[0];
		sliderValues.max = values[1];

		const params = new URLSearchParams(window.location.search);
		params.delete('page');
		if (sliderValues.min === 0) params.delete('min_price');
		if (sliderValues.max === 1000000) params.delete('max_price');
		if (sliderValues.min > 0) params.set('min_price', values[0].toString());
		if (sliderValues.max < 1000000) params.set('max_price', values[1].toString());
		goto(`?${params.toString()}`);
	};
</script>

<div class="text-left w-[600px] min-w-[200px]">
	<InputWithLabel label="Price">
		<Slider
			value={[sliderValues.min, sliderValues.max]}
			{min}
			{max}
			{step}
			onValueChange={updateValues}
		/>
	</InputWithLabel>
	<div class="flex justify-between text-lg text-white">
		<span>€{new Intl.NumberFormat('en-US').format(sliderValues.min)}</span>
		<span
			>€{new Intl.NumberFormat('en-US').format(sliderValues.max)}{sliderValues.max >= 1000000
				? '+'
				: ''}</span
		>
	</div>
</div>
