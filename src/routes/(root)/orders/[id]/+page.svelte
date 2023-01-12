<script>
	import { getUser } from '@lucia-auth/sveltekit/client';
	import OrderForm from '../OrderForm.svelte';

	const user = getUser();

	export let data;
</script>

<main class="h-full pb-16 overflow-y-auto">
	<div class="container grid px-6 mx-auto">
		<h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
			Edit {data.order.name}
		</h2>
		<div class="flex items-center">
			<div class="w-full xl:w-3/4 flex flex-col">
				<h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Order Details</h4>
				<OrderForm editing={true} order={data.order} {user} />
			</div>
		</div>
	</div>
</main>
