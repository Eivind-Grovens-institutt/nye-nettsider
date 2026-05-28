<script lang="ts">
	import { PortableText, type CustomBlockComponentProps } from '@portabletext/svelte';
	import type { PortableTextBlock } from '@portabletext/types';

	type RecordingBlock = {
		_key: string;
		_ref: string;
		_type: 'recording';
		title: string;
		musicians: string[];
		year: string | null;
		text: PortableTextBlock[];
		markDefs: unknown[] | null;
		image: {
			asset: {
				_id: string;
				url: string;
			};
		};
	};

	interface Props {
		portableText: CustomBlockComponentProps<{
			value?: RecordingBlock;
		}>;
	}
	const { portableText } = $props();

	console.log('sound', portableText);
	const { value } = portableText;
</script>

<div class="audio-block">
	{#if value.title}
		<p class="caption">{value.title}</p>
	{/if}
	{#if value?.text}
		<PortableText value={value.text} />
	{/if}
	<audio controls src={value.soundUrl}>
		Sorry, your browser does not support embedded audios.
	</audio>
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
		font-size: 1.85rem;
		margin-top: 0.5rem;
	}
</style>
