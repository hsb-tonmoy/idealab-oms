<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import Pagination from '$lib/components/Pagination.svelte';
	let paginatedData = [];

	export let data: PageData;

	function returnRole(role: boolean) {
		if (role) {
			return 'Yes';
		} else {
			return 'No';
		}
	}
</script>

<main class="h-full pb-16 overflow-y-auto">
	<div class="container grid px-6 mx-auto">
		<div class="flex justify-between items-center">
			<h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Users</h2>
		</div>

		<div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
			<div class="w-full overflow-x-auto">
				<table class="w-full whitespace-no-wrap">
					<thead>
						<tr
							class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
						>
							<th class="px-4 py-3">Name</th>
							<th class="px-4 py-3">Email</th>
							<th class="px-4 py-3">Position</th>
							<th class="px-4 py-3">Admin</th>
							<th class="px-4 py-3">SuperAdmin</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
						{#each paginatedData as user}
							<tr
								on:click={() => goto(`/users/${user.id}`)}
								class="text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
							>
								<td class="px-4 py-3">
									<div class="flex items-center text-sm">
										<div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
											<img
												class="object-cover w-full h-full rounded-full"
												src={`https://ui-avatars.com/api/?name=${user.name}&format=svg&rounded=true&bold=true`}
												alt=""
												loading="lazy"
											/>
											<div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
										</div>
										<div>
											<p class="font-semibold">{`${user.name}`}</p>
										</div>
									</div>
								</td>
								<td class="px-4 py-3 text-sm"> {user.email} </td>
								<td class="px-4 py-3 text-sm"> {user.position} </td>
								<td class="px-4 py-3 text-sm"> {returnRole(user.isAdmin)} </td>
								<td class="px-4 py-3 text-sm"> {returnRole(user.isSuperAdmin)} </td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<Pagination items={data.users} bind:paginatedData />
		</div>
	</div>
</main>
