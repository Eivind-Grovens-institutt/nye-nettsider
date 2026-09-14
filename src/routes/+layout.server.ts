import type { LayoutServerLoad } from './$types';
import { fetchSettings } from '$lib/sanity-queries';
import { languageFromPath } from '$lib/language';

// Fetched once per request, server-side, for every route (nav + footer +
// the language used for the html lang attribute). Individual page loads add
// their own content on top of this.
export const load: LayoutServerLoad = async ({ url }) => {
	const language = languageFromPath(url.pathname);
	const settings = await fetchSettings(language);
	return { settings, language };
};
