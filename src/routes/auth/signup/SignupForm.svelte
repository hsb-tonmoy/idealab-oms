<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Form/Button.svelte';
	import Error from '$lib/components/Form/Error.svelte';

	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';
	import YupPassword from 'yup-password';

	YupPassword(yup);

	const schema = yup.object().shape({
		name: yup.string().required('Name is required'),
		email: yup
			.string()
			.email('Please enter a valid email address')
			.required('Email address is required')
			.trim(),
		password: yup
			.string()
			.min(8, 'Password must be at least 8 characters long')
			.minLowercase(2, 'Password must have at least 2 lowercase characters')
			.minUppercase(1, 'Password must have at least 1 uppercase character')
			.minNumbers(1, 'Password must have at least 1 numeric character')
			.minSymbols(1, 'Password must have at least 1 symbol')
			.required('Password is required'),
		passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
	});

	const { form, data, errors, isValid, isSubmitting } = createForm({
		initialValues: {
			name: '',
			email: '',
			password: '',
			passwordConfirmation: ''
		},
		extend: validator({ schema })
	});
</script>

<form class="w-full" method="POST" use:enhance use:form>
	<h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Create account</h1>
	<label class="block text-sm">
		<span class="text-gray-700 dark:text-gray-400">Name</span>
		<input
			id="name"
			name="name"
			class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
			placeholder="John Doe"
		/>
		{#if $errors.name}
			<Error message={$errors.name} />
		{/if}
	</label>
	<label class="block mt-4 text-sm">
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
	<label class="block mt-4 text-sm">
		<span class="text-gray-700 dark:text-gray-400"> Confirm password </span>
		<input
			id="passwordConfirmation"
			name="passwordConfirmation"
			class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
			placeholder="***************"
			type="password"
		/>
		{#if $errors.passwordConfirmation}
			<Error message={$errors.passwordConfirmation} />
		{/if}
	</label>

	<div class="mt-4">
		<Button type="submit" disabled={!isValid} loading={$isSubmitting}>Signup</Button>
	</div>

	<p class="mt-4">
		<a
			class="text-sm font-medium text-primary dark:text-purple-400 hover:underline"
			href="/auth/login"
		>
			Already have an account? Login
		</a>
	</p>
</form>
