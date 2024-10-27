<script lang="ts">
	import PropertyAlertFormContent from '$lib/components/PropertyAlertForm/PropertyAlertFormContent.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { page } from '$app/stores';
	import { type AlertFormData } from '$lib/ypaTypes';
	import { deletePropertyAlert, savePropertyAlert } from '$lib/api';
	import { onMount } from 'svelte';
	import { type Options } from '$lib/data/options';

	const identifier = $page.params.identifier;

	let formData: AlertFormData = $state($page.data.alert);
	let options: Options = $page.data.options;
	let formSubmitted = $state(false);
	let formSubmissionFailed = $state(false);
	let alertVerified = $state(false);

	onMount(() => {
		if (!formData.verified) {
			formData.verified = true;
		}
		update();
	});

	const handleFormDataUpdated = (e: CustomEvent) => {
		formData = { ...formData, ...e.detail };
	};

	const update = async () => {
		formData.identifier = identifier;
		const response = await savePropertyAlert(formData);
		const data = await response.json();
		if (response.status === 200 && alertVerified) {
			return (formSubmitted = true);
		}
		if (response.status === 200 && !alertVerified) {
			return (alertVerified = true);
		}
		return (formSubmissionFailed = true);
	};

	const handleDeletePropertyAlert = async (all = false) => {
		const response = await deletePropertyAlert(identifier, all);
		if (response.ok) {
			formSubmitted = true;
		} else {
			formSubmissionFailed = true;
		}
	};
</script>

<div class="flex flex-col items-center justify-center h-full py-5">
	<h1 class="text-primary flex font-semibold text-3xl pb-5">Update your alert</h1>
	{#if formSubmissionFailed}
		<p class="text-primary text-lg">An error occurred while updating your alert</p>
	{/if}
	{#if formSubmitted}
		<p class="text-primary text-lg">Your alert has been updated successfully</p>
	{/if}
	{#if alertVerified}
		<p class="text-primary text-lg">Your email has been verified!</p>
	{/if}
	{#if !formSubmitted}
		<!-- Maybe pass defaults here anyways -->
		<PropertyAlertFormContent {options} on:formDataUpdated={handleFormDataUpdated} />
		<div class="grid gap-2 pt-5">
			<Button disabled={!formData.first_name} on:click={update} type="submit">SAVE</Button>

			<Button variant="destructive" on:click={() => handleDeletePropertyAlert()} type="submit"
				>DELETE ALERT</Button
			>

			<Button variant="destructive" on:click={() => handleDeletePropertyAlert(true)} type="submit"
				>DELETE ALL ALERTS</Button
			>
		</div>
	{/if}
</div>
