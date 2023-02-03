<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	import Pagination from '$lib/components/Pagination.svelte';

	const addNew = $page.url.searchParams.get('addNew');

	export let data: PageData;

	let paginatedData = [];

	import PatronForm from './PatronForm.svelte';
	import { goto } from '$app/navigation';

	let newPatronShow = addNew ? true : false;
</script>

<main class="h-full pb-16 overflow-y-auto">
	<div class="container grid px-6 mx-auto">
		<div class="flex justify-between items-center">
			<h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Patrons</h2>
			<button
				on:click={() => (newPatronShow = true)}
				class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary border border-transparent rounded-lg active:bg-primary hover:bg-primaryDarker focus:outline-none focus:shadow-outline-purple"
			>
				Add a Patron
				<span class="ml-2" aria-hidden="true">+</span>
			</button>
			<PatronForm bind:show={newPatronShow} />
		</div>

		<div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
			<div class="w-full overflow-x-auto">
				<table class="w-full whitespace-no-wrap">
					<thead>
						<tr
							class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
						>
							<th class="px-4 py-3">Name</th>
							<th class="px-4 py-3">Contact</th>
							<th class="px-4 py-3">Lead</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
						{#each paginatedData as patron}
							<tr
								on:click={() => goto(`/patrons/${patron.id}`)}
								class="text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
							>
								<td class="px-4 py-3">
									<div class="flex items-center text-sm">
										<div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
											<img
												class="object-cover w-full h-full rounded-full"
												src={`https://ui-avatars.com/api/?name=${
													patron.firstName + '' + patron.lastName
												}&format=svg&rounded=true&bold=true`}
												alt=""
												loading="lazy"
											/>
											<div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
										</div>
										<div>
											<p class="font-semibold">{`${patron.firstName} ${patron.lastName}`}</p>
										</div>
									</div>
								</td>
								<td class="px-4 py-3 text-sm"> {patron.email || patron.phone} </td>
								<td class="px-4 py-3 text-sm"> {patron.lead} </td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<Pagination items={data.patrons} bind:paginatedData />
		</div>
	</div>
</main>
