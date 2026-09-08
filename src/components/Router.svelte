<!--
This component does the actual heavy lifting of selecting components
for front page, listings and items
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import FrontPage from '../components/FrontPage.svelte';
	import Article from '../components/Article.svelte';
	import VideoBlock from './VideoBlock.svelte';
	import EventBlock from './EventBlock.svelte';
	import RecordingBlock from './RecordingBlock.svelte';
	import SoundPlayerBlock from './SoundPlayerBlock.svelte';
	import BookBlock from './BookBlock.svelte';
	import SheetMusicBlock from './SheetMusicBlock.svelte';
	import type { Settings, Video, Recording, Sound, Book, Sheetmusic, Event } from '../lib/types';
	import type { Article as ArticleType } from '../lib/types';
	import {
		fetchArticleByLanguageAndSlug,
		fetchSettings,
		fetchVideoByLanguageAndId,
		fetchRecordingByLanguageAndId,
		fetchSoundByLanguageAndId,
		fetchBookByLanguageAndId,
		fetchSheetmusicByLanguageAndId,
		fetchEventByLanguageAndId
	} from '../lib/sanity-queries';
	import Textbox from './Textbox.svelte';

	export let params: { path?: string };
	export let settings: Settings | null = null;

	let loading = true;
	let error: string | null = null;

	let article: ArticleType | null = null;
	let video: Video | null = null;
	let recording: Recording | null = null;
	let sound: Sound | null = null;
	let book: Book | null = null;
	let sheetmusic: Sheetmusic | null = null;
	let event: Event | null = null;

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
				// route = "/language/category/slug-or-id"
				const slug = pathParts[2] || pathParts[pathParts.length - 1];
				const language = pathParts[0];
				const pageCategory = pathParts[1];
				if (pageCategory === 'artikkel' || pageCategory === 'intro') {
					article = await fetchArticleByLanguageAndSlug(language, slug);
				} else if (pageCategory === 'video') {
					video = await fetchVideoByLanguageAndId(language, slug);
				} else if (pageCategory === 'recording') {
					recording = await fetchRecordingByLanguageAndId(language, slug);
				} else if (pageCategory === 'sound') {
					sound = await fetchSoundByLanguageAndId(language, slug);
				} else if (pageCategory === 'book') {
					book = await fetchBookByLanguageAndId(language, slug);
				} else if (pageCategory === 'sheetmusic') {
					sheetmusic = await fetchSheetmusicByLanguageAndId(language, slug);
				} else if (pageCategory === 'event') {
					event = await fetchEventByLanguageAndId(language, slug);
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
{:else if video}
	<VideoBlock {video} />
{:else if recording}
	<RecordingBlock {recording} />
{:else if sound}
	<SoundPlayerBlock {sound} />
{:else if book}
	<BookBlock {book} />
{:else if sheetmusic}
	<SheetMusicBlock {sheetmusic} />
{:else if event}
	<section class="content"><EventBlock {event} /></section>
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

	.content {
		max-width: 720px;
		margin: 0 auto;
	}
</style>
