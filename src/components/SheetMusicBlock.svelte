<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import EgiImage from './EgiImage.svelte';
	import type { Sheetmusic } from '$lib/types';

	interface Props {
		sheetmusic: Sheetmusic;
	}

	const { sheetmusic }: Props = $props();
</script>

<div class="recording-block">
	{#if sheetmusic?.title}
		<p class="caption">{sheetmusic.title}</p>
	{/if}
	{#if sheetmusic?.image}
		<EgiImage
			portableText={{
				value: { ...sheetmusic.image, size: 'half' }
			}}
		></EgiImage>
	{/if}
	{#if sheetmusic?.text}
		<PortableText value={sheetmusic.text} />
	{/if}
	{#if sheetmusic?.noteUrl}<p>
			<a href={sheetmusic.noteUrl}>Vis noter</a>
		</p>{/if}
</div>
<br />

<style>
	.recording-block {
		margin: 2rem 0;
	}
	.caption {
		font-size: 1.85rem;
		margin-top: 0.5rem;
	}
	br {
		clear: both;
	}
</style>
