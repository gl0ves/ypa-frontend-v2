<script lang="ts">
	import PropertyAlertFormContent from '$lib/components/PropertyAlertForm/PropertyAlertFormContent.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { page } from '$app/state';
	import { type AlertFormData } from '$lib/ypaTypes';
	import { deletePropertyAlert, updatePropertyAlert } from '$lib/api';
	import { type Options } from '$lib/data/options';

	const identifier = page.params.identifier;

	let formData: AlertFormData = $state(page.data.alert);
	let options: Options = page.data.options;
	let formSubmitted = $state(false);
	let formSubmissionFailed = $state(false);

	// TODO: Add a deleted / updated state

	const handleFormDataUpdated = (data: AlertFormData) => {
		console.log('UPDATED');
		if (!data) return;
		formData = { ...formData, ...data };
	};

	const update = async () => {
		if (!formData) return;
		formData.identifier = identifier;
		const response = await updatePropertyAlert(identifier, formData);
		if (response.status === 202) {
			return (formSubmitted = true);
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

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-3xl mx-auto">
		<div class="bg-white shadow-lg rounded-lg overflow-hidden">
			<div class="px-6 py-8">
				<h1 class="text-3xl font-bold text-primary text-center mb-4">Update your alert</h1>

				{#if page.data.status === 404}
					<div class="text-center py-6">
						<div class="text-primary text-xl font-medium mb-2">Alert Not Found</div>
						<p class="text-gray-600">
							The alert you're looking for doesn't exist or has been removed.
						</p>
					</div>
				{:else if formSubmissionFailed}
					<div class="text-center py-6">
						<div class="text-primary text-xl font-medium mb-2">Update Failed</div>
						<p class="text-gray-600">
							An error occurred while updating your alert. Please try again.
						</p>
					</div>
				{:else if formSubmitted}
					<div class="text-center py-6">
						<div class="text-primary text-xl font-medium mb-2">Success!</div>
						<p class="text-gray-600">Your alert has been updated successfully.</p>
					</div>
				{:else if formData}
					<div class="space-y-6">
						<PropertyAlertFormContent
							{options}
							{formData}
							handleFormDataUpdated={(data) => handleFormDataUpdated(data)}
						/>
						<div class="flex flex-col space-y-4 pt-6 border-t border-gray-200">
							<Button
								class="w-full"
								disabled={!formData?.first_name}
								onclick={update}
								type="submit"
							>
								Save Changes
							</Button>
							<div class="flex flex-col space-y-2">
								<Button
									class="w-full"
									variant="destructive"
									onclick={() => handleDeletePropertyAlert()}
									type="submit"
								>
									Delete This Alert
								</Button>
								<Button
									class="w-full"
									variant="destructive"
									onclick={() => handleDeletePropertyAlert(true)}
									type="submit"
								>
									Delete All Alerts
								</Button>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
