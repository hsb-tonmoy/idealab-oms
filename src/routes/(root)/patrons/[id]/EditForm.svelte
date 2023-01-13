<script>
	import { FloatingLabelInput, Select, Label, Helper } from 'flowbite-svelte';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';

	import Button from '$lib/components/Form/Button.svelte';
	import { goto } from '$app/navigation';

	const leads = [
		{ value: 'Email', name: 'Email' },
		{ value: 'Phone', name: 'Phone' },
		{ value: 'Walk-in', name: 'Walk-in' }
	];

	const schema = yup.object().shape({
		firstName: yup.string().required('First name is required'),
		lastName: yup.string().required('Last name is required'),
		email: yup.string().email('Email is invalid'),
		phone: yup.string()
	});

	export let patron = {};

	const { form, data, errors, isValid, isSubmitting } = createForm({
		initialValues: {
			firstName: patron.firstName,
			lastName: patron.lastName,
			lead: patron.lead || '',
			email: patron.email,
			phone: patron.phone
		},
		extend: validator({ schema }),
		onSubmit: async (values) => {
			try {
				const response = await fetch('/patrons', {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(values)
				});

				if (response.ok) {
					goto('/patrons');
				} else {
					console.log('Something went wrong.');
				}
			} catch (error) {
				console.error(error);
			}
		}
	});
</script>

<form class="px-4 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" use:form>
	<section class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<div>
			<FloatingLabelInput id="firstName" name="firstName" type="text" label="First Name" />
			{#if $errors.firstName}
				<Helper color="red" class="mt-2">{$errors.firstName}</Helper>
			{/if}
		</div>
		<div>
			<FloatingLabelInput id="lastName" name="lastName" type="text" label="Last Name" />
			{#if $errors.lastName}
				<Helper color="red" class="mt-2">{$errors.lastName}</Helper>
			{/if}
		</div>
		<div>
			<FloatingLabelInput id="email" name="email" type="email" label="Contact Email" />
			{#if $errors.email}
				<Helper color="red" class="mt-2">{$errors.email}</Helper>
			{/if}
		</div>
		<div class="">
			<FloatingLabelInput id="phone" name="phone" type="text" label="Contact Phone" />
			{#if $errors.phone}
				<Helper color="red" class="mt-2">{$errors.phone}</Helper>
			{/if}
		</div>
		<div class="">
			<Label for="lead" class="sr-only">Lead</Label>
			<Select bind:value={$data.lead} id="lead" name="lead" underline class="mt-2" items={leads} />
			<Helper class="mt-2">How did this patron place the order?</Helper>
		</div>
	</section>
	<Button type="submit" disabled={!$isValid || $isSubmitting} loading={$isSubmitting}
		>Save Changes</Button
	>
</form>
