// queries.ts
import { proseFields, illustrationFields, ctaArticleFields } from './fragments';
import type { Article } from './types';
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
