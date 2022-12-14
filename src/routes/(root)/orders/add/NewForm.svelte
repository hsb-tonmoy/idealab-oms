<script>
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';

	import { FloatingLabelInput, Helper } from 'flowbite-svelte';

	import Button from '$lib/components/Form/Button.svelte';

	export let user;

	const schema = yup.object().shape({
		dateOrdered: yup.date().required(),
		user: yup.string().required(),
		patron: yup.string().required(),
		status: yup.string().required(),
		patronContacted: yup.boolean().required(),
		patronPickedUp: yup.boolean().required()
	});

	const { form, data, errors, isValid, isSubmitting } = createForm({
		initialValues: {
			user: $user?.name,
			dateOrdered: '',
			patron: '',
			status: '',
			patronContacted: false,
			patronPickedUp: false
		},
		// extend: validator({ schema }),
		onSubmit: async (values) => {
			console.log(values);
		}
	});
</script>

<form class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" use:form>
	<section class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<FloatingLabelInput
			style="outlined"
			id="dateOrdered"
			name="dateOrdered"
			type="date"
			label="Date Ordered"
		/>
		<FloatingLabelInput style="outlined" id="user" name="user" type="text" label="Staff" />
	</section>
	<Button type="submit">Submit</Button>
</form>
