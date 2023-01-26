<script>
	import { convertDate } from '$lib/utils/convertDate';
	import { convertStatus } from '$lib/utils/convertStatus';
	import { goto } from '$app/navigation';
	import Pagination from '$lib/components/Pagination.svelte';

	let paginatedData = [];

	export let data;

	let orders = data.orders;
</script>

<main class="h-full pb-16 overflow-y-auto">
	<div class="container grid px-6 mx-auto">
		<h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Orders</h2>

		<h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Latest Orders</h4>
		<div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
			<div class="w-full overflow-x-auto">
				<table class="w-full whitespace-no-wrap">
					<thead>
						<tr
							class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
						>
							<th class="px-4 py-3">Patron</th>
							<th class="px-4 py-3">Order Name</th>
							<th class="px-4 py-3">Type</th>
							<th class="px-4 py-3">Color</th>
							<th class="px-4 py-3">Date Ordered</th>
							<th class="px-4 py-3">Staff</th>
							<th class="px-4 py-3">Status</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
						{#each paginatedData as order}
							<tr
								on:click={() => goto(`/orders/${order.id}`)}
								class="text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
							>
								<td class="px-4 py-3">
									<div class="flex items-center text-sm">
										<div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
											<img
												class="object-cover w-full h-full rounded-full"
												src={`https://ui-avatars.com/api/?name=${order.patron.firstName}+${order.patron.lastName}&background=FFA26D&format=svg&rounded=true&bold=true`}
												alt=""
												loading="lazy"
											/>
											<div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
										</div>
										<div>
											<p class="font-semibold">
												{order.patron.firstName + ' ' + order.patron.lastName}
											</p>
										</div>
									</div>
								</td>
								<td class="px-4 py-3 text-sm"> {order.name} </td>
								<td class="px-4 py-3 text-sm"> {order.type} </td>
								<td class="px-4 py-3 text-sm"> {order.color} </td>
								<td class="px-4 py-3 text-xs">
									{convertDate(order.dateOrdered, true, false)}
								</td>
								<td class="px-4 py-3 text-xs">
									<div>
										<p class="font-semibold">{order.user.name}</p>
										<p class="text-xs text-gray-600 dark:text-gray-400">{'Intern'}</p>
									</div>
								</td>
								<td class="px-4 py-3 text-sm">
									{@html convertStatus(order.status)}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<Pagination items={data.orders} bind:paginatedData />
		</div>
	</div>
</main>
