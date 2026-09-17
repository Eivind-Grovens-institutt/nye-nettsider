import type { RequestHandler } from './$types';
import { SITE_URL } from '$lib/seo';
import {
	fetchSitemapDocuments,
	fetchSiteLanguages,
	type SitemapDocument
} from '$lib/sanity-queries';

function pathFor(doc: SitemapDocument): string {
	if (doc._type === 'article') return `/${doc.language}/artikkel/${doc.slug}`;
	if (doc._type === 'newsPost') return `/${doc.language}/nyhet/${doc.slug}`;
	return `/${doc.language}/${doc._type}/${doc._id}`;
}

function xmlEscape(value: string): string {
	return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Dynamically generated from the current Sanity dataset so it never drifts
// from the actual set of published pages.
export const GET: RequestHandler = async () => {
	const [docs, languages] = await Promise.all([fetchSitemapDocuments(), fetchSiteLanguages()]);

	const entries: { loc: string; lastmod?: string }[] = [{ loc: '/' }];
	for (const language of languages.length ? languages : ['no']) {
		entries.push({ loc: `/${language}` });
	}
	for (const doc of docs) {
		if ((doc._type === 'article' || doc._type === 'newsPost') && !doc.slug) continue;
		entries.push({ loc: pathFor(doc), lastmod: doc._updatedAt });
	}

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map((entry) => {
		const loc = xmlEscape(new URL(entry.loc, SITE_URL).toString());
		const lastmod = entry.lastmod ? `<lastmod>${entry.lastmod.slice(0, 10)}</lastmod>` : '';
		return `  <url><loc>${loc}</loc>${lastmod}</url>`;
	})
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
