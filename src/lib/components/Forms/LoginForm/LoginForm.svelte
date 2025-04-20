<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { loginFormSchema, type LoginFormSchema } from './LoginFormSchema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import YpaText from '$lib/components/ui/text/YpaText.svelte';

	let { data }: { data: { form: SuperValidated<Infer<LoginFormSchema>>; returnTo?: string } } =
		$props();
	const form = superForm(data.form, {
		validators: zodClient(loginFormSchema)
	});
	const { form: formData, enhance } = form;
</script>

<Card.Root class="min-w-[360px] lg:w-[400px] ">
	<Card.Header>
		<Card.Title><YpaText size="md" weight="semibold">Log in</YpaText></Card.Title>
		<Card.Description>
			Don't have an account? <a class="text-primary underline" href="/register">Sign up</a>
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			{#if data.returnTo}
				<input type="hidden" name="returnTo" value={data.returnTo} />
			{/if}
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
			<Form.Button>Log in</Form.Button>
		</form>
	</Card.Content>
</Card.Root>
