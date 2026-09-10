// queries.ts
import { proseFields, illustrationFields, ctaArticleFields } from './fragments';
import type {
	Article,
	Book,
	Recording,
	Sheetmusic,
	Video,
	Event,
	ContentListType,
	ContentListItem,
	Sound
} from './types';
import { client } from './sanity-client';

// Single article by slug
const singleArticleQuery = `*[_type == "article" && slug.current == $slug && language == $language][0]{
  title,
  lead,
  ${illustrationFields},
  ${proseFields},
  author->{ name },
  category->{ title },
  metaDescription,
  slug,
  date,
  frontPageQuote,
  source,
  language
}`;

export const fetchArticleByLanguageAndSlug = async (
	language: string,
	slug: string
): Promise<Article> => {
	return await client.fetch(singleArticleQuery, { language, slug });
};

// Latest articles
const latestArticlesQuery = `*[_type == "article" && language == $language] | order(date desc)[0...10]{
  title,
  lead,
  slug,
  date,
  ${illustrationFields},
  author->{ name },
  category->{ title },
  ${proseFields}
}`;

export const fetchLatestArticles = async (language: string): Promise<Article[]> => {
	return await client.fetch(latestArticlesQuery, { language });
};

// Slugs
const slugsQuery = `*[_type == "article" && defined(slug.current)]{
  "slug": slug.current
}`;

export const fetchArticleSlugs = async (): Promise<{ slug: string }[]> => {
	return await client.fetch(slugsQuery);
};

// Articles by category
const articlesByCategoryQuery = `*[_type == "article" && lower(category->title) == lower($category) && language == $language] | order(date desc){
  title,
  lead,
  slug,
  date,
  ${illustrationFields},
  author->{ name },
  ${proseFields}
}`;

export const fetchArticlesByCategory = async (
	category: string,
	language: string
): Promise<Article[]> => {
	return await client.fetch(articlesByCategoryQuery, { category, language });
};

const settingsQuery = `*[_type == "settings" && language == $language ][0]{
  title,
  metaDescription,
  menu[] {
    _key,
    text,
    url,
    article-> {
      language,
      "slug": slug.current
    }
  },
  footer,
  language,
  frontPageBlocks[]{
    ...,
    _type == "egi-image" => {
      _type,
      title,
      photographer,
      persons,
      tags,
      asset->{
        _id,
        url,
        metadata { dimensions, lqip }
      }
    },
    _type == "cta-article" => {
      ${ctaArticleFields}
    },
    _type == "textbox" => {
      _type,
      prose
    },
    _type == "header-component" => {
      _type,
      title,
      image{
        _type,
        title,
        photographer,
        persons,
        tags,
        asset->{
          _id,
          url,
          metadata { dimensions, lqip,
            palette {
              muted{ background, title }
            }
          }
        }
      },
      ctas[]{ ${ctaArticleFields} }
    }
  }
}`;

export async function fetchSettings(language: string) {
	const settings = await client.fetch(settingsQuery, { language });
	return settings;
}

// Books

const bookListingFields = `
  _id,
  title,
  authors,
  editors,
  year,
  image,
  language
`;

const bookFields = `
  _id,
  _type,
  title,
  authors,
  editors,
  text,
  year,
  url,
  "assetUrl": file.asset->url,
  image{
    asset->{
      _id,
      url,
      metadata { dimensions, lqip }
    }
  },
  metaDescription,
  tags,
  language
`;

const booksQuery = `*[_type == "book" && language == $language] | order(year desc){
  ${bookListingFields}
}`;

export const fetchBooks = async (language: string): Promise<Book[]> => {
	return await client.fetch(booksQuery, { language });
};

const bookByIdQuery = `*[_type == "book" && _id == $id && language == $language][0]{
  ${bookFields}
}`;

export const fetchBookByLanguageAndId = async (language: string, id: string): Promise<Book> => {
	return await client.fetch(bookByIdQuery, { language, id });
};

// Recordings

const recordingListingFields = `
  _id,
  title,
  musicians,
  year,
  image,
  language
`;

const recordingFields = `
  _id,
  _type,
  title,
  musicians,
  text,
  image{
    asset->{
      _id,
      url,
      metadata { dimensions, lqip }
    }
  },
  year,
  url,
  tracks[]->{
    _id,
    title,
    "soundUrl": recording.asset->url
  },
  metaDescription,
  tags,
  language
`;

const recordingsQuery = `*[_type == "recording" && language == $language] | order(year desc){
  ${recordingListingFields}
}`;

export const fetchRecordings = async (language: string): Promise<Recording[]> => {
	return await client.fetch(recordingsQuery, { language });
};

const recordingByIdQuery = `*[_type == "recording" && _id == $id && language == $language][0]{
  ${recordingFields}
}`;

export const fetchRecordingByLanguageAndId = async (
	language: string,
	id: string
): Promise<Recording> => {
	return await client.fetch(recordingByIdQuery, { language, id });
};

