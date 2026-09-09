<script context="module" lang="ts">
	function typePath(type: string, slug: string, id: string, language: string) {
		switch (type) {
			case 'article':
				return `/${language}/artikkel/${slug}`;
			default:
				return `/${language}/${type}/${id}`;
		}
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	export let params: { path?: string };
	let loading = true;

	import { fetchSettings } from '$lib/sanity-queries';
	import type { Settings } from '$lib/types';
	import Textbox from '../../components/Textbox.svelte';
	import type { PageData } from './$types';
	import { resolve } from '$app/paths';

	export let data: PageData;
	let settings: Settings | null = null;
	onMount(async () => {
		const pathParts = (params.path ?? '').split(/\//g);
		const language = pathParts[0] || 'no';
		settings = settings || (await fetchSettings(language));
		loading = false;
	});
	$: ({ q, results } = data);
</script>

<svelte:head>
	<title>{q ? `Søk: ${q}` : 'Søk'}</title>
</svelte:head>

<nav>
	<div class="nav-inner">
		<ul>
			{#if settings}
				{#each settings.menu as entry (entry._key)}
					<li>
						<!-- Icon slot: replace span with your icon component -->
						<a
							href={resolve(
								(entry.url ??
									`/${entry.article.language}/artikkel/${entry.article.slug}`) as `/${string}`
							)}
						>
							<span class="icon" aria-hidden="true"></span>
							{entry.text}
						</a>
					</li>
				{/each}
			{/if}
			<li>
				<form action="/søk">
					<span class="icon" aria-hidden="true"></span>
					<input type="search" name="q" placeholder="Søk" value={q} />
				</form>
			</li>
		</ul>
	</div>
</nav>

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
					<a href={typePath(result._type, result.slug, result._id, result.language)}>
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
{#if settings && settings.footer && !loading}
	<footer>
		<Textbox value={settings.footer} />
	</footer>
{/if}

<style>
	/* Nav background spans full screen width */
	nav {
		width: 100%;
		background: #185fa5;
		font-variant: small-caps;
		font-family: sans-serif;
	}

	/* Inner wrapper: centered, 75% wide on desktop, full width on mobile/tablet */
	.nav-inner {
		width: 100%;
		margin: 0 auto;
	}

	nav ul {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		width: 100%;
	}

	/* Equal-size items, no gaps */
	nav ul li {
		flex: 1;
		display: flex;
	}

	nav a,
	nav form {
		display: flex;
		flex-direction: column; /* icon stacks above label */
		align-items: center;
		justify-content: center;
		gap: 0.25em;
		width: 100%;
		color: #fff;
		padding: 0.75em 0.5em;
		font-size: 1.1em;
		background: #185fa5;
		border-right: 1px solid rgba(255, 255, 255, 0.2);
		text-decoration: none;
		transition: background 0.15s ease;
	}

	nav li:last-child a,
	nav li:last-child form {
		border-right: none;
	}

	nav a:hover,
	nav a:focus-visible {
		background: #0c447c;
		outline: none;
	}

	/* Icon placeholder — swap for actual icon elements */
	nav .icon {
		display: block;
		width: 1.25em;
		height: 1.25em;
		/* Icons will size naturally once added */
	}

	/* Search item fills its flex cell like the others */
	nav form {
		border: none;
	}

	nav input[type='search'] {
		background: rgba(255, 255, 255, 0.15);
		color: #fff;
		padding: 0.2em 0.6em;
		font-size: 0.85rem;
		border: 1px solid rgba(255, 255, 255, 0.4);
		border-radius: 0;
		width: 100%;
		max-width: 9em;
	}

	nav input[type='search']::placeholder {
		color: rgba(255, 255, 255, 0.6);
	}

	/* Desktop: center the menu content at 75% */
	@media (min-width: 1024px) {
		.nav-inner {
			width: 75%;
		}

		nav a,
		nav form {
			font-size: 1.3em;
		}
	}

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

	footer {
		font-size: smaller;
		clear: both;
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
