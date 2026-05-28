<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import type { PortableTextBlock } from '@portabletext/types';

	export let value: {
		prose?: PortableTextBlock[];
	};
</script>

<div class="textbox">
	{#if value.prose}
		<PortableText value={value.prose} />
	{/if}
</div>

<style>
	.textbox {
		padding: 1rem;
		background-color: #185fa5;
		color: #fff;
		border-radius: 4px;
		font-size: 1rem;
		line-height: 1.6;
	}
	.textbox :global(a:link) {
		color: #fff;
	}
	.textbox :global(a:visited) {
		color: #ffc;
	}
</style>
