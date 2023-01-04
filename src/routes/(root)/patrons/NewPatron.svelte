<script>
	import { enhance } from '$app/forms';
	import { Modal, FloatingLabelInput, Select, Label, Helper } from 'flowbite-svelte';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';

	import Button from '$lib/components/Form/Button.svelte';
	import { invalidateAll } from '$app/navigation';

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

	const { form, data, errors, isValid, isSubmitting } = createForm({
		initialValues: {
			firstName: '',
			lastName: '',
			lead: 'Email',
			email: '',
			phone: ''
		},
		extend: validator({ schema }),
		onSubmit: async (values) => {
			try {
				const response = await fetch('/patrons', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(values)
				});

				if (response.ok) {
					show = false;
					invalidateAll();
				} else {
					console.log('Something went wrong.');
				}
			} catch (error) {
				console.error(error);
			}
		}
	});

	export let show = false;

	$: console.log($data.lead);
</script>

<Modal title="Add a New Patron" bind:open={show}>
	<form
		action="/patrons"
		method="post"
		class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
		use:form
		use:enhance
	>
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
				<Select
					bind:value={$data.lead}
					id="lead"
					name="lead"
					underline
					class="mt-2"
					items={leads}
				/>
				<Helper class="mt-2">How did this patron place the order?</Helper>
			</div>
		</section>
		<Button type="submit" disabled={!$isValid || $isSubmitting} loading={$isSubmitting}
			>Submit</Button
		>
	</form>
</Modal>
