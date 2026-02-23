<script lang="ts">
	// TODO: does this handle tables?
	import { PortableText } from '@portabletext/svelte';
	import { portableTextComponents } from './portableTextComponents';
	import type { PortableTextBlock } from '@portabletext/types';

	interface Props {
		article: {
			title: string;
			lead?: string;
			illustration?: any;
			prose?: PortableTextBlock[];
			author?: { name: string };
			category?: { title: string };
			metaDescription?: string;
			slug?: { current: string };
			date?: string;
			frontPageQuote?: string;
			source?: string;
			language?: string;
		};
	}

	const { article } = $props();

	// Date formatting utility
	const formatDate = (date?: string) => {
		if (!date) return '';
		return new Date(date).toLocaleDateString('no-NO', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	// Sanity image URL builder
	import imageUrlBuilder from '@sanity/image-url';
	import { client } from '../lib/sanity-client';

	const builder = imageUrlBuilder(client);
	const urlFor = (source) => builder.image(source).width(1200).url();
	let endnotes = $derived(
		article.prose?.reduce((notes, curBlock) => {
			if (curBlock._type !== 'block' || !curBlock.markDefs?.length) {
				return notes;
			}
			return [...notes, ...curBlock.markDefs.filter((def) => def._type === 'endnote')];
		}, [])
	);
</script>

<svelte:head>
	<title>{article.title} - eivindgroven.org</title>
</svelte:head>
<article class="article">
	<header>
		<h1>{article.title}</h1>
		{#if article.author}
			<p>• Av <b>{article.author.name}</b></p>{/if}

		{#if article.lead}
			<p class="lead">{article.lead}</p>
		{/if}

		{#if article.illustration}
			<img
				src={urlFor(article.illustration)}
				alt={article.illustration.alt || article.title}
				class="illustration"
			/>
		{/if}

		<div class="meta">
			{#if article.date}<time datetime={article.date}>{formatDate(article.date)}</time>{/if}
			{#if article.category}
				• Tema <b>{article.category.title}</b>{/if}
		</div>
	</header>

	{#if article.prose}
		<PortableText
			value={article.prose}
			components={portableTextComponents}
			context={{ endnotes }}
		/>
	{/if}

	{#if article.source}
		<footer class="source">
			<p>Kilde: {article.source}</p>
		</footer>
	{/if}

	{#if endnotes?.length}
		<hr />
		<ol>
			{#each endnotes as note}
				<li id="note-{note._key}" class="endnote">
					<PortableText value={note.note} components={portableTextComponents} />
					<a href="#src-{note._key}">↩</a>
				</li>
			{/each}
		</ol>
	{/if}
</article>

<style>
	.article {
		max-width: 720px;
		margin: 0 auto;
		padding: 1.5rem;
		font-family: Georgia, serif;
		line-height: 1.6;
		color: black;
		text-shadow: none;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}

	.lead {
		font-size: 1.2rem;
		font-weight: 550;
		color: #555;
		margin-bottom: 1rem;
	}

	.illustration {
		width: 100%;
		height: auto;
		margin: 1rem 0;
		border-radius: 8px;
	}

	.meta {
		font-size: 0.9rem;
		color: #777;
		margin-bottom: 1.5rem;
	}

	.front-quote {
		border-left: 4px solid #aaa;
		padding-left: 1rem;
		font-style: italic;
		margin: 2rem 0;
	}

	.source {
		font-size: 0.85rem;
		color: #666;
		margin-top: 2rem;
	}

	.endnote {
		font-size: small;
	}
</style>
