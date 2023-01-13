<script>
	import { getUser } from '@lucia-auth/sveltekit/client';
	import OrderForm from '../OrderForm.svelte';

	import PreviousButton from '$lib/components/layout/PreviousButton.svelte';

	const user = getUser();
</script>

<main class="h-full pb-16 overflow-y-auto">
	<div class="container grid px-6 mx-auto">
		<div class="flex items-center gap-4">
			<PreviousButton url="/orders" />
			<h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Add a New Order</h2>
		</div>
		<div class="flex items-center">
			<div class="w-full xl:w-3/4 flex flex-col">
				<h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Order Details</h4>
				<OrderForm {user} />
			</div>
		</div>
	</div>
</main>
