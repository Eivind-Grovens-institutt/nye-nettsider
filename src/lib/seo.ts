// SEO helpers: build <head> metadata and JSON-LD structured data for pages.
//
// Centralised here so every route computes title/description/canonical/OG/
// JSON-LD the same way, and renders it through <SeoHead>.
import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanity-client';
import type {
	Article,
	Book,
	Event,
	ProseBlock,
	Recording,
	Settings,
	Sheetmusic,
	Sound,
	Video
} from './types';

const imageBuilder = imageUrlBuilder(client);

export const SITE_URL = 'https://eivindgroven.org';
export const SITE_NAME = 'Eivind Groven';
export const DEFAULT_DESCRIPTION =
	'Eivind Groven (1901–1977) – komponist, folkemusikkforskar og oppfinnar av reinstemmingsorgelet. Artiklar, opptak, video og notemateriale.';

export type OgType = 'website' | 'article' | 'book' | 'music.song' | 'music.album' | 'video.other';

export interface PageMeta {
	title: string;
	description: string;
	canonical: string;
	image?: string;
	type: OgType;
	locale: string;
	noindex?: boolean;
	publishedTime?: string;
}

export function absoluteUrl(path: string): string {
	return new URL(path, SITE_URL).toString();
}

// Accepts anything @sanity/image-url can resolve: a full image field (with a
// resolved or un-dereferenced `asset`), a bare asset document/reference, etc.
// Different queries in sanity-queries.ts dereference images to varying
// degrees, so we lean on the builder rather than assuming a `.url` is present.
export function imageAssetUrl(source: unknown, width = 1200): string | undefined {
	if (!source) return undefined;
	try {
		return imageBuilder
			.image(source as never)
			.width(width)
			.fit('max')
			.auto('format')
			.url();
	} catch {
		return undefined;
	}
}

export function htmlLangFor(language: string): string {
	if (language === 'no') return 'nb';
	return language || 'nb';
}

export function localeFor(language: string): string {
	if (language === 'no') return 'nb_NO';
	if (language === 'en') return 'en_US';
	return language;
}

export function truncate(text: string | undefined, max = 200): string | undefined {
	if (!text) return undefined;
	const clean = text.replace(/\s+/g, ' ').trim();
	if (!clean) return undefined;
	if (clean.length <= max) return clean;
	return clean.slice(0, max - 1).trimEnd() + '…';
}

// Extract a plain-text snippet from PortableText blocks, for use as a meta
// description fallback when a document has no explicit metaDescription.
export function firstPortableTextSnippet(
	blocks?: ProseBlock[] | null,
	max = 200
): string | undefined {
	if (!blocks?.length) return undefined;
	const text = (blocks as Array<{ _type: string; children?: Array<{ text?: string }> }>)
		.filter((b) => b._type === 'block')
		.map((b) => (b.children ?? []).map((c) => c.text ?? '').join(''))
		.join(' ')
		.trim();
	return truncate(text, max);
}

export function jsonLdScript(data: unknown): string {
	// Escape "<" so a literal "</script>" inside content can't break out of
	// the JSON-LD script element.
	return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function buildMeta(opts: {
	path: string;
	language: string;
	title?: string;
	description?: string;
	image?: string;
	type?: OgType;
	noindex?: boolean;
	publishedTime?: string;
}): PageMeta {
	return {
		title: opts.title ? `${opts.title} – ${SITE_NAME}` : SITE_NAME,
		description: truncate(opts.description) ?? DEFAULT_DESCRIPTION,
		canonical: absoluteUrl(opts.path),
		image: opts.image,
		type: opts.type ?? 'website',
		locale: localeFor(opts.language),
		noindex: opts.noindex,
		publishedTime: opts.publishedTime
	};
}

export function websiteJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SITE_NAME,
		url: SITE_URL,
		potentialAction: {
			'@type': 'SearchAction',
			target: `${SITE_URL}/søk?q={search_term_string}`,
			'query-input': 'required name=search_term_string'
		}
	};
}

export function articleJsonLd(article: Article, meta: PageMeta) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: article.title,
		description: meta.description,
		...(meta.image ? { image: [meta.image] } : {}),
		...(article.date ? { datePublished: article.date } : {}),
		...(article.author?.name ? { author: { '@type': 'Person', name: article.author.name } } : {}),
		mainEntityOfPage: meta.canonical,
		publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL }
	};
}

export function eventJsonLd(event: Event, meta: PageMeta) {
	const first = event.dates?.[0];
	return {
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: event.title,
		description: meta.description,
		...(meta.image ? { image: [meta.image] } : {}),
		...(first?.starttime ? { startDate: first.starttime } : {}),
		eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
		eventStatus: 'https://schema.org/EventScheduled',
		url: meta.canonical,
		...(event.ticketlink
			? {
					offers: {
						'@type': 'Offer',
						url: event.ticketlink,
						availability: 'https://schema.org/InStock'
					}
				}
			: {})
	};
}

