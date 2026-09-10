import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
	fetchArticleByLanguageAndSlug,
	fetchBookByLanguageAndId,
	fetchEventByLanguageAndId,
	fetchRecordingByLanguageAndId,
	fetchSheetmusicByLanguageAndId,
	fetchSoundByLanguageAndId,
	fetchVideoByLanguageAndId
} from '$lib/sanity-queries';
import { languageFromPath } from '$lib/language';

// This route covers "/", "/no", and "/<language>/<category>/<slug-or-id>".
// Content used to be fetched client-side in onMount (Router.svelte), which
// meant crawlers - and the very first paint for real visitors - saw an
// empty page. Fetching it here means it's part of the server-rendered HTML.
export const load: PageServerLoad = async ({ params, url }) => {
	const pathParts = (params.path ?? '').split(/\//g);
	const language = languageFromPath(url.pathname);

	if (pathParts.length <= 1) {
		return { kind: 'front' as const, language };
	}

	const pageCategory = pathParts[1];
	const slug = pathParts[2] || pathParts[pathParts.length - 1];

	switch (pageCategory) {
		case 'artikkel':
		case 'intro': {
			const article = await fetchArticleByLanguageAndSlug(language, slug);
			if (!article) error(404, 'Fant ikke artikkelen');
			return { kind: 'article' as const, article, language };
		}
		case 'video': {
			const video = await fetchVideoByLanguageAndId(language, slug);
			if (!video) error(404, 'Fant ikke videoen');
			return { kind: 'video' as const, video, language };
		}
		case 'recording': {
			const recording = await fetchRecordingByLanguageAndId(language, slug);
			if (!recording) error(404, 'Fant ikke plateutgivelsen');
			return { kind: 'recording' as const, recording, language };
		}
		case 'sound': {
			const sound = await fetchSoundByLanguageAndId(language, slug);
			if (!sound) error(404, 'Fant ikke lydfilen');
			return { kind: 'sound' as const, sound, language };
		}
		case 'book': {
			const book = await fetchBookByLanguageAndId(language, slug);
			if (!book) error(404, 'Fant ikke boka');
			return { kind: 'book' as const, book, language };
		}
		case 'sheetmusic': {
			const sheetmusic = await fetchSheetmusicByLanguageAndId(language, slug);
			if (!sheetmusic) error(404, 'Fant ikke notematerialet');
			return { kind: 'sheetmusic' as const, sheetmusic, language };
		}
		case 'event': {
			const event = await fetchEventByLanguageAndId(language, slug);
			if (!event) error(404, 'Fant ikke arrangementet');
			return { kind: 'event' as const, event, language };
		}
		default:
			error(404, 'Fant ikke siden');
	}
};
