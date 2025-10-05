<script lang="ts">
	// Props type
	export interface Article {
		title: string;
		lead?: string;
		illustration?: { asset?: { url?: string } };
		author?: { name: string };
		category?: { title: string };
		slug?: { current: string };
		language?: string;
	}

	export let articles: Article[] = [];

	// Utility to build URL safely
	const articleUrl = (a: Article) => `/${a.language || 'no'}/artikkel/${a.slug?.current || ''}`;
</script>

<div class="article-listing">
	{#each articles as article (article.slug?.current)}
		<a class="article-card" href={articleUrl(article)}>
			<!-- Illustration -->
			{#if article.illustration?.asset?.url}
				<div class="image" style="background-image: url('{article.illustration.asset.url}');"></div>
			{/if}

			<!-- Content -->
			<div class="content">
				<h2>{article.title}</h2>

				{#if article.lead}
					<p class="lead">{article.lead}</p>
				{/if}

				{#if article.author?.name}
					<div class="author">Av {article.author.name}</div>
				{/if}
			</div>
		</a>
	{/each}
</div>

<style>
	.article-listing {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	a.article-card {
		display: flex;
		flex-direction: column;
		border-radius: 1rem;
		overflow: hidden;
		background: #fff;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		text-decoration: none;
		color: inherit;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	a.article-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.image {
		width: 100%;
		height: 200px;
		background-size: cover;
		background-position: center;
	}

	.content {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-grow: 1;
	}

	h2 {
		font-size: 1.5rem;
		margin: 0 0 0.5rem;
	}

	p.lead {
		color: #555;
		margin-bottom: 1rem;
	}

	.author {
		margin-top: auto;
		font-size: 0.9rem;
		color: #777;
	}
</style>
