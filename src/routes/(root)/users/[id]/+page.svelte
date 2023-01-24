<script>
	import PreviousButton from '$lib/components/layout/PreviousButton.svelte';
	import EditForm from './EditForm.svelte';
	export let data;
</script>

<main class="h-full pb-16 overflow-y-auto">
	<div class="container grid px-6 mx-auto">
		<div class="flex items-center gap-4">
			<PreviousButton url="/users" />
			<h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
				Edit {data.user.name}
			</h2>
		</div>
		<div class="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-10">
			<div class="flex flex-col">
				<h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">User Details</h4>
				<EditForm user={data.user} />
			</div>
		</div>
	</div>
</main>
