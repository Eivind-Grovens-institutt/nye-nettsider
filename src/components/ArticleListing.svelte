<script lang="ts">
	import imgUrlModule from '@sanity/image-url';
	const imageUrlBuilder = imgUrlModule().dataset('production').projectId('3s7jtfk3');
	import { resolve } from '$app/paths';

	export interface Article {
		title: string;
		lead?: string;
		illustration?: {
			asset?: { _id: string; url: string };
			hotspot?: { x: number; y: number; width: number; height: number };
			crop?: { top: number; bottom: number; left: number; right: number };
			alt?: string;
		};
		author?: { name: string };
		category?: { title: string };
		slug?: { current: string };
		language?: string;
	}

	export interface EgiImage {
		asset?: { url?: string };
		alt?: string;
		hotspot?: { x: number; y: number; width: number; height: number };
		crop?: { top: number; bottom: number; left: number; right: number };
	}

	interface Props {
		portableText: {
			value: {
				articles?: Article[];
				layout?: 'link' | 'ingress' | 'image' | 'full';
				image?: EgiImage;
				imageAlign?: 'left' | 'right';
				text?: string;
			};
		};
	}

	let { portableText }: Props = $props();
	let {
		articles = [],
		layout = 'full',
		image = undefined,
		imageAlign = 'right',
		text = undefined
	} = portableText.value;
	console.log({ articles, layout, image, portableText });

	const articleUrl = (a: Article) => `/${a.language || 'no'}/artikkel/${a.slug?.current || ''}`;

	const hasImage = $derived(!!image?.asset?.url);
</script>

<div class="article-listing-block" class:has-image={hasImage}>
	{#if image?.asset}
		<div class="side-image side-image--{imageAlign}">
			<img src={imageUrlBuilder.image(image).toString()} alt={image.alt || ''} />
		</div>
	{/if}

	<div class="article-listing-content">
		{#if text}
			<p class="blurb">{text}</p>
		{/if}

		<div
			class="article-listing"
			class:layout-link={layout === 'link'}
			class:layout-ingress={layout === 'ingress'}
			class:layout-image={layout === 'image'}
			class:layout-full={layout === 'full'}
		>
			{#each articles as article (article.slug?.current)}
				<a class="article-card" href={resolve(articleUrl(article))}>
					{#if (layout === 'image' || layout === 'full') && article.illustration?.asset}
						<div
							class="image"
							style="background-image: url('{imageUrlBuilder
								.image(article.illustration)
								.toString()}');"
							role="img"
							aria-label={article.title}
						></div>
					{/if}

					<div class="content">
						<h2>{article.title}</h2>

						{#if (layout === 'ingress' || layout === 'full') && article.lead}
							<p class="lead">{article.lead}</p>
						{/if}

						{#if layout === 'full' && article.author?.name}
							<div class="author">Av {article.author.name}</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>

<style>
	.article-listing-block {
		display: block;
		margin-top: 2em;
	}

	.article-listing-block.has-image {
		display: flex;
		gap: 2rem;
		align-items: flex-start;
	}

	.side-image {
		flex: 0 0 280px;
		max-width: 280px;
	}

	.side-image--left {
		order: -1;
	}

	.side-image--right {
		order: 1;
	}

	.side-image img {
		width: 100%;
		height: auto;
		border-radius: 0.75rem;
		object-fit: cover;
	}

	.article-listing-content {
		flex: 1;
		min-width: 0;
	}

	.blurb {
		margin: 0 0 1.5rem;
		color: #444;
		font-size: 1.05rem;
		line-height: 1.6;
		font-weight: bold;
	}

	.article-listing {
		display: grid;
		gap: 1.5rem;
	}

	.layout-link,
	.layout-ingress {
		grid-template-columns: 1fr;
		gap: 0.5rem;
	}

	.layout-image {
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	}

	.layout-full {
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	a.article-card {
		display: flex;
		flex-direction: column;
		border-radius: 1rem;
		overflow: hidden;
		background: #fff;
		text-decoration: none;
		color: inherit;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.layout-full a.article-card,
	.layout-image a.article-card {
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
	}

	.layout-full a.article-card:hover,
	.layout-image a.article-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.layout-link a.article-card,
	.layout-ingress a.article-card {
		background: transparent;
		border-radius: 0;
		padding: 0.5rem 0;
		border-bottom: 1px solid #e5e5e5;
	}

	.layout-link a.article-card:hover,
	.layout-ingress a.article-card:hover {
		background: transparent;
		transform: none;
		box-shadow: none;
	}

	.layout-link a.article-card h2,
	.layout-ingress a.article-card h2 {
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.image {
		width: 100%;
		height: 200px;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: top;
	}

	.layout-image .image {
		height: 160px;
	}

	.content {
		padding: 1rem 1.5rem 1.5rem;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.layout-link .content,
	.layout-ingress .content {
		padding: 0;
	}

	h2 {
		font-size: 1.25rem;
		margin: 0 0 0.5rem;
		line-height: 1.3;
	}

	.layout-full h2 {
		font-size: 1.5rem;
	}

	p.lead {
		color: #555;
		margin: 0 0 1rem;
		line-height: 1.5;
	}

	.author {
		margin-top: auto;
		padding-top: 0.75rem;
		font-size: 0.85rem;
		color: #777;
	}
</style>
