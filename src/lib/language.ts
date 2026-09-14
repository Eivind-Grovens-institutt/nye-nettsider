// Language detection shared between hooks, layout and route loaders.
//
// The site does not restrict language to a fixed enum - any first path
// segment is treated as a language code (matching how Router.svelte /
// sanity-queries.ts already behave). We only need to special-case the
// static, non-language top-level routes so they don't get misread as a
// language ("/søk" must not resolve to language "søk").
const STATIC_TOP_LEVEL_ROUTES = ['søk', 'robots.txt', 'sitemap.xml'];

export function languageFromPath(pathname: string): string {
	const first = pathname.split('/').filter(Boolean)[0];
	if (!first || STATIC_TOP_LEVEL_ROUTES.includes(first)) return 'no';
	return first;
}
