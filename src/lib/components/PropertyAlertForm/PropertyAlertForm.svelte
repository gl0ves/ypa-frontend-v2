<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import TermsAndConditions from '../Policy/TermsAndConditions.svelte';
	import PropertyAlertFormContent from './PropertyAlertFormContent.svelte';
	import { savePropertyAlert } from '$lib/api';
	import { type AlertFormData } from '$lib/ypaTypes';

	export let defaultFormData: AlertFormData = {
		identifier: null,
		first_name: null,
		email: null,
		region: null,
		areas: [],
		bedrooms: 0,
		bathrooms: 0,
		price_max: null,
		type: '',
		frequency: 7
	};
	let formData: AlertFormData = defaultFormData;
	let formSubmitted = false;
	let formSubmissionFailed = false;

	const submitPropertyAlert = async () => {
		const response = await savePropertyAlert(formData);
		if (response.ok) {
			formSubmitted = true;
		} else {
			formSubmissionFailed = true;
		}
	};

	const handleFormDataUpdated = (e: CustomEvent) => {
		formData = { ...formData, ...e.detail };
	};
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}
		>CREATE PROPERTY ALERT</Dialog.Trigger
	>
	<form id="alert-form" method="POST">
		<Dialog.Content class="sm:max-w-[426px] max-h-[80vh] overflow-auto">
			<Dialog.Header>
				<Dialog.Title>CREATE PROPERTY ALERT</Dialog.Title>
				<Dialog.Description>
					{#if formSubmitted}
						Your property alert has been successfully created. If this is your first alert, please
						check your email to verify your email address.
					{:else if formSubmissionFailed}
						There was an error creating your property alert. Please try again later.
					{:else}
						Create an email alert to get notified as soon as you have a match. Our website is
						updated daily and you'll be the first to know when your dream property is up for sale.
					{/if}
				</Dialog.Description>
			</Dialog.Header>

			{#if !formSubmitted}
				<PropertyAlertFormContent {defaultFormData} on:formDataUpdated={handleFormDataUpdated} />
				<Dialog.Description>
					By clicking create below, you consent to allow Your Property Abroad to store and process
					the information submitted above to provide you the services requested. You can view the
					terms and conditions of our service <TermsAndConditions>here.</TermsAndConditions> Your Property
					Abroad may store and process my contact information to help me find a property.
				</Dialog.Description>
				<Dialog.Footer>
					<Button
						disabled={!formData.first_name || !formData.email}
						on:click={submitPropertyAlert}
						type="submit">CREATE</Button
					>
				</Dialog.Footer>
			{/if}
		</Dialog.Content>
	</form>
</Dialog.Root>
