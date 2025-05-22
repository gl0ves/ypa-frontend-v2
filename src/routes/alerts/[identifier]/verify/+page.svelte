<script lang="ts">
	import { page } from '$app/state';
	import { verifyPropertyAlert } from '$lib/api';
	import { type AlertFormData } from '$lib/ypaTypes';
	import { onMount } from 'svelte';

	const identifier = page.params.identifier;
	let formData: AlertFormData = $state(page.data.alert);
	let verificationSuccess = $state(false);
	let verificationFailed = $state(false);
	let alreadyVerified = $state(false);

	async function verifyAlert() {
		if (!formData) return (verificationFailed = true);
		if (formData.verified) {
			alreadyVerified = true;
			return;
		}
		formData.verified = true;
		try {
			const data = { verified: formData.verified };
			const response = await verifyPropertyAlert(identifier, data);
			if (response.status === 200) {
				verificationSuccess = true;
			} else {
				verificationFailed = true;
			}
		} catch (e) {
			verificationFailed = true;
		}
	}

	onMount(() => {
		verifyAlert();
	});
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-3xl mx-auto">
		<div class="bg-white shadow-lg rounded-lg overflow-hidden">
			<div class="px-6 py-8">
				<h1 class="text-3xl font-bold text-primary text-center mb-4">Verify your email</h1>

				{#if alreadyVerified}
					<div class="text-center py-6">
						<div class="text-primary text-xl font-medium mb-2">Already Verified</div>
						<p class="text-gray-600">Your email is already verified.</p>
					</div>
				{:else if verificationSuccess}
					<div class="text-center py-6">
						<div class="text-primary text-xl font-medium mb-2">Success!</div>
						<p class="text-gray-600">Your email has been verified successfully.</p>
					</div>
				{:else if verificationFailed}
					<div class="text-center py-6">
						<div class="text-primary text-xl font-medium mb-2">Verification Failed</div>
						<p class="text-gray-600">Verification failed. The alert was not found.</p>
					</div>
				{:else}
					<div class="text-center py-6">
						<div class="text-primary text-xl font-medium mb-2">Verifying...</div>
						<p class="text-gray-600">Please wait while we verify your email.</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
