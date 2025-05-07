<script lang="ts">
	import FormLabel from './ui/form-label/FormLabel.svelte';
	import Input from './ui/input/input.svelte';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import YpaText from './ui/text/YpaText.svelte';
	import CheckboxWithLabel from './CheckboxWithLabel.svelte';
	import Button from './ui/button/button.svelte';

	let firstname = $state('');
	let lastname = $state('');
	let email = $state('');
	let phone = $state('');
	let message = $state('');
	let region = $state('');
	let reference = $state('');
	let newsletter = $state(false);
	let currency = $state(false);
	let mortgage = $state(false);
	let submitted = $state(false);

	const everythingIsFilledIn = $derived(() => {
		return firstname.length > 0 && lastname.length > 0 && email.length > 0 && phone.length > 0;
	});

	const submitFormData = async () => {
		const formData = {
			properties: [
				{
					name: 'name',
					value: firstname,
					type: 'SYSTEM',
					field_type: 'TEXT'
				},
				{
					name: 'last_name',
					value: lastname,
					type: 'SYSTEM',
					field_type: 'TEXT'
				},
				{
					name: 'country_area',
					value: region,
					type: 'CUSTOM',
					field_type: 'TEXT'
				},
				{
					name: 'phone_number',
					value: phone,
					type: 'SYSTEM',
					field_type: 'PHONE'
				},
				{
					name: 'eb_temp_field_hidden_field',
					value: 'property detail form',
					type: 'SYSTEM',
					field_type: 'TEXT'
				},
				{
					name: 'email',
					value: email,
					type: 'SYSTEM',
					field_type: 'TEXT'
				},
				{
					name: 'refno',
					value: reference,
					type: 'CUSTOM',
					field_type: 'TEXT'
				},
				{
					name: 'eb_temp_field_textfield',
					value: message,
					type: 'SYSTEM',
					field_type: 'TEXT',
					addAsNotes: true
				},
				{
					name: 'Lead status',
					displayName: 'Lead status',
					value: '["NEW Website"]'
				}
			],
			email: email,
			tags: [] as string[]
		};
		if (newsletter) formData.tags.push('Newsletter');
		if (currency) formData.tags.push('Currency');
		if (mortgage) formData.tags.push('Mortgage');
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

	const handleNewsletterChecked = (val: boolean) => {
		newsletter = val;
	};
	const handleCurrencyChecked = (val: boolean) => {
		currency = val;
	};
	const handleMortgageChecked = (val: boolean) => {
		mortgage = val;
	};
</script>

<div class="bg-white shadow rounded-lg overflow-hidden w-full mx-auto p-4 sm:p-5">
	{#if submitted}
		<div class="text-center px-2">
			<YpaText weight="semibold" size="md">Thank you for your enquiry!</YpaText>
			<p class="text-sm text-gray-500 mt-2">We will get back to you as soon as possible.</p>
		</div>
		<div class="mt-4 px-2">
			<Button variant="default" class="w-full" onclick={() => (submitted = false)}
				>Submit another enquiry</Button
			>
		</div>
	{:else}
		<div class="mb-4 px-2">
			<YpaText weight="semibold" size="md">Interested? Let us know!</YpaText>
		</div>
		<div class="flex flex-col items-stretch gap-4">
			<div class="w-full space-y-3">
				<div>
					<FormLabel required width="w-full" textColor="text-black" label="First Name">
						<Input required bind:value={firstname} placeholder="First Name" class="w-full" />
					</FormLabel>
				</div>
				<div>
					<FormLabel required width="w-full" textColor="text-black" label="Last Name">
						<Input required bind:value={lastname} placeholder="Last Name" class="w-full" />
					</FormLabel>
				</div>
				<div>
					<FormLabel required width="w-full" textColor="text-black" label="Email">
						<Input required bind:value={email} placeholder="Email" class="w-full" />
					</FormLabel>
				</div>
				<div>
					<FormLabel required width="w-full" textColor="text-black" label="Phone">
						<Input required bind:value={phone} placeholder="Phone" class="w-full" />
					</FormLabel>
				</div>
				<div>
					<FormLabel width="w-full" textColor="text-black" label="Message">
						<Textarea
							bind:value={message}
							placeholder="Message (optional)"
							class="w-full min-h-[100px]"
						/>
					</FormLabel>
				</div>
			</div>
			<div class="space-y-3 px-2">
				<CheckboxWithLabel
					handleChecked={handleNewsletterChecked}
					label="I agree to receive the newsletter from YourPropertyAbroad (optional)"
				/>
				<CheckboxWithLabel
					handleChecked={handleCurrencyChecked}
					label="I would also like to receive information on currency exchange (optional)"
				/>
				<CheckboxWithLabel
					handleChecked={handleMortgageChecked}
					label="I would also like information on Spanish mortgages (optional)"
				/>
			</div>
			<div class="px-2 mt-2">
				<Button
					disabled={!everythingIsFilledIn}
					onclick={submitFormData}
					variant="default"
					class="w-full">REQUEST MORE INFO</Button
				>
			</div>
		</div>
	{/if}
</div>
