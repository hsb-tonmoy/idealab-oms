<script lang="ts">
	import { SpinLine } from 'svelte-loading-spinners';
	export let type: string = 'button';
	export let disabled: boolean = false;
	export let loading: boolean = false;

	export let defaultClass: string =
		'inline-flex justify-center items-center gap-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-primary border border-transparent rounded-lg active:bg-primary hover:bg-primaryDarker focus:outline-none focus:shadow-outline-purple disabled:opacity-50 disabled:cursor-not-allowed';

	export let classes: string = 'px-4 py-2';
</script>

<button {disabled} {type} class={`${classes} ${defaultClass}`}>
	<slot />
	{#if loading}
		<SpinLine size="36" unit="px" color="#fff" duration="2s" />
	{/if}
</button>
