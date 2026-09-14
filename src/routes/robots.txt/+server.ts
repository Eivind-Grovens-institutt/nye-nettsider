import type { RequestHandler } from './$types';
import { SITE_URL } from '$lib/seo';

const body = `User-agent: *
Allow: /
Disallow: /søk

Sitemap: ${SITE_URL}/sitemap.xml
`;

export const GET: RequestHandler = () => {
	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
