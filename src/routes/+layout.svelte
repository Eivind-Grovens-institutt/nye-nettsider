<script lang="ts">
	import favicon from '$lib/assets/favicon.ico';
	import favicon16 from '$lib/assets/favicon-16x16.png';
	import favicon32 from '$lib/assets/favicon-32x32.png';
	import appleTouchIcon from '$lib/assets/apple-touch-icon.png';
	import androidChrome192 from '$lib/assets/android-chrome-192x192.png';
	import androidChrome512 from '$lib/assets/android-chrome-512x512.png';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} sizes="any" />
	<link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
	<link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
	<link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
	<link rel="icon" type="image/png" sizes="192x192" href={androidChrome192} />
	<link rel="icon" type="image/png" sizes="512x512" href={androidChrome512} />
</svelte:head>
{@render children?.()}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