// Sheet music

const sheetmusicListingFields = `
  _id,
  title,
  instruments,
  year,
  image,
  language
`;

const sheetmusicFields = `
  _id,
  _type,
  title,
  instruments,
  text,
  year,
  url,
  "noteUrl": file.asset->url,
  image{
    asset->{
      _id,
      url,
      metadata { dimensions, lqip }
    }
  },
  metaDescription,
  tags,
  language
`;

const sheetmusicsQuery = `*[_type == "sheetmusic" && language == $language] | order(year desc){
  ${sheetmusicListingFields}
}`;

export const fetchSheetmusics = async (language: string): Promise<Sheetmusic[]> => {
	return await client.fetch(sheetmusicsQuery, { language });
};

const sheetmusicByIdQuery = `*[_type == "sheetmusic" && _id == $id && language == $language][0]{
  ${sheetmusicFields}
}`;

export const fetchSheetmusicByLanguageAndId = async (
	language: string,
	id: string
): Promise<Sheetmusic> => {
	return await client.fetch(sheetmusicByIdQuery, { language, id });
};

// Videos

const videoListingFields = `
  _id,
  title,
  year,
  image,
  language
`;

const videoFields = `
  _id,
  _type,
  title,
  internalDescription,
  editors,
  text,
  year,
  url,
  "videoUrl": file.asset->url,
  image{
    asset->{
      _id,
      url,
      metadata { dimensions, lqip }
    }
  },
  metaDescription,
  tags,
  language
`;

const videosQuery = `*[_type == "video" && language == $language] | order(year desc){
  ${videoListingFields}
}`;

export const fetchVideos = async (language: string): Promise<Video[]> => {
	return await client.fetch(videosQuery, { language });
};

const videoByIdQuery = `*[_type == "video" && _id == $id && language == $language][0]{
  ${videoFields}
}`;

export const fetchVideoByLanguageAndId = async (language: string, id: string): Promise<Video> => {
	return await client.fetch(videoByIdQuery, { language, id });
};

// Events

const eventListingFields = `
  _id,
  title,
  dates,
  illustration,
  ticketlink
`;

const eventFields = `
  _id,
  title,
  dates,
  illustration,
  prose,
  tags,
  ticketlink
`;

const eventsQuery = `*[_type == "event" && language == $language && count(dates[starttime >= $today]) > 0] | order(dates[0].starttime asc){
  ${eventListingFields}
}`;

export const fetchEvents = async (language: string): Promise<Event[]> => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return await client.fetch(eventsQuery, { language, today: today.toISOString() });
};

const eventByIdQuery = `*[_type == "event" && _id == $id && language == $language][0]{
  ${eventFields}
}`;

export const fetchEventByLanguageAndId = async (language: string, id: string): Promise<Event> => {
	return await client.fetch(eventByIdQuery, { language, id });
};

// Content lists (content-list blocks embedded in article prose)

const contentListItemFields = `
  _id,
  _type,
  title,
  image,
  year,
  language,
  authors,
  musicians,
  instruments,
  editors
`;

const contentListItemsQuery = `*[_type in $types && language == $language && $tag in tags] | order(year asc){
  ${contentListItemFields}
}`;

export const fetchContentListItems = async (
	language: string,
	types: ContentListType[],
	tag: string
): Promise<ContentListItem[]> => {
	return await client.fetch(contentListItemsQuery, { language, types, tag });
};

// Sound (individual audio tracks, referenced by recording.tracks and content-list)

const soundFields = `
  _id,
  title,
  text,
  year,
  url,
 "soundUrl": recording.asset->url,
  tags,
  language
`;

const soundByIdQuery = `*[_type == "sound" && _id == $id && language == $language][0]{
  ${soundFields}
}`;

export const fetchSoundByLanguageAndId = async (language: string, id: string): Promise<Sound> => {
	return await client.fetch(soundByIdQuery, { language, id });
};

// Sitemap

const SITEMAP_TYPES = ['article', 'video', 'recording', 'sound', 'book', 'sheetmusic', 'event'];

export interface SitemapDocument {
	_type: (typeof SITEMAP_TYPES)[number];
	_id: string;
	_updatedAt: string;
	language: string;
	slug?: string;
}

const sitemapDocumentsQuery = `*[_type in $types && defined(language)]{
  _type,
  _id,
  _updatedAt,
  language,
  "slug": slug.current
}`;

export const fetchSitemapDocuments = async (): Promise<SitemapDocument[]> => {
	return await client.fetch(sitemapDocumentsQuery, { types: SITEMAP_TYPES });
};

const siteLanguagesQuery = `array::unique(*[_type == "settings" && defined(language)].language)`;

export const fetchSiteLanguages = async (): Promise<string[]> => {
	return await client.fetch(siteLanguagesQuery);
};
