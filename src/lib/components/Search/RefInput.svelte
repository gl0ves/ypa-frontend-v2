<script lang="ts">
	import { goto } from '$app/navigation';
	import { Input } from '$lib/components/ui/input';
	import InputWithLabel from './InputWithLabel.svelte';
	import { debounce } from '$lib/utils';

	const handleInputChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const value = target.value;
		const params = new URLSearchParams(window.location.search);
		params.delete('page');
		if (value === '') params.delete('ref');
		else params.set('ref', value);
		goto(`?${params.toString()}`, { keepFocus: true });
	};

	const debouncedInputChange = debounce(handleInputChange, 500);
</script>

<InputWithLabel label="Identifier">
	<Input on:input={debouncedInputChange} class="w-[250px]" type="text" placeholder="Search" />
</InputWithLabel>
