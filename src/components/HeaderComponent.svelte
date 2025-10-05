<!-- HeaderComponent.svelte -->
<script lang="ts">
	import type { CtaArticleBlock, SanityImage } from '$lib/types';
	import CtaArticle from './CtaArticle.svelte';

	// Props received from parent
	export let title: string;
	export let ctas: CtaArticleBlock[] = [];
	export let image: SanityImage;
	export let imageHeight: number = Math.min(
		image.asset?.metadata?.dimensions?.height || 400,
		window.innerHeight * 1.3
	);
	const bgColor = '#111'; //image.asset?.metadata?.palette?.muted?.background;
	const titleColor = image.asset?.metadata?.palette?.muted?.title;
	console.log({ bgColor, titleColor, image, imageHeight, innerHeight: window.innerHeight });
	import imageUrlBuilder from '@sanity/image-url';
	import { client } from '../lib/sanity-client';

	const builder = imageUrlBuilder(client);
	const urlFor = (source) => builder.image(source).url();
</script>

<section class="header-wrapper" style="--bg: {bgColor}; --title: {titleColor}">
	<div
		class="background-image"
		style="background-image: url('{urlFor(image)}'); --height: {imageHeight}px;"
	>
		<!-- Top: Title -->
		{#if title}
			<h1>{title}</h1>
		{/if}

		<!-- Bottom: CTAs -->
		{#if ctas?.length}
			<div class="ctas">
				{#each ctas as cta}
					<CtaArticle value={{ ...cta, open: false }} textColor={titleColor} {bgColor} />
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	h1 {
		text-transform: uppercase;
		color: var(--title);
		text-align: center;
		padding-top: 0.5em;
		padding-bottom: 0.5em;
	}

	.header-wrapper {
		position: relative;
		width: 100%;
		overflow: hidden;
		background-color: var(--bg);
	}

	.background-image {
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between; /* Title at top, CTAs at bottom */
		padding: 0;
		color: white;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
	}

	h1 {
		font-size: 2.5rem;
		margin: 0;
	}

	.ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
		color: var(--title);
	}
</style>
