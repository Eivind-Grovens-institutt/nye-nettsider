<script lang="ts">
	import { PortableText, type CustomBlockComponentProps } from '@portabletext/svelte';
	import type { PortableTextBlock } from '@portabletext/types';
	import EgiImage from './EgiImage.svelte';

	type BookBlock = {
		_key: string;
		_ref: string;
		_type: 'recording';
		title: string;
		authors: string[];
		editors: string[];
		year: string | null;
		text: PortableTextBlock[];
		markDefs: unknown[] | null;
		image: EgiImage;
		assetUrl?: string;
	};

	interface Props {
		portableText: CustomBlockComponentProps<{
			value?: BookBlock;
		}>;
	}

	const { portableText }: Props = $props();
	console.log('book', portableText);
	const value = portableText.value;
</script>

<div class="recording-block">
	{#if value?.title}
		<p class="caption">{value.title}</p>
	{/if}
	{#if value?.image?.asset}
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
	{#if value?.assetUrl}<p>
			<a href={value.assetUrl}>Full tekst</a>
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
