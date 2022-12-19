<script>
	import { enhance } from '$app/forms';
	import { Modal, FloatingLabelInput, Helper } from 'flowbite-svelte';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';

	import Button from '$lib/components/Form/Button.svelte';

	const schema = yup.object().shape({
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		email: yup.string().email(),
		phone: yup.string()
	});

	const { form, data, errors, isValid, isSubmitting } = createForm({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: ''
		},
		extend: validator({ schema })
	});

	export let show = false;
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
			<FloatingLabelInput id="firstName" name="firstName" type="text" label="First Name" />
			<FloatingLabelInput id="lastName" name="lastName" type="text" label="Last Name" />
			<FloatingLabelInput id="email" name="email" type="email" label="Contact Email" />
			<FloatingLabelInput id="phone" name="phone" type="text" label="Contact Phone" />
		</section>
		<Button type="submit" disabled={!$isValid} loading={$isSubmitting}>Submit</Button>
	</form>
</Modal>
