<script lang="ts">
	import { goto } from '$app/navigation';
	import { SpinLine } from 'svelte-loading-spinners';
	import { Trash } from '$lib/components/Icons';
	import { notificationFailedToast } from '$lib/utils/notificationToast';

	export let order: any;

	let deleting = false;

	const deleteOrder = async () => {
		deleting = true;
		order['deleted'] = true;
		delete order['patron'];
		delete order['user'];
		try {
			const response = await fetch('/orders/add', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(order)
			});

			if (response.ok) {
				goto('/orders');
			} else {
				notificationFailedToast('Something went wrong');
			}
		} catch (error) {
			console.error(error);
		}
		deleting = false;
	};
</script>

<button
	type="button"
	on:click={deleteOrder}
	class="inline-flex items-center justify-center px-4 py-2 border border-red-600 rounded-md bg-transparent hover:bg-red-600 text-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
	><span class="block w-4 h-4">
		{#if deleting}
			<SpinLine size="36" unit="px" color="#fff" duration="2s" />
		{:else}
			<Trash />
		{/if}
	</span></button
>
