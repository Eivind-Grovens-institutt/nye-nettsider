<script lang="ts">
	import { PortableText, type CustomBlockComponentProps } from '@portabletext/svelte';
	import type { PortableTextBlock } from '@portabletext/types';
	import EgiImage from './EgiImage.svelte';

	type RecordingBlock = {
		_key: string;
		_ref: string;
		_type: 'recording';
		title: string;
		musicians: string[];
		year: string | null;
		text: PortableTextBlock[];
		markDefs: unknown[] | null;
		image: EgiImage;
	};

	interface Props {
		portableText: CustomBlockComponentProps<{
			value?: RecordingBlock;
		}>;
	}

	const { portableText }: Props = $props();
	console.log('recording', portableText);
	const value = portableText.value;
</script>

<div class="recording-block">
	{#if value?.title}
		<p class="caption">{value.title}</p>
	{/if}
	{#if value?.image}
		<EgiImage
			portableText={{
				value: { ...value.image, size: 'half' },
				isInline: portableText.isInline,
				indexInParent: portableText.indexInParent,
				global: portableText.global
			}}
		></EgiImage>
	{/if}
	{#if value?.text}
		<PortableText value={value.text} />
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
	br {
		clear: both;
	}
</style>
