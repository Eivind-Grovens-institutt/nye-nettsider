<script lang="ts">
	import { page } from '$app/state';
	import Router from '../../components/Router.svelte';
	import SeoHead from '../../components/SeoHead.svelte';
	import { buildContentMeta } from '$lib/seo';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let { meta, jsonLd } = $derived(
		buildContentMeta({
			kind: data.kind,
			path: page.url.pathname,
			language: data.language,
			settings: data.settings,
			article: data.article,
			video: data.video,
			recording: data.recording,
			sound: data.sound,
			book: data.book,
			sheetmusic: data.sheetmusic,
			event: data.event,
			newsPost: data.newsPost,
			newsPostsPage: data.newsPostsPage
		})
	);
</script>

<SeoHead {meta} {jsonLd} />

<Router
	kind={data.kind}
	settings={data.settings}
	article={data.article}
	video={data.video}
	recording={data.recording}
	sound={data.sound}
	book={data.book}
	sheetmusic={data.sheetmusic}
	event={data.event}
	newsPost={data.newsPost}
	newsPosts={data.newsPosts}
	newsPostsTotal={data.newsPostsTotal}
	newsPostsPage={data.newsPostsPage}
	newsPostsPageSize={data.newsPostsPageSize}
	language={data.language}
/>
