<script>
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';
	import SvelteSelect from 'svelte-select';
	import getPatron from './getPatron';

	import { FloatingLabelInput, Toggle, Helper, Label, Select } from 'flowbite-svelte';

	import Button from '$lib/components/Form/Button.svelte';

	import { Plus, Minus } from '$lib/components/Icons';

	import PatronForm from '../patrons/PatronForm.svelte';
	import { goto } from '$app/navigation';
	import { convertDate } from '$lib/utils/convertDate';

	let newPatronShow = false;

	export let editing = false;

	export let order = {};

	export let user;

	let userID = $user?.userId;

	let patron;

	const statuses = [
		{ value: 'new', name: 'New' },
		{ value: 'in-progress', name: 'In Progress' },
		{ value: 'complete', name: 'Complete' }
	];

	const file_statuses = [
		{ value: 'pending', name: 'Pending' },
		{ value: 'printing', name: 'Printing' },
		{ value: 'complete', name: 'Complete' }
	];

	const file = [
		{
			name: '',
			status: 'pending',
			color: '',
			notes: ''
		}
	];

	const schema = yup.object().shape({
		dateOrdered: yup.string().required('An order date is required'),
		name: yup.string().required('An order name is required.'),
		color: yup.string().required('An order color is required.'),
		user: yup.string().required(),
		status: yup.string().required('An order status is required')
	});

	const { form, data, errors, isValid, isSubmitting } = createForm({
		initialValues: {
			name: editing ? order.name : '',
			color: editing ? order.color : '',
			user: editing ? order.user.name : $user?.name,
			dateOrdered: editing ? new Date(order.dateOrdered).toLocaleString() : '',
			patron: editing ? order.patron.name : patron,
			status: editing ? order.status : 'new',
			patronContacted: editing ? order.patronContacted : false,
			patronPickedUp: editing ? order.patronPickedUp : false,
			files: editing ? order.files : file
		},
		extend: validator({ schema }),
		onSubmit: async (values) => {
			let user = { connect: { id: userID } };
			let patronObj = { connect: { id: patron.id } };
			let files = {
				create: values.files
			};
			values.dateOrdered = new Date(values.dateOrdered).toISOString();
			values['user'] = user;
			values['patron'] = patronObj;
			values['files'] = files;
			try {
				const response = await fetch('/orders/add', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(values)
				});

				if (response.ok) {
					goto('/orders');
					console.log('Order added successfully.');
				} else {
					console.log('Something went wrong.');
				}
			} catch (error) {
				console.error(error);
			}
		}
	});

	$: if ($data.patronPickedUp === true) {
		$data.status = 'complete';
	}

	function addFile() {
		$data.files = $data.files.concat(file);
	}

	function removeFile(index) {
		$data.files = $data.files.filter((item, i) => i !== index);
	}
</script>

<form class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" use:form>
	<section class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<div class="col-span-2">
			<Label for="status" class="sr-only">Status</Label>
			<Select
				bind:value={$data.status}
				id="status"
				underline
				class="mb-2 {$data.status === 'complete' ? 'text-green-600' : ''}"
				items={statuses}
				placeholder="Select a status"
			/>
			{#if $errors.status}
				<Helper color="red" class="mt-2">{$errors.status}</Helper>
			{/if}
		</div>
		<div class="">
			<Toggle color="green" bind:checked={$data.patronContacted}>Patron Contacted?</Toggle>
		</div>
		<div class="mb-4">
			<Toggle color="green" bind:checked={$data.patronPickedUp}>Patron Picked Up?</Toggle>
		</div>
		<div class="">
			<FloatingLabelInput
				style="outlined"
				id="dateOrdered"
				name="dateOrdered"
				type="datetime-local"
				label="Date Ordered"
			/>
			{#if $errors.dateOrdered}
				<Helper color="red" class="mt-2">{$errors.dateOrdered}</Helper>
			{/if}
		</div>
		<FloatingLabelInput style="filled" id="user" name="user" type="text" label="Staff" disabled />
		<div class="col-span-2 flex items-center gap-2">
			<SvelteSelect
				bind:value={patron}
				loadOptions={getPatron}
				itemId="id"
				placeholder="Select a patron"
			>
				<div class="patron" slot="item" let:item>
					{item.firstName}
					{item.lastName} - {item.email || item.phone}
				</div>
				<div class="patron" slot="selection" let:selection>
					{selection.firstName}
					{selection.lastName} - {selection.email || selection.phone}
				</div>
			</SvelteSelect>
			<PatronForm bind:show={newPatronShow} />
			<button on:click={() => (newPatronShow = true)} class=""
				><span class="block h-6 w-6 text-green-500"><Plus /></span></button
			>
		</div>
		<div class="">
			<FloatingLabelInput
				style="outlined"
				id="name"
				name="name"
				type="text"
				label="Name of the Order"
			/>
			{#if $errors.name}
				<Helper color="red" class="mt-2">{$errors.name}</Helper>
			{/if}
		</div>
		<div class="">
			<FloatingLabelInput
				style="outlined"
				id="color"
				name="color"
				type="text"
				label="Preferred Color"
			/>
			{#if $errors.color}
				<Helper color="red" class="mt-2">{$errors.color}</Helper>
			{/if}
		</div>
	</section>
	<h6 class="mb-4 text-base font-semibold text-gray-600 dark:text-gray-300 mt-6">Files</h6>
	<section class="grid grid-cols-2 md:grid-cols-4 gap-6">
		{#each $data.files as file, i}
			<div class="">
				<FloatingLabelInput
					bind:value={$data.files[i].name}
					style="outlined"
					id={'name' + i}
					type="text"
					label="File Name"
				/>
			</div>
			<div class="">
				<FloatingLabelInput
					bind:value={$data.files[i].color}
					style="outlined"
					id={'filecolor' + i}
					type="text"
					label="Color"
				/>
			</div>
			<div class="">
				<FloatingLabelInput
					bind:value={$data.files[i].notes}
					style="outlined"
					id={'filenote' + i}
					type="text"
					label="Note"
				/>
			</div>
			<div class="">
				<Label for={'filestatus' + i} class="sr-only">Status</Label>
				<div class="flex items-center gap-2">
					<Select
						bind:value={$data.files[i].status}
						id={'filestatus' + i}
						underline
						class="mb-2 {$data.status === 'complete' ? 'text-green-600' : ''}"
						items={file_statuses}
						placeholder="Select a status"
					/>
					{#if i === $data.files.length - 1}
						<button on:click={addFile} class=""
							><span class="block h-6 w-6 text-green-500"><Plus /></span></button
						>
					{/if}
					{#if $data.files.length > 1}
						<button
							on:click={() => {
								removeFile(i);
							}}
							class=""><span class="block h-6 w-6 text-red-500"><Minus /></span></button
						>
					{/if}
				</div>
			</div>
		{/each}
	</section>
	<Button loading={$isSubmitting} disabled={!isValid || $isSubmitting} type="submit">Submit</Button>
</form>

<style lang="postcss" global>
	.patron {
		@apply text-sm font-medium;
	}
</style>