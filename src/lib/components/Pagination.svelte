<script lang="ts">
	import { PaginationNav, paginate } from 'svelte-paginate';
	import { Select, Label } from 'flowbite-svelte';

	const pageOptions = [
		{ value: 25, name: '25' },
		{ value: 50, name: '50' },
		{ value: 100, name: '100' }
	];

	export let items: any[] = [];

	export let currentPage = 1;
	export let pageSize = 25;

	export let paginatedData: any[] = [];

	$: paginatedItems = paginate({ items: items, pageSize, currentPage });

	$: {
		paginatedData = paginatedItems;
	}
</script>

<div
	class="bottom-nav flex items-center justify-between text-gray-500 border-t dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800 py-2 px-4"
>
	<div class="flex items-center gap-4">
		<Label>Show:</Label>
		<Select size="sm" items={pageOptions} underline={true} bind:value={pageSize} />
	</div>
	<div class="pagination">
		<PaginationNav
			totalItems={items.length}
			{pageSize}
			{currentPage}
			limit={1}
			showStepOptions={true}
			on:setPage={(e) => (currentPage = e.detail.page)}
		>
			<span class="" slot="prev"
				><svg aria-hidden="true" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
					<path
						d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
						clip-rule="evenodd"
						fill-rule="evenodd"
					/>
				</svg></span
			>
			<span class="" slot="next"
				><svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
					<path
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clip-rule="evenodd"
						fill-rule="evenodd"
					/>
				</svg></span
			>
		</PaginationNav>
	</div>
</div>

<style lang="postcss" global>
	.pagination :global(.pagination-nav) {
		@apply flex justify-end items-center text-xs font-semibold tracking-wide;
	}

	.pagination :global(.option) {
		@apply px-3 py-1 rounded-md rounded-l-lg cursor-pointer;
	}

	.pagination :global(.option.active) {
		@apply px-3 py-1 text-white transition-colors duration-150 bg-primary border border-r-0 border-primary rounded-md focus:outline-none;
	}
</style>
