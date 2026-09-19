<script module lang="ts">
	function typePath(type: string, slug: string, id: string, language: string) {
		switch (type) {
			case 'article':
				return `/${language}/artikkel/${slug}`;
			case 'newsPost':
				return `/${language}/nyhet/${slug}`;
			default:
				return `/${language}/${type}/${id}`;
		}
	}
</script>

<script lang="ts">
	import SeoHead from '../../components/SeoHead.svelte';
	import { buildMeta } from '$lib/seo';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { q, results } = $derived(data);

	// Search result pages are thin/duplicate content from an SEO standpoint,
	// so they're excluded from the index but still crawlable (links are
	// followed) so found articles etc. still get discovered.
	let meta = $derived(
		buildMeta({
			path: '/søk',
			language: data.language,
			title: q ? `Søk: ${q}` : 'Søk',
			description: q
				? `${results.length} treff for «${q}» på eivindgroven.org.`
				: 'Søk i artikler, opptak, video og notemateriale om Eivind Groven.',
			noindex: true
		})
	);
</script>

<SeoHead {meta} />

<section class="content">
	{#if q}
		<p class="result-count">
			{results.length}
			{results.length === 1 ? 'treff' : 'treff'} for «{q}»
		</p>
	{/if}

	{#if results.length > 0}
		<ul class="results">
			{#each results as result (result._id)}
				<li>
					<a href={typePath(result._type, result.slug ?? '', result._id, result.language)}>
						<h2>{result.title}</h2>
						{#if result.excerpt}
							<p>{result.excerpt}…</p>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	{:else if q}
		<p class="empty">Ingen treff.</p>
	{/if}
</section>

<style>
	.content {
		max-width: 720px;
		margin: 0 auto;
	}
	@media (max-width: 600px) {
		.content {
			max-width: none;
			margin: 0 auto;
		}
	}

	.results {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.results a {
		text-decoration: none;
		color: inherit;
	}
	.results h2 {
		margin: 0 0 0.25rem;
	}
	.empty,
	.result-count {
		color: var(--muted, #666);
	}
</style>
