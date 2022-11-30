<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
	import { handleSession } from '@lucia-auth/sveltekit/client';

	handleSession(page);
</script>

<svelte:head>
	<title>IdeaLab - Kalamazoo Public Library</title>
</svelte:head>

<slot />
