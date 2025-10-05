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
	import {
		fetchArticleByLanguageAndSlug,
		fetchArticlesByCategory,
		fetchSettings
	} from '../lib/sanity-queries';
	import Textbox from './Textbox.svelte';
	import ArticleListing from './ArticleListing.svelte';

	export let params: { path?: string };

	let loading = true;
	let error: string | null = null;

	let settings: Settings | null = null;
	let article: ArticleType | null = null;
	let articleList: ArticleType[] | null = null;

	let showFrontPage: boolean = false;
	onMount(async () => {
		const pathParts = (params.path ?? '').split(/\//g);
		const language = pathParts[0] || 'no';
		settings = await fetchSettings(language);

		try {
			if (pathParts.length <= 1) {
				// route = "/", route "/no"
				showFrontPage = true;
			} else {
				// route = "/language/category/slug"
				const slug = pathParts[2] || pathParts[pathParts.length - 1];
				const language = pathParts[0];
				const pageCategory = pathParts[1];
				if (pageCategory === 'artikkel') {
					article = await fetchArticleByLanguageAndSlug(language, slug);
				}
				if (pageCategory === 'artikler') {
					const articleCategory = pathParts[2];
					articleList = await fetchArticlesByCategory(articleCategory, language);
				}
			}
		} catch (e) {
			error = e instanceof Error ? e.message : String(e);
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<p>Laster …</p>
{:else if error}
	<p>Feil: {error}</p>
{:else if showFrontPage && settings}
	<FrontPage {settings} />
{:else if article}
	<Article {article} />
{:else if articleList}
	<ArticleListing articles={articleList} />
{/if}

{#if settings && settings.footer}
	<footer>
		<Textbox value={settings.footer} />
	</footer>
{/if}

<style>
	footer {
		font-size: smaller;
	}
</style>
