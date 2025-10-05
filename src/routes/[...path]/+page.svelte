<!-- src/routes/+page.svelte -->
<script>
	import Router from '../../components/Router.svelte';
	export let params;
</script>

{#key params}
	<Router {params} />
{/key}
