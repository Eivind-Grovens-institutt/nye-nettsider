import type { PageServerLoad } from './$types';
import { searchContent } from '$lib/sanity-search';

export const load: PageServerLoad = async ({ url }) => {
	const q = url.searchParams.get('q') ?? '';
	const results = q ? await searchContent(q) : [];

	return { q, results };
};
