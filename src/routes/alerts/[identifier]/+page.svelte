<script lang="ts">
	import PropertyAlertFormContent from '$lib/components/PropertyAlertForm/PropertyAlertFormContent.svelte';
	import { page } from '$app/stores';
	import {type AlertFormData} from '$lib/ypaTypes';

	let formData: AlertFormData = $page.data.alert

	const handleFormDataUpdated = (e: CustomEvent) => {
		formData = { ...formData, ...e.detail };
	};

</script>

<div class="flex flex-col items-center justify-center h-full py-5">
	<PropertyAlertFormContent defaultFormData={formData} on:formDataUpdated={handleFormDataUpdated}/>
</div>
