import type { PortableTextBlock } from '@portabletext/types';

// types.ts
export interface Slug {
	current: string;
}

export interface SanityPalette {
	muted?: {
		background?: string;
		foreground?: string;
		title?: string;
	};
}

export interface SanityImageMetadata {
	dimensions?: {
		width?: number;
		height?: number;
		aspectRatio?: number;
	};
	lqip?: string;
	palette?: SanityPalette;
}

export interface SanityImageAsset {
	_id: string;
	url: string;
	metadata?: SanityImageMetadata;
}

export interface Illustration {
	asset: SanityImageAsset;
	alt?: string;
}

export interface SanityImage {
	asset?: SanityImageAsset;
}

export interface Author {
	name: string;
}

export interface Category {
	title: string;
}

export interface EgiImageBlock {
	_type: 'egi-image';
	title?: string;
	photographer?: string;
	persons?: string[];
	tags?: string[];
	asset: SanityImageAsset;
}

export interface VideoBlock {
	_type: 'video';
	title?: string;
	url: string;
	poster?: {
		asset: SanityImageAsset;
	};
}

export interface PullquoteBlock {
	_type: 'pullquote';
	contents: string;
	quotee?: string;
	quoteeDesc?: string;
}

export type ProseBlock =
	| PortableTextBlock
	| EgiImageBlock
	| VideoBlock
	| PullquoteBlock
	| ContentListBlock;

export interface Article {
	title: string;
	lead?: string;
	illustration?: Illustration;
	prose?: ProseBlock[];
	author?: Author;
	category?: Category;
	metaDescription?: string;
	slug?: Slug;
	date?: string;
	frontPageQuote?: string;
	source?: string;
	language?: string;
	link?: string;
}

export interface CtaArticleBlock {
	_type: 'cta-article';
	text?: string;
	image?: EgiImageBlock;
	article?: {
		title: string;
		slug: { current: string };
	};
	link?: string;
}

export interface TextboxBlock {
	_type: 'textbox';
	prose?: PortableTextBlock[];
}

export interface HeaderComponentData {
	_id?: string;
	_type?: 'header-component';
	title?: string;
	ctas?: CtaArticleBlock[];
	image?: SanityImage;
}

export type FrontPageBlock = EgiImageBlock | CtaArticleBlock | TextboxBlock | HeaderComponentData;

export interface Settings {
	title: string;
	frontPageBlocks?: FrontPageBlock[];
	footer: TextboxBlock;
	language: string;
	menu: Array<{
		url: string;
		text: string;
		_key: string;
		article: {
			language: string;
			slug: string;
		};
	}>;
}

export interface EventDate {
	starttime?: string;
	endtime?: string;
}

export interface Track {
	_id: string;
	title: string;
	soundUrl?: string;
}

export interface Book {
	_id: string;
	title: string;
	authors?: string[];
	editors?: string[];
	text?: PortableTextBlock[];
	image?: SanityImage;
	year?: number;
	url?: string;
	assetUrl?: string;
	tags?: string[];
	language?: string;
}

export interface Recording {
	_id: string;
	title: string;
	musicians?: string[];
	text?: PortableTextBlock[];
	image?: SanityImage;
	year?: number;
	url?: string;
	tracks?: Track[];
	tags?: string[];
	language?: string;
}

export interface Sheetmusic {
	_id: string;
	title: string;
	instruments?: string[];
	text?: PortableTextBlock[];
	image?: SanityImage;
	year?: number;
	url?: string;
	noteUrl?: string;
	tags?: string[];
	language?: string;
}

export interface Video {
	_id: string;
	title: string;
	internalDescription?: string;
	editors?: string[];
	text?: PortableTextBlock[];
	image?: SanityImage;
	year?: number;
	url?: string;
	videoUrl?: string;
	tags?: string[];
	language?: string;
}

export interface Event {
	_id: string;
	title: string;
	dates?: EventDate[];
	illustration?: Illustration;
	prose?: ProseBlock[];
	ticketlink?: string;
	tags?: string[];
	language?: string;
}

export type ContentListType = 'video' | 'recording' | 'sound' | 'book' | 'sheetmusic';

export interface ContentListBlock {
	_type: 'content-list';
	_key?: string;
	contentType?: ContentListType[];
	tag?: string;
}

export interface ContentListItem {
	_id: string;
	_type: ContentListType;
	title: string;
	image?: SanityImage;
	year?: number;
	language?: string;
	authors?: string[];
	musicians?: string[];
	instruments?: string[];
	editors?: string[];
}

export interface Sound {
	_id: string;
	title: string;
	text?: PortableTextBlock[];
	year?: number;
	url?: string;
	soundUrl?: string;
	tags?: string[];
	language?: string;
}
