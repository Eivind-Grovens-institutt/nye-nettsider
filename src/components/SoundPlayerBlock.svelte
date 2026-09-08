<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import type { Sound } from '../lib/types';

	interface Props {
		sound: Sound;
	}

	const { sound }: Props = $props();
</script>

<div class="audio-block">
	{#if sound.title}
		<p class="caption">{sound.title}</p>
	{/if}
	{#if sound.text}
		<PortableText value={sound.text} />
	{/if}
	{#if sound.soundUrl}
		<audio controls src={sound.soundUrl}> Nettleseren støtter ikke lydavspilling </audio>
	{/if}
</div>

<style>
	.audio-block {
		margin: 2rem 0;
	}
	.audio-block audio {
		width: 100%;
		border-radius: 6px;
	}
	.caption {
		font-size: 0.85rem;
		margin-top: 0.5rem;
	}
</style>
