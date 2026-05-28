<script lang="ts">
	import type { PortableTextBlock } from '@portabletext/types';
	import EgiImage from './EgiImage.svelte';
	import type { CustomBlockComponentProps } from '@portabletext/svelte';

	type VideoBlock = {
		_key: string;
		_ref: string;
		_type: 'video';
		title: string;
		text: PortableTextBlock;
		videoUrl: string;
		year: number | null;
		image: EgiImage | null;
		markDefs: unknown[] | null;
	};

	interface Props {
		portableText: CustomBlockComponentProps<{
			value?: VideoBlock;
		}>;
	}

	const { portableText }: Props = $props();
	console.log('video', portableText);
	const value = portableText.value;
</script>

<div class="video-block">
	{#if value.title}
		<p class="caption">{value.title}</p>
	{/if}
	<video controls poster={value.image?.asset?.url} src={value.videoUrl}>
		Sorry, your browser does not support embedded videos.
	</video>
</div>

<style>
	.video-block {
		margin: 2rem 0;
	}
	.video-block video {
		width: 100%;
		border-radius: 6px;
	}
	.caption {
		font-size: 1.85rem;
		margin-top: 0.5rem;
	}
</style>
