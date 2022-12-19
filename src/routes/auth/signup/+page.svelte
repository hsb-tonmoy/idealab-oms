<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	import SignupForm from './SignupForm.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: if (form?.success) {
		invalidateAll();
		goto('/');
	}
</script>

<div class="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
	<h1 class="text-center font-bold text-white text-6xl mb-10">Idea Lab</h1>
	<div
		class="h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800"
	>
		<div class="flex flex-col overflow-y-auto md:flex-row">
			<div class="h-32 md:h-auto md:w-1/2">
				<img
					aria-hidden="true"
					class="object-cover w-full h-full dark:hidden"
					src="/images/signup.jpg"
					alt="Signup"
				/>
				<img
					aria-hidden="true"
					class="hidden object-cover w-full h-full dark:block"
					src="/images/signup.jpg"
					alt="Signup"
				/>
			</div>
			<div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
				<SignupForm />
			</div>
		</div>
	</div>
</div>
