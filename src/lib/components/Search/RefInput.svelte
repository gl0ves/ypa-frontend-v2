<script lang="ts">
	import { goto } from '$app/navigation';
	import { Input } from '$lib/components/ui/input';
	import FormLabel from '../ui/form-label/FormLabel.svelte';
	import { debounce } from '$lib/utils';
	import { page } from '$app/stores';

	let inputValue = $state('');
	const refParam = $derived($page.url.searchParams.get('ref'));

	$effect(() => {
		if (refParam) {
			inputValue = refParam;
		}
	});

	const handleInputChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		inputValue = target.value;
		const params = new URLSearchParams($page.url.searchParams);
		params.delete('page');
		if (inputValue === '') {
			params.delete('ref');
		} else {
			params.set('ref', inputValue);
		}
		goto(`?${params.toString()}`, { keepFocus: true });
	};

	const debouncedInputChange = debounce(handleInputChange, 200);
</script>

<FormLabel label="Identifier">
	<Input
		value={inputValue}
		on:input={debouncedInputChange}
		class="w-[250px]"
		type="text"
		placeholder="Search"
	/>
</FormLabel>
