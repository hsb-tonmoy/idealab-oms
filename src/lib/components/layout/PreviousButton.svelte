<script lang="ts">
	import LeftArrow from '../Icons/LeftArrow.svelte';

	export let url: string;
</script>

<a href={url}>
	<button
		class="flex justify-center items-center bg-gray-700 dark:bg-gray-200 w-8 h-8 p-1 rounded-full"
		><span class="block w-5 h-5 text-gray-200 dark:text-gray-700"><LeftArrow /></span></button
	>
</a>
