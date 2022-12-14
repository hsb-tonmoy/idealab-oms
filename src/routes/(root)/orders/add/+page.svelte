<script>
	import { getUser } from '@lucia-auth/sveltekit/client';
	import NewForm from './NewForm.svelte';

	const user = getUser();
</script>

<main class="h-full pb-16 overflow-y-auto">
	<div class="container grid px-6 mx-auto">
		<h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Add a New Order</h2>
		<div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
			<div class="flex flex-col">
				<h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Order Details</h4>
				<NewForm {user} />
			</div>
		</div>
	</div>
</main>
