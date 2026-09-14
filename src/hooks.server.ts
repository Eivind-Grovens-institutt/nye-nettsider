import type { Handle } from '@sveltejs/kit';
import { languageFromPath } from '$lib/language';
import { htmlLangFor } from '$lib/seo';

// Sets the <html lang> attribute per-request based on the URL, so it always
// matches the language of the rendered content instead of being hardcoded.
export const handle: Handle = async ({ event, resolve }) => {
	const language = htmlLangFor(languageFromPath(event.url.pathname));
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', language)
	});
};
