<script lang="ts">
	export interface EgiImage {
		asset?: { url?: string };
		alt?: string;
		hotspot?: { x: number; y: number; width: number; height: number };
		crop?: { top: number; bottom: number; left: number; right: number };
		title?: string;
		photographer?: string;
		persons?: string[];
		tags?: string[];
		size?: string;
	}

	import imageUrlBuilder from '@sanity/image-url';
	import type { CustomBlockComponentProps } from '@portabletext/svelte';

	interface Props {
		portableText: CustomBlockComponentProps<{
			size?: string;
			title: string;
			photographer?: string;
		}>;
	}
	let { portableText }: Props = $props();
	const value = portableText.value;
	console.log(portableText);

	import { client } from '../lib/sanity-client';
	const builder = imageUrlBuilder(client);
	const urlFor = (source) => builder.image(source).url();
</script>

<figure class={value.size === 'half' ? 'egi-image half' : 'egi-image full'}>
	<img src={urlFor(value)} alt={value.title || ''} />
	{#if value.title || value.photographer}
		<figcaption>
			{#if value.title}<div>{value.title}</div>{/if}
			{#if value.photographer}<div>Foto: {value.photographer}</div>{/if}
		</figcaption>
	{/if}
</figure>

<style>
	.egi-image {
		margin: 1.5rem 0;
	}
	.egi-image.half {
		width: 50%;
		float: right;
	}
	.egi-image img {
		width: 100%;
		border-radius: 6px;
	}
	.egi-image figcaption {
		font-size: 0.85rem;
		color: #555;
		margin-top: 0.5rem;
	}
</style>
