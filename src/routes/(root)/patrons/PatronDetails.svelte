<script>
	import { convertDate } from '$lib/utils/convertDate';
	import { convertStatus } from '$lib/utils/convertStatus';

	export let patron;
</script>

<div
	class="relative flex flex-col px-8 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 text-gray-700 dark:text-gray-400"
>
	<div class="self-center">
		<div
			class="absolute -top-8 md:-top-12 xl:-top-14"
			style="left: 50%;
    transform: translate(-50%, 0);"
		>
			<img
				src={`https://ui-avatars.com/api/?name=${patron.firstName}+${patron.lastName}&format=svg&rounded=true&bold=true`}
				alt="Patron"
				class="w-16 md:w-24 xl:w-28"
			/>
		</div>
		<div class="mt-12 md:mt-16">
			<h6
				class="mb-4 text-lg md:text-xl font-semibold text-gray-600 dark:text-gray-300 text-center"
			>
				{patron.firstName}
				{patron.lastName}
			</h6>
			<div
				class="w-full grid gap-10 mt-8"
				style="grid-template-columns: repeat(3, minmax(min-content, max-content))"
			>
				<div class="flex flex-col justify-center items-center">
					<span class="font-bold text-sm md:text-base">{patron.orders.length}</span>
					<span class="text-xs md:text-sm">Orders</span>
				</div>
				<div class="flex flex-col justify-center items-center">
					<span class="font-bold text-sm md:text-base">{patron.lead}</span>
					<span class="text-xs md:text-sm">Lead</span>
				</div>
				<div class="flex flex-col justify-center items-center">
					<span class="font-bold text-sm md:text-base"
						>{convertDate(patron.createdAt, true, false)}</span
					>
					<span class="text-xs md:text-sm">Joined</span>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-col mt-6">
		<h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Recent Orders</h4>
		{#each patron.orders as order}
			<div class="flex flex-col gap-2">
				<a class="flex items-center gap-2" href={`/orders/${order.id}/`}>
					<span class="font-semibold text-sm md:text-base">{order.name}</span>
					<span class="">-</span>
					<span class="text-xs md:text-sm text-gray-500 dark:text-gray-400"
						>{convertDate(order.dateOrdered)}</span
					>
					{@html convertStatus(order.status, true)}
				</a>
			</div>
		{/each}
	</div>
</div>
