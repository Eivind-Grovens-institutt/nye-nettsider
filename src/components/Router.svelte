<!--
Picks the right presentational component for the content the page's
load() already fetched. This used to fetch the data itself (in onMount,
client-side only); it's now purely presentational so the result is part of
the server-rendered HTML.
-->
<script lang="ts">
	import FrontPage from './FrontPage.svelte';
	import Article from './Article.svelte';
	import VideoBlock from './VideoBlock.svelte';
	import EventBlock from './EventBlock.svelte';
	import RecordingBlock from './RecordingBlock.svelte';
	import SoundPlayerBlock from './SoundPlayerBlock.svelte';
	import BookBlock from './BookBlock.svelte';
	import SheetMusicBlock from './SheetMusicBlock.svelte';
	import NewsPostBlock from './NewsPost.svelte';
	import NewsList from './NewsList.svelte';
	import { NEWS_POSTS_PAGE_SIZE } from '$lib/sanity-queries';
	import type {
		Book,
		Event,
		NewsPost,
		Recording,
		Settings,
		Sheetmusic,
		Sound,
		Video,
		Article as ArticleType
	} from '../lib/types';
	import type { ContentKind } from '../lib/seo';

	interface Props {
		kind: ContentKind;
		settings?: Settings | null;
		article?: ArticleType;
		video?: Video;
		recording?: Recording;
		sound?: Sound;
		book?: Book;
		sheetmusic?: Sheetmusic;
		event?: Event;
		newsPost?: NewsPost;
		newsPosts?: NewsPost[];
		newsPostsTotal?: number;
		newsPostsPage?: number;
		newsPostsPageSize?: number;
		language?: string;
	}

	const {
		kind,
		settings,
		article,
		video,
		recording,
		sound,
		book,
		sheetmusic,
		event,
		newsPost,
		newsPosts,
		newsPostsTotal,
		newsPostsPage,
		newsPostsPageSize,
		language
	}: Props = $props();
</script>

{#if kind === 'front' && settings}
	<FrontPage {settings} {newsPosts} />
{:else if kind === 'article' && article}
	<Article {article} />
{:else if kind === 'video' && video}
	<section class="content"><VideoBlock {video} /></section>
{:else if kind === 'recording' && recording}
	<section class="content"><RecordingBlock {recording} /></section>
{:else if kind === 'sound' && sound}
	<section class="content"><SoundPlayerBlock {sound} /></section>
{:else if kind === 'book' && book}
	<section class="content"><BookBlock {book} /></section>
{:else if kind === 'sheetmusic' && sheetmusic}
	<section class="content"><SheetMusicBlock {sheetmusic} /></section>
{:else if kind === 'event' && event}
	<section class="content"><EventBlock {event} /></section>
{:else if kind === 'newsPost' && newsPost}
	<section class="content"><NewsPostBlock {newsPost} /></section>
{:else if kind === 'newsList'}
	<NewsList
		posts={newsPosts ?? []}
		total={newsPostsTotal ?? 0}
		page={newsPostsPage ?? 1}
		pageSize={newsPostsPageSize ?? NEWS_POSTS_PAGE_SIZE}
		language={language ?? 'no'}
	/>
{/if}

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
</style>
