<script lang="ts">
	import { onMount } from 'svelte';
	import FrontPage from '../components/FrontPage.svelte';
	import Article from '../components/Article.svelte';
	import type { Settings } from '../lib/types';
	import type { Article as ArticleType } from '../lib/types';
	import { fetchArticleByLanguageAndSlug, fetchSettings } from '../lib/sanity-queries';
	import Textbox from './Textbox.svelte';

	export let params: { path?: string };

	let loading = true;
	let error: string | null = null;

	let settings: Settings | null = null;
	let article: ArticleType | null = null;

	onMount(async () => {
		const pathParts = (params.path ?? '').split(/\//g);
		console.log(pathParts);
		try {
			if (pathParts.length <= 1) {
				// route = "/", route "/no"
				const language = pathParts[0] || 'no';
				settings = await fetchSettings(language);
			} else {
				// route = "/language/category/slug"
				const slug = pathParts[2] || pathParts[pathParts.length - 1];
				const language = pathParts[0];
				article = await fetchArticleByLanguageAndSlug(language, slug);
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
{:else if settings}
	<FrontPage {settings} />
{:else if article}
	<Article {article} />
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
