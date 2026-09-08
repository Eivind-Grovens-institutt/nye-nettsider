<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import EgiImage from './EgiImage.svelte';
	import SoundPlayerBlock from './SoundPlayerBlock.svelte';
	import type { Recording } from '$lib/types';

	interface Props {
		recording: Recording;
	}

	const { recording }: Props = $props();
	console.log({ recording });
</script>

<div class="recording-block">
	{#if recording?.title}
		<p class="caption">{recording.title}</p>
	{/if}
	{#if recording?.image}
		<EgiImage
			portableText={{
				value: { ...recording.image, size: recording?.text ? 'half' : 'full' }
			}}
		></EgiImage>
	{/if}
	{#if recording?.text}
		<PortableText value={recording.text} />
	{/if}
	<br />
	{#if recording?.tracks?.length}
		<div class="tracks">
			<h4 class="tracks-title">Spor</h4>
			{#each recording.tracks as track (track._id)}
				<SoundPlayerBlock sound={track} />
			{/each}
		</div>
	{/if}
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
	.tracks-title {
		font-size: 1.1rem;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}
	br {
		clear: both;
	}
</style>
