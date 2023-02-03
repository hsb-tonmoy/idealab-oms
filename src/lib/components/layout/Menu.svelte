<script>
	import { page } from '$app/stores';
	import { Orders, Home, Customers, Users } from '$lib/components/Icons';

	const items = [
		{ name: 'Dashboard', href: '/', icon: Home },
		{ name: 'Orders', href: '/orders', icon: Orders },
		{ name: 'Patrons', href: '/patrons', icon: Customers },
		{ name: 'Users', href: '/users', icon: Users }
	];

	export let user;
</script>

<ul>
	{#each items as item}
		<!-- Hide Users item if the user is not a Superadmin -->
		{#if !(!$user?.isSuperAdmin && item.name === 'Users')}
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
		{/if}
	{/each}
</ul>
<div class="px-6 my-6">
	<a href="/orders/add">
		<button
			class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary border border-transparent rounded-lg active:bg-primary hover:bg-primaryDarker focus:outline-none focus:shadow-outline-purple"
		>
			New Order
			<span class="ml-2" aria-hidden="true">+</span>
		</button>
	</a>
</div>
