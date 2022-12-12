<script>
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';

	const schema = yup.object().shape({
		user: yup.string().required(),
		dateOrdered: yup.date().required(),
		patron: yup.string().required(),
		status: yup.string().required(),
		patronContacted: yup.boolean().required(),
		patronPickedUp: yup.boolean().required()
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

<main class="h-full pb-16 overflow-y-auto">
	<div class="container grid px-6 mx-auto">
		<h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Add a New Order</h2>
	</div>
</main>
