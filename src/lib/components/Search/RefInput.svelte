<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import FormLabel from '../ui/form-label/FormLabel.svelte';
	import { debounce } from '$lib/utils';

	let {
		setRefValue,
		refValue,
		setParams,
		searchParams
	}: {
		setRefValue: (value: string) => void;
		refValue: string;
		setParams: (value: URLSearchParams) => void;
		searchParams: URLSearchParams;
	} = $props();

	const handleInputChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const params = new URLSearchParams(searchParams);
		params.delete('page');
		params.set('ref', target.value);
		setRefValue(target.value);
		setParams(params);
	};

	const debouncedInputChange = debounce(handleInputChange, 200);
</script>

<FormLabel label="Identifier" hideLabelOnMobile={true}>
	<Input
		value={refValue}
		oninput={debouncedInputChange}
		class="w-full"
		type="text"
		placeholder="Reference number"
	/>
</FormLabel>
