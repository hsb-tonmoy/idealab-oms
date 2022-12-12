<script lang="ts">
	import '../app.postcss';
	import { page, navigating } from '$app/stores';
	import { handleSession } from '@lucia-auth/sveltekit/client';

	import Loader from '$lib/loading/Loader.svelte';
	import { loading } from '$lib/loading/loading';

	$: loading.setNavigate(!!$navigating);

	handleSession(page);
</script>

<svelte:head>
	<title>IdeaLab - Kalamazoo Public Library</title>
</svelte:head>

<Loader />
<slot />
