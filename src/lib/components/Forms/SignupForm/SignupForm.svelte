<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { signupFormSchema, type SignupFormSchema } from './SignupFormSchema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import YpaText from '$lib/components/ui/text/YpaText.svelte';
	import { page } from '$app/state';

	let { data }: { data: { form: SuperValidated<Infer<SignupFormSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(signupFormSchema)
	});

	const { form: formData, enhance } = form;

	const success = $derived(() => page.url.searchParams.get('status') == 'success');
</script>

<Card.Root class="min-w-[360px] lg:w-[400px] ">
	<Card.Header>
		{#if success()}
			<Card.Title><YpaText size="md" weight="semibold">Success</YpaText></Card.Title>
		{:else}
			<Card.Title><YpaText size="md" weight="semibold">Sign up</YpaText></Card.Title>
			<Card.Description>
				Already have an account? <a class="text-primary underline" href="/login">Log in</a>
			</Card.Description>
		{/if}
	</Card.Header>
	<Card.Content>
		{#if success()}
			<YpaText size="sm">
				You have successfully signed up. Please check your email to verify your account.
			</YpaText>
		{:else}
			<form method="POST" use:enhance>
				<Form.Field class="pb-2" {form} name="firstName">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label><YpaText size="sm">First name</YpaText></Form.Label>
							<Input {...props} bind:value={$formData.firstName} />
						{/snippet}
					</Form.Control>
					<Form.Description>What should we call you?</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field class="pb-2" {form} name="email">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label><YpaText size="sm">Email</YpaText></Form.Label>
							<Input {...props} bind:value={$formData.email} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field class="pb-2" {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label><YpaText size="sm">Password</YpaText></Form.Label>
							<Input {...props} bind:value={$formData.password} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field class="pb-4" {form} name="passwordConfirmation">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label><YpaText size="sm">Confirm password</YpaText></Form.Label>
							<Input {...props} bind:value={$formData.passwordConfirmation} />
						{/snippet}
					</Form.Control>
					<Form.Description>Let's make sure it's correct.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button>Submit</Form.Button>
			</form>
		{/if}
	</Card.Content>
</Card.Root>
