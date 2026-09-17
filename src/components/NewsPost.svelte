<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { portableTextComponents } from './portableTextComponents';
	import { resolve } from '$app/paths';
	import type { NewsPost } from '../lib/types';

	interface Props {
		newsPost: NewsPost;
	}

	const { newsPost }: Props = $props();

	const formatDate = (date?: string) => {
		if (!date) return '';
		return new Date(date).toLocaleDateString('no-NO', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};
</script>

<article class="news-post">
	<header>
		<h1>{newsPost.title}</h1>
		{#if newsPost.date}
			<time datetime={newsPost.date}>{formatDate(newsPost.date)}</time>
		{/if}
		{#if newsPost.lead}
			<p class="lead">{newsPost.lead}</p>
		{/if}
	</header>

	{#if newsPost.text}
		<main>
			<PortableText value={newsPost.text} components={portableTextComponents} />
		</main>
	{/if}

	<p class="back">
		<a href={resolve(`/${newsPost.language || 'no'}/nyheter`)}>← Alle nyheter</a>
	</p>
</article>

<style>
	.news-post {
		max-width: 720px;
		margin: 0 auto;
		padding: 1.5rem;
		font-family: Georgia, serif;
		line-height: 1.6;
		color: black;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}

	time {
		display: block;
		font-size: 0.9rem;
		color: #777;
		margin-bottom: 1rem;
	}

	.lead {
		font-size: 1.2rem;
		font-weight: 550;
		color: #555;
	}

	main {
		text-align: left;
	}

	.back {
		margin-top: 2rem;
		font-size: 0.9rem;
	}
</style>