export function videoJsonLd(video: Video, meta: PageMeta) {
	return {
		'@context': 'https://schema.org',
		'@type': 'VideoObject',
		name: video.title,
		description: meta.description,
		...(meta.image ? { thumbnailUrl: [meta.image] } : {}),
		...(video.year ? { uploadDate: `${video.year}-01-01` } : {}),
		...(video.videoUrl ? { contentUrl: video.videoUrl } : {})
	};
}

export function musicJsonLd(recording: Recording, meta: PageMeta) {
	return {
		'@context': 'https://schema.org',
		'@type': 'MusicAlbum',
		name: recording.title,
		description: meta.description,
		...(meta.image ? { image: meta.image } : {}),
		...(recording.musicians?.length
			? { byArtist: recording.musicians.map((name) => ({ '@type': 'MusicGroup', name })) }
			: {})
	};
}

export function bookJsonLd(book: Book, meta: PageMeta) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Book',
		name: book.title,
		description: meta.description,
		...(meta.image ? { image: meta.image } : {}),
		...(book.authors?.length
			? { author: book.authors.map((name) => ({ '@type': 'Person', name })) }
			: {}),
		...(book.year ? { datePublished: `${book.year}-01-01` } : {})
	};
}

function frontPageImage(settings?: Settings | null): string | undefined {
	for (const block of settings?.frontPageBlocks ?? []) {
		if (block._type === 'header-component' && block.image?.asset) {
			return imageAssetUrl(block.image);
		}
		if (block._type === 'egi-image' && block.asset) {
			return imageAssetUrl(block.asset);
		}
	}
	return undefined;
}

export type ContentKind =
	| 'front'
	| 'article'
	| 'video'
	| 'recording'
	| 'sound'
	| 'book'
	| 'sheetmusic'
	| 'event';

export interface ContentMetaInput {
	kind: ContentKind;
	path: string;
	language: string;
	settings?: Settings | null;
	article?: Article;
	video?: Video;
	recording?: Recording;
	sound?: Sound;
	book?: Book;
	sheetmusic?: Sheetmusic;
	event?: Event;
}

// Builds the page <head> meta and any structured data for a single route,
// given the content the route's load() already fetched.
export function buildContentMeta(input: ContentMetaInput): { meta: PageMeta; jsonLd: unknown[] } {
	const { path, language, settings } = input;

	switch (input.kind) {
		case 'article': {
			const a = input.article!;
			const image = imageAssetUrl(a.illustration) ?? frontPageImage(settings);
			const meta = buildMeta({
				path,
				language,
				title: a.title,
				description: a.metaDescription || a.lead,
				image,
				type: 'article',
				publishedTime: a.date
			});
			return { meta, jsonLd: [articleJsonLd(a, meta)] };
		}
		case 'event': {
			const e = input.event!;
			const image = imageAssetUrl(e.illustration) ?? frontPageImage(settings);
			const meta = buildMeta({
				path,
				language,
				title: e.title,
				description: e.metaDescription || firstPortableTextSnippet(e.prose),
				image,
				type: 'website'
			});
			return { meta, jsonLd: [eventJsonLd(e, meta)] };
		}
		case 'video': {
			const v = input.video!;
			const image = imageAssetUrl(v.image) ?? frontPageImage(settings);
			const meta = buildMeta({
				path,
				language,
				title: v.title,
				description: v.metaDescription || firstPortableTextSnippet(v.text),
				image,
				type: 'video.other'
			});
			return { meta, jsonLd: [videoJsonLd(v, meta)] };
		}
		case 'recording': {
			const r = input.recording!;
			const image = imageAssetUrl(r.image) ?? frontPageImage(settings);
			const meta = buildMeta({
				path,
				language,
				title: r.title,
				description: r.metaDescription || firstPortableTextSnippet(r.text),
				image,
				type: 'music.album'
			});
			return { meta, jsonLd: [musicJsonLd(r, meta)] };
		}
		case 'book': {
			const b = input.book!;
			const image = imageAssetUrl(b.image) ?? frontPageImage(settings);
			const meta = buildMeta({
				path,
				language,
				title: b.title,
				description: b.metaDescription || firstPortableTextSnippet(b.text),
				image,
				type: 'book'
			});
			return { meta, jsonLd: [bookJsonLd(b, meta)] };
		}
		case 'sheetmusic': {
			const s = input.sheetmusic!;
			const image = imageAssetUrl(s.image) ?? frontPageImage(settings);
			const meta = buildMeta({
				path,
				language,
				title: s.title,
				description: s.metaDescription || firstPortableTextSnippet(s.text),
				image
			});
			return { meta, jsonLd: [] };
		}
		case 'sound': {
			const s = input.sound!;
			const meta = buildMeta({
				path,
				language,
				title: s.title,
				description: firstPortableTextSnippet(s.text),
				image: frontPageImage(settings),
				type: 'music.song'
			});
			return { meta, jsonLd: [] };
		}
		case 'front':
		default: {
			const meta = buildMeta({
				path,
				language,
				description: settings?.metaDescription ?? DEFAULT_DESCRIPTION,
				image: frontPageImage(settings)
			});
			// The front page title *is* the site name, so it shouldn't get the
			// "<title> – Eivind Groven" suffix every other page gets.
			meta.title = settings?.title || SITE_NAME;
			return { meta, jsonLd: [] };
		}
	}
}
