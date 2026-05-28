<script lang="ts">
	import { PortableText, type CustomBlockComponentProps } from '@portabletext/svelte';
	import type { PortableTextBlock } from '@portabletext/types';
	import EgiImage from './EgiImage.svelte';

	type SheetMusicBlock = {
		_key: string;
		_ref: string;
		_type: 'recording';
		title: string;
		year: string | null;
		text: PortableTextBlock[];
		instruments: string[];
		markDefs: unknown[] | null;
		image: EgiImage;
		noteUrl: string | null;
	};

	interface Props {
		portableText: CustomBlockComponentProps<{
			value?: SheetMusicBlock;
		}>;
	}

	const { portableText }: Props = $props();
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
	{#if value?.noteUrl}<p>
			<a href={value.noteUrl}>Vis noter</a>
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
