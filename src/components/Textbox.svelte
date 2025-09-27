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
		background: #f7f7f7;
		border-radius: 4px;
		font-size: 1rem;
		line-height: 1.6;
	}
</style>
