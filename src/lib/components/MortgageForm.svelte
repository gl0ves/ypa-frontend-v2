<script lang="ts">
	import FormLabel from './ui/form-label/FormLabel.svelte';
	import Input from './ui/input/input.svelte';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import YpaText from './ui/text/YpaText.svelte';
	import Button from './ui/button/button.svelte';
	import TermsAndConditions from './Policy/TermsAndConditions.svelte';

	let firstname = $state('');
	let lastname = $state('');
	let email = $state('');
	let phone = $state('');
	let message = $state('');
	let submitted = $state(false);

	const submitFormData = async () => {
		const formData = {
			properties: [
				{
					name: 'firstname',
					value: firstname,
					type: 'SYSTEM',
					field_type: 'TEXT'
				},
				{
					name: 'lastname',
					value: lastname,
					type: 'SYSTEM',
					field_type: 'TEXT'
				},
				{
					name: 'phone',
					value: phone,
					type: 'SYSTEM',
					field_type: 'PHONE'
				},
				{
					name: 'email',
					value: email,
					type: 'SYSTEM',
					field_type: 'TEXT'
				},
				{
					name: 'message',
					value: message,
					type: 'SYSTEM',
					field_type: 'TEXT'
				}
			],
			email: email,
			tags: [] as string[]
		};

		const response = await fetch('/api/forms', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});
		if (response.ok) {
			submitted = true;
		}
	};
</script>

<div class="bg-white shadow rounded-lg overflow-hidden w-full mx-auto p-4 sm:p-5">
	{#if submitted}
		<div class="text-center px-2">
			<YpaText weight="semibold" size="md">Thank you for your enquiry!</YpaText>
			<p class="text-sm text-gray-500 mt-2">We will get back to you as soon as possible.</p>
		</div>
		<div class="mt-4 px-2">
			<Button variant="default" class="w-full" onclick={() => (submitted = false)}>
				Submit another enquiry
			</Button>
		</div>
	{:else}
		<div class="mb-4 px-2">
			<YpaText weight="semibold" size="md">Interested? Let us know!</YpaText>
		</div>
		<div class="flex flex-col items-stretch gap-4">
			<div class="w-full space-y-3">
				<div>
					<FormLabel width="w-full" textColor="text-black" label="First Name">
						<Input bind:value={firstname} placeholder="First Name" class="w-full" />
					</FormLabel>
				</div>
				<div>
					<FormLabel width="w-full" textColor="text-black" label="Last Name">
						<Input bind:value={lastname} placeholder="Last Name" class="w-full" />
					</FormLabel>
				</div>
				<div>
					<FormLabel width="w-full" textColor="text-black" label="Email">
						<Input bind:value={email} placeholder="Email" class="w-full" />
					</FormLabel>
				</div>
				<div>
					<FormLabel width="w-full" textColor="text-black" label="Phone number incl. country code">
						<Input
							bind:value={phone}
							placeholder="Phone number incl. country code"
							class="w-full"
						/>
					</FormLabel>
				</div>
				<div>
					<FormLabel
						width="w-full"
						textColor="text-black"
						label="What would you like help with? (optional)"
					>
						<Textarea bind:value={message} placeholder="Message" class="w-full min-h-[100px]" />
					</FormLabel>
				</div>
			</div>
			<p>
				By clicking submit below, you consent to allow Your Property Abroad to store and process the
				information submitted above to provide you the services requested. You can view the terms
				and conditions&nbsp;of our service
				<TermsAndConditions>here</TermsAndConditions>.
			</p>
			<p>
				Your Property Abroad may store and process my contact information to help me find a
				property.
			</p>
			<div class="px-2 mt-2">
				<Button onclick={submitFormData} variant="default" class="w-full">Submit</Button>
			</div>
		</div>
	{/if}
</div>
