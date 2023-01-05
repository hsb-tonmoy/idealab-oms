<script>
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';
	import SvelteSelect from 'svelte-select/no-styles/Select.svelte';
	import getPatron from './getPatron';

	import { FloatingLabelInput, Helper, Label, Select } from 'flowbite-svelte';

	import Button from '$lib/components/Form/Button.svelte';

	export let user;

	const statuses = [
		{ value: 'new', name: 'New' },
		{ value: 'in-progress', name: 'In Progress' },
		{ value: 'complete', name: 'Complete' }
	];

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
			name: '',
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
		<div class="col-span-2">
			<Label for="status" class="sr-only">Status</Label>
			<Select
				bind:value={$data.status}
				id="lead"
				name="lead"
				underline
				class="mb-2"
				items={statuses}
			/>
			<Helper class="mt-2 mb-4">Order status</Helper>
		</div>
		<FloatingLabelInput
			style="outlined"
			id="dateOrdered"
			name="dateOrdered"
			type="date"
			label="Date Ordered"
		/>
		<FloatingLabelInput style="filled" id="user" name="user" type="text" label="Staff" disabled />
		<div class="flex">
			<SvelteSelect loadOptions={getPatron} itemId="id" placeholder="Select a patron">
				<div class="patron" slot="item" let:item let:index>
					{item.firstName}
					{item.lastName} - {item.email}
				</div>
				<div class="patron" slot="selection" let:selection>
					{selection.firstName}
					{selection.lastName} - {selection.email}
				</div>
			</SvelteSelect>
		</div>
		<div class="col-span-2">
			<FloatingLabelInput id="name" name="name" type="text" label="Name of the Order" />
			{#if $errors.name}
				<Helper color="red" class="mt-2">{$errors.name}</Helper>
			{/if}
		</div>
	</section>
	<Button type="submit">Submit</Button>
</form>

<style lang="postcss" global>
	.patron {
		@apply flex items-center text-sm font-medium;
	}
</style>
