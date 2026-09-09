import { client } from './sanity-client';
import groq from 'groq';

export interface SearchResult {
	_id: string;
	_type: string;
	title: string;
	slug?: string;
	excerpt?: string;
	language: string;
	score: number;
}

const searchQuery = groq`
	*[
		_type in ["article", "book", "event", "recording", "sheetmusic", "sound", "video"] &&
		(
			title match $term ||
			pt::text(prose) match $term ||
			pt::text(text) match $term
		)
	] | score(
		boost(title match $term, 3),
		boost(pt::text(prose) match $term, 1)
	) | order(_score desc) [0...20] {
		_id,
		_type,
		title,
		"slug": slug.current,
		"excerpt": pt::text(body)[0...160],
		"score": _score,
		language
	}
`;

export async function searchContent(term: string): Promise<SearchResult[]> {
	if (!term?.trim()) return [];

	// wildcard match on each word for partial matches
	const wildcardTerm = term
		.trim()
		.split(/\s+/)
		.map((w) => `${w}*`)
		.join(' ');

	return client.fetch(searchQuery, { term: wildcardTerm });
}
