<script>
	import PatronForm from '../PatronForm.svelte';

	let editPatronShow = true;

	export let data;
</script>

<PatronForm editing={true} patron={data.patron} bind:show={editPatronShow} />
