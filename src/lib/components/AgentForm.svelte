<script lang="ts">
	import FormLabel from './ui/form-label/FormLabel.svelte';
	import Input from './ui/input/input.svelte';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import YpaText from './ui/text/YpaText.svelte';
	import CheckboxWithLabel from './CheckboxWithLabel.svelte';
	import Button from './ui/button/button.svelte';

	let companyName = $state('');
	let firstname = $state('');
	let lastname = $state('');
	let cityAndRegion = $state('');
	let website = $state('');
	let email = $state('');
	let phone = $state('');
	let message = $state('');
	let reference = $state('');
	let submitted = $state(false);

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
			<Button variant="default" class="w-full" onclick={() => (submitted = false)}
				>Submit another enquiry</Button
			>
		</div>
	{:else}
		<div class="mb-4 px-2">
			<YpaText weight="semibold" size="md">
				Advertise Your Listings on YourPropertyAbroad.com!</YpaText
			>
			<p class="text-sm text-gray-500 mt-2">
				Interested in listing your properties with us? Fill in the form below to get more
				information. Note: only for real estate agents. If you are a private seller, contact us via
				Whatsapp or email.
			</p>
		</div>
		<div class="flex flex-col items-stretch gap-4">
			<div class="w-full space-y-3">
				<div>
					<FormLabel width="w-full" textColor="text-black" label="Company name">
						<Input required bind:value={companyName} placeholder="Company name" class="w-full" />
					</FormLabel>
				</div>
				<div>
					<FormLabel width="w-full" textColor="text-black" label="First Name">
						<Input required bind:value={firstname} placeholder="First Name" class="w-full" />
					</FormLabel>
				</div>
				<div>
					<FormLabel width="w-full" textColor="text-black" label="Last Name">
						<Input required bind:value={lastname} placeholder="Last Name" class="w-full" />
					</FormLabel>
				</div>
				<div>
					<FormLabel width="w-full" textColor="text-black" label="Website">
						<Input required bind:value={website} placeholder="Website" class="w-full" />
					</FormLabel>
				</div>
				<div>
					<FormLabel
						width="w-full"
						textColor="text-black"
						label="In what city and region are you based?"
					>
						<Input
							required
							bind:value={cityAndRegion}
							placeholder="Amsterdam, Netherlands"
							class="w-full"
						/>
					</FormLabel>
				</div>
				<div>
					<FormLabel width="w-full" textColor="text-black" label="Email">
						<Input required bind:value={email} placeholder="Email" class="w-full" />
					</FormLabel>
				</div>
				<div>
					<FormLabel width="w-full" textColor="text-black" label="Phone number incl. country code">
						<Input required bind:value={phone} placeholder="+31 6 18 47 24 80" class="w-full" />
					</FormLabel>
				</div>
				<div>
					<FormLabel width="w-full" textColor="text-black" label="Additional notes">
						<Textarea
							bind:value={message}
							required={false}
							placeholder="Message"
							class="w-full min-h-[100px]"
						/>
					</FormLabel>
				</div>
			</div>
			<div class="px-2 mt-2">
				<Button onclick={submitFormData} variant="default" class="w-full">Submit</Button>
			</div>
		</div>
	{/if}
</div>
