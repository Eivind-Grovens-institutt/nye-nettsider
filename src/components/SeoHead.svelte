<!--
Renders <title>, meta description/robots, canonical, OG/Twitter tags and any
JSON-LD structured data for a single page. Every route builds a `PageMeta`
via src/lib/seo.ts and renders it through this one component, so every page
gets the same shape of head tags and we never end up with duplicate
<title>/description tags from a page and its layout both declaring one.
-->
<script lang="ts">
	import type { PageMeta } from '$lib/seo';
	import { jsonLdScript } from '$lib/seo';

	interface Props {
		meta: PageMeta;
		jsonLd?: unknown[];
	}

	let { meta, jsonLd = [] }: Props = $props();
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href={meta.canonical} />
	{#if meta.noindex}
		<meta name="robots" content="noindex,follow" />
	{/if}

	<meta property="og:type" content={meta.type} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={meta.canonical} />
	<meta property="og:locale" content={meta.locale} />
	{#if meta.image}
		<meta property="og:image" content={meta.image} />
	{/if}
	{#if meta.publishedTime}
		<meta property="article:published_time" content={meta.publishedTime} />
	{/if}

	<meta name="twitter:card" content={meta.image ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	{#if meta.image}
		<meta name="twitter:image" content={meta.image} />
	{/if}

	{#each jsonLd as entry, i (i)}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- jsonLdScript() JSON-encodes and escapes "<", there's no other way to emit a <script type="application/ld+json"> tag from Svelte -->
		{@html `<script type="application/ld+json">${jsonLdScript(entry)}</` + `script>`}
	{/each}
</svelte:head>
