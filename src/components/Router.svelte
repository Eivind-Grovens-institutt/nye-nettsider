<!--
This component does the actual heavy lifting of selecting components
for front page, listings and items
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import FrontPage from '../components/FrontPage.svelte';
	import Article from '../components/Article.svelte';
	import type { Settings } from '../lib/types';
	import type { Article as ArticleType } from '../lib/types';
	import { fetchArticleByLanguageAndSlug, fetchSettings } from '../lib/sanity-queries';
	import Textbox from './Textbox.svelte';

	export let params: { path?: string };
	export let settings: Settings | null = null;

	let loading = true;
	let error: string | null = null;

	let article: ArticleType | null = null;

	let showFrontPage: boolean = false;
	onMount(async () => {
		const pathParts = (params.path ?? '').split(/\//g);
		const language = pathParts[0] || 'no';
		settings = settings || (await fetchSettings(language));

		try {
			if (pathParts.length <= 1) {
				// route = "/", route "/no"
				showFrontPage = true;
			} else {
				// route = "/language/category/slug"
				const slug = pathParts[2] || pathParts[pathParts.length - 1];
				const language = pathParts[0];
				const pageCategory = pathParts[1];
				if (pageCategory === 'artikkel' || pageCategory === 'intro') {
					article = await fetchArticleByLanguageAndSlug(language, slug);
				}
			}
		} catch (e) {
			error = e instanceof Error ? e.message : String(e);
		} finally {
			loading = false;
		}
	});
</script>

{#if error}
	<p>Feil: {error}</p>
{:else if showFrontPage && settings}
	<FrontPage {settings} />
{:else if article}
	<Article {article} />
{/if}

{#if settings && settings.footer && !loading}
	<footer>
		<Textbox value={settings.footer} />
	</footer>
{/if}

<style>
	footer {
		font-size: smaller;
		clear: both;
	}
</style>
