<script>
	import { page } from '$app/stores';
	import { Orders, Home, Customers } from '$lib/components/Icons';

	export const items = [
		{ name: 'Dashboard', href: '/', icon: Home },
		{ name: 'Orders', href: '/orders', icon: Orders },
		{ name: 'Patrons', href: '/patrons', icon: Customers }
	];
</script>

<ul>
	{#each items as item}
		<li class="relative px-6 py-3">
			<a
				class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 {$page
					.url.pathname === item.href
					? 'text-gray-800 dark:text-gray-200'
					: ''}"
				href={item.href}
			>
				<span class="block w-5 h-5">
					<svelte:component this={item.icon} />
				</span>
				<span class="ml-4">{item.name}</span>
			</a>
		</li>
	{/each}
</ul>
<div class="px-6 my-6">
	<a href="/orders/add">
		<button
			class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
		>
			New Order
			<span class="ml-2" aria-hidden="true">+</span>
		</button>
	</a>
</div>
