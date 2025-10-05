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

export type ProseBlock = any | EgiImageBlock | VideoBlock | PullquoteBlock;

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
}
