<!-- src/routes/+page.svelte -->
<script>
	import Router from '../components/Router.svelte';
	export let params;
	console.log('routes/+page params', params);
</script>

<Router {params} />
