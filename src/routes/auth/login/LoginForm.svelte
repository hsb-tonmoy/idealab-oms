<script>
	import Button from '$lib/components/Form/Button.svelte';
	import { enhance } from '$app/forms';
	import Error from '$lib/components/Form/Error.svelte';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';
	import YupPassword from 'yup-password';

	YupPassword(yup);

	const schema = yup.object().shape({
		email: yup
			.string()
			.email('Please enter a valid email address')
			.required('Email address is required')
			.trim(),
		password: yup.string().required('Password is required')
	});

	const { form, data, errors, isValid, isSubmitting } = createForm({
		initialValues: {
			email: '',
			password: ''
		},
		extend: validator({ schema })
	});
</script>

<form class="w-full" method="POST" use:enhance use:form>
	<h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>

	<label class="block text-sm">
		<span class="text-gray-700 dark:text-gray-400">Email</span>
		<input
			id="email"
			name="email"
			class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
			placeholder="johnD@kpl.gov"
		/>
		{#if $errors.email}
			<Error message={$errors.email} />
		{/if}
	</label>
	<label class="block mt-4 text-sm">
		<span class="text-gray-700 dark:text-gray-400">Password</span>
		<input
			id="password"
			name="password"
			class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
			placeholder="***************"
			type="password"
		/>
		{#if $errors.password}
			<Error message={$errors.password} />
		{/if}
	</label>

	<div class="mt-4">
		<Button type="submit" disabled={!isValid} loading={$isSubmitting}>Login</Button>
	</div>
</form>
