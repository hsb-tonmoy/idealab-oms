<script>
	import { FloatingLabelInput, Select, Label, Helper, Toggle } from 'flowbite-svelte';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';

	import Button from '$lib/components/Form/Button.svelte';
	import { goto } from '$app/navigation';
	import { notificationFailedToast, notificationSuccessToast } from '$lib/utils/notificationToast';

	const schema = yup.object().shape({
		name: yup.string().required('Name is required'),
		email: yup.string().email('Email is invalid')
	});

	export let user = {};

	const { form, data, errors, isValid, isSubmitting } = createForm({
		initialValues: {
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			isSuperAdmin: user.isSuperAdmin,
			position: user.position
		},
		extend: validator({ schema }),
		onSubmit: async (values) => {
			try {
				const response = await fetch('/users', {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(values)
				});

				if (response.ok) {
					goto('/users');
					notificationSuccessToast('User updated successfully');
				} else {
					notificationFailedToast('Failed to update user');
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
			<FloatingLabelInput id="name" name="name" type="text" label="Name" />
			{#if $errors.name}
				<Helper color="red" class="mt-2">{$errors.name}</Helper>
			{/if}
		</div>

		<div>
			<FloatingLabelInput id="email" name="email" type="email" label="Contact Email" />
			{#if $errors.email}
				<Helper color="red" class="mt-2">{$errors.email}</Helper>
			{/if}
		</div>
		<div class="">
			<Toggle color="green" bind:checked={$data.isAdmin}>Admin</Toggle>
		</div>
		<div class="mb-4">
			<Toggle color="green" bind:checked={$data.isSuperAdmin}>Super Admin</Toggle>
		</div>
		<div class="">
			<FloatingLabelInput id="position" name="position" type="text" label="Position" />
			{#if $errors.position}
				<Helper color="red" class="mt-2">{$errors.position}</Helper>
			{/if}
		</div>
	</section>
	<Button type="submit" disabled={!$isValid || $isSubmitting} loading={$isSubmitting}
		>Save Changes</Button
	>
</form>
