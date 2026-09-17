<script lang="ts">
	import EgiImage from './EgiImage.svelte';
	import CtaArticle from './CtaArticle.svelte';
	import Textbox from './Textbox.svelte';
	import HeaderComponent from './HeaderComponent.svelte';
	import { resolve } from '$app/paths';
	import type { NewsPost } from '../lib/types';

	export let settings: {
		title: string;
		language: string;
		frontPageBlocks?: any[];
	};
	export let newsPosts: NewsPost[] = [];

	const formatDate = (date?: string) => {
		if (!date) return '';
		return new Date(date).toLocaleDateString('no-NO', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	// We want CTAs that are in order without any other components inbetween to be grouped
	const blocks = [];
	settings.frontPageBlocks?.forEach((block) => {
		if (['egi-image', 'textbox'].includes(block._type)) {
			blocks.push(block);
		} else if (block._type === 'cta-article') {
			const lastBlock = blocks[blocks.length - 1];
			if (lastBlock && lastBlock.type === 'cta-group') {
				lastBlock.items.push(block);
			} else {
				blocks.push({ type: 'cta-group', items: [block] });
			}
		} else if (block._type === 'header-component') {
			blocks.push(block);
		}
	});
</script>

<main class="frontpage">
	<section class="blocks">
		{#each blocks || [] as block}
			{#if block._type === 'egi-image'}
				<EgiImage value={block} key={block._key} />
			{:else if block.type === 'cta-group'}
				<section class="ctas ctas-{block.items.length}" key="ctas">
					{#each block.items as item}
						<CtaArticle value={item} key={item._key} />
					{/each}
				</section>
			{:else if block._type === 'textbox'}
				<Textbox value={block} key={block._key} />
			{:else if block._type === 'header-component'}
				<HeaderComponent {...block} language={settings?.language} key="header" />
			{/if}
		{/each}
	</section>

	{#if newsPosts.length > 0}
		<section class="news">
			<h2>Nyheter</h2>
			<ul>
				{#each newsPosts as post (post.slug?.current)}
					<li>
						<a href={resolve(`/${settings?.language || 'no'}/nyhet/${post.slug?.current}`)}>
							{post.title}
						</a>
						{#if post.date}<time datetime={post.date}>{formatDate(post.date)}</time>{/if}
					</li>
				{/each}
			</ul>
			<a class="all-news" href={resolve(`/${settings?.language || 'no'}/nyheter`)}
				>Alle nyheter →</a
			>
		</section>
	{/if}
</main>

<style>
	.frontpage {
		margin: 0 auto;
		padding: 0;
		font-family: Georgia, serif;
	}

	.site-title {
		margin-bottom: 2rem;
		text-align: center;
	}

	.blocks {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.ctas {
		border: none;
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;
		gap: 1em;
	}

	.ctas-3 {
		flex-basis: 30%;
	}

	.news {
		max-width: 720px;
		margin: 2rem auto 0;
		padding: 0 1rem;
	}

	.news h2 {
		font-size: 1.1rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.news ul {
		list-style: none;
		padding: 0;
		margin: 0 0 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.news li {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		border-bottom: 1px solid #e5e5e5;
		padding-bottom: 0.5rem;
	}

	.news a {
		color: inherit;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.news time {
		flex-shrink: 0;
		color: #777;
		font-size: 0.85rem;
	}

	.all-news {
		font-weight: bold;
	}
</style>
