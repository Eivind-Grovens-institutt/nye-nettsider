<script lang="ts">
	import {
		fetchContentListItems,
		fetchVideoByLanguageAndId,
		fetchRecordingByLanguageAndId,
		fetchSoundByLanguageAndId,
		fetchBookByLanguageAndId,
		fetchSheetmusicByLanguageAndId,
		fetchNewsPostsByTag
	} from '../lib/sanity-queries';
	import type {
		ContentListBlock,
		ContentListItem,
		GenericContentListType,
		NewsPost
	} from '../lib/types';
	import imageUrlBuilder from '@sanity/image-url';
	import { client } from '../lib/sanity-client';
	import { resolve } from '$app/paths';
	import Modal from './Modal.svelte';
	import VideoBlock from './VideoBlock.svelte';
	import RecordingBlock from './RecordingBlock.svelte';
	import SoundPlayerBlock from './SoundPlayerBlock.svelte';
	import BookBlock from './BookBlock.svelte';
	import SheetMusicBlock from './SheetMusicBlock.svelte';
	import type { CustomBlockComponentProps } from '@portabletext/svelte';

	interface Props {
		portableText: CustomBlockComponentProps<{ value?: ContentListBlock }>;
	}

	const { portableText }: Props = $props();
	const value = $derived(portableText.value);
	const context = $derived(portableText.global.context as { language?: string } | undefined);

	const builder = imageUrlBuilder(client);
	const urlFor = (source: any) => (source.asset ? builder.image(source).width(80).url() : null);

	const typeLabels: Record<GenericContentListType, string> = {
		video: 'Video',
		recording: 'Plateutgivelser',
		sound: 'Lydfiler',
		book: 'Bøker',
		sheetmusic: 'Noter'
	};

	const typeOrder: GenericContentListType[] = ['video', 'recording', 'sound', 'book', 'sheetmusic'];

	const blockComponents: Record<GenericContentListType, any> = {
		video: VideoBlock,
		recording: RecordingBlock,
		sound: SoundPlayerBlock,
		book: BookBlock,
		sheetmusic: SheetMusicBlock
	};

	const detailFetchers: Record<
		GenericContentListType,
		(language: string, id: string) => Promise<any>
	> = {
		video: fetchVideoByLanguageAndId,
		recording: fetchRecordingByLanguageAndId,
		sound: fetchSoundByLanguageAndId,
		book: fetchBookByLanguageAndId,
		sheetmusic: fetchSheetmusicByLanguageAndId
	};

	const subtitleFor = (item: ContentListItem): string | undefined => {
		switch (item._type) {
			case 'book':
				return item.authors?.join(', ');
			case 'recording':
				return item.musicians?.join(', ');
			case 'sheetmusic':
				return item.instruments?.join(', ');
			case 'video':
				return item.editors?.join(', ');
			default:
				return undefined;
		}
	};

	let items = $state<ContentListItem[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);

	let grouped = $derived.by(() => {
		const groups: Partial<Record<GenericContentListType, ContentListItem[]>> = {};
		for (const item of items) {
			(groups[item._type] ??= []).push(item);
		}
		return typeOrder
			.filter((type) => groups[type]?.length)
			.map((type) => ({ type, groupItems: groups[type]! }));
	});

	$effect(() => {
		const language = context?.language ?? 'no';
		// 'newsPost' is fetched separately below - it doesn't fit the
		// "one row per item, opens a modal" shape the other types share.
		const types = (value?.contentType ?? []).filter(
			(t: string): t is GenericContentListType => t !== 'newsPost'
		);
		const tag = value?.tag;

		if (!types.length || !tag) {
			loading = false;
			return;
		}

		loading = true;
		error = null;
		fetchContentListItems(language, types, tag)
			.then((result) => (items = result))
			.catch((e) => (error = e instanceof Error ? e.message : String(e)))
			.finally(() => (loading = false));
	});

	const NEWS_SECTION_LIMIT = 10;

	let newsPosts = $state<NewsPost[]>([]);
	let newsTotal = $state(0);
	let newsLoading = $state(true);

	const formatDate = (date?: string) => {
		if (!date) return '';
		return new Date(date).toLocaleDateString('no-NO', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	$effect(() => {
		const language = context?.language ?? 'no';
		const tag = value?.tag;
		const includeNews = value?.contentType?.includes('newsPost');

		if (!includeNews || !tag) {
			newsLoading = false;
			newsPosts = [];
			newsTotal = 0;
			return;
		}

		newsLoading = true;
		fetchNewsPostsByTag(language, tag, NEWS_SECTION_LIMIT)
			.then((result) => {
				newsPosts = result.posts;
				newsTotal = result.total;
			})
			.catch((e) => {
				console.error(e);
				newsPosts = [];
				newsTotal = 0;
			})
			.finally(() => (newsLoading = false));
	});

	let modalOpen = $state(false);
	let modalType = $state<GenericContentListType | null>(null);
	let modalData = $state<any>(null);
	let modalLoading = $state(false);
	let modalError = $state<string | null>(null);

	const openItem = async (item: ContentListItem) => {
		console.log({ item });
		const language = context?.language ?? 'no';
		modalOpen = true;
		modalType = item._type;
		modalData = null;
		modalError = null;
		modalLoading = true;
		try {
			modalData = await detailFetchers[item._type](language, item._id);
			console.log({ modalData });
		} catch (e) {
			modalError = e instanceof Error ? e.message : String(e);
			console.log(e);
		} finally {
			modalLoading = false;
		}
	};

	const closeModal = () => {
		modalOpen = false;
		modalType = null;
		modalData = null;
		modalError = null;
	};

	const handleRowKeydown = (event: KeyboardEvent, item: ContentListItem) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			openItem(item);
		}
	};
</script>

{#if loading}
	<p class="content-list-status">Laster innhold …</p>
{:else if error}
	<p class="content-list-status error">Feil ved lasting av innhold: {error}</p>
{:else if items.length}
	{#each grouped as { type, groupItems } (type)}
		<section class="content-group">
			<h3 class="content-group-title">{typeLabels[type]}</h3>
			<table class="content-table">
				<tbody>
					{#each groupItems as item (item._id)}
						<tr
							class="content-row"
							tabindex="0"
							role="button"
							onclick={() => openItem(item)}
							onkeydown={(e) => handleRowKeydown(e, item)}
						>
							<td class="thumb-cell">
								{#if item.image?.asset}
									<img
										src={urlFor(item.image)}
										alt={item.image.asset.altText || ''}
										class="thumb"
									/>
								{/if}
							</td>
							<td class="title-cell">
								<span class="title">{item.title}</span>
								{#if subtitleFor(item)}
									<span class="subtitle">{subtitleFor(item)}</span>
								{/if}
							</td>
							<td class="year-cell">{item.year ?? ''}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</section>
	{/each}
{/if}

{#if !newsLoading && newsPosts.length}
	<section class="content-group">
		<h3 class="content-group-title">Nyheter</h3>
		<ul class="news-items">
			{#each newsPosts as post (post._id)}
				<li>
					<a href={resolve(`/${context?.language ?? 'no'}/nyhet/${post.slug?.current}`)}>
						<span class="title">{post.title}</span>
						{#if post.date}<time datetime={post.date}>{formatDate(post.date)}</time>{/if}
					</a>
				</li>
			{/each}
		</ul>
		{#if newsTotal > NEWS_SECTION_LIMIT}
			<a class="see-all" href={resolve(`/${context?.language ?? 'no'}/nyheter`)}>
				Alle {newsTotal} nyheter →
			</a>
		{/if}
	</section>
{/if}

{#if modalOpen && modalType}
	<Modal
		onClose={closeModal}
		linkHref={`/${context?.language ?? 'no'}/${modalType}/${modalData?._id ?? ''}`}
		linkText=""
	>
		{#if modalLoading}
			<p class="content-list-status">Laster …</p>
		{:else if modalError}
			<p class="content-list-status error">Feil ved lasting av innhold: {modalError}</p>
		{:else if modalData}
			{@const SelectedBlock = blockComponents[modalType]}
			<SelectedBlock {...{ [modalType]: modalData }} />
		{/if}
	</Modal>
{/if}

<style>
	.content-group {
		margin: 1.5rem 0;
	}

	.content-group-title {
		font-size: 0.95rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: #777;
		margin-bottom: 0.5rem;
		border-bottom: 1px solid #ddd;
		padding-bottom: 0.25rem;
	}

	.content-table {
		width: 100%;
		border-collapse: collapse;
	}

	.content-row {
		cursor: pointer;
	}

	.content-row:hover,
	.content-row:focus-visible {
		background: #f5f5f5;
		outline: none;
	}

	.content-table td {
		padding: 0.5rem 0.5rem;
		border-bottom: 1px solid #eee;
		vertical-align: middle;
	}

	.thumb-cell {
		width: 40px;
	}

	.thumb {
		width: 36px;
		height: 36px;
		object-fit: cover;
		border-radius: 3px;
		display: block;
	}

	.title-cell {
		display: flex;
		flex-direction: column;
	}

	.title {
		font-weight: 600;
	}

	.subtitle {
		font-size: 0.85rem;
		color: #666;
	}

	.year-cell {
		width: 60px;
		text-align: right;
		color: #888;
		font-size: 0.9rem;
	}

	.content-list-status.error {
		color: #a33;
	}

	.news-items {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}

	.news-items li {
		border-bottom: 1px solid #eee;
	}

	.news-items a {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		padding: 0.5rem 0;
		color: inherit;
		text-decoration: none;
	}

	.news-items a:hover,
	.news-items a:focus-visible {
		text-decoration: underline;
	}

	.news-items time {
		flex-shrink: 0;
		color: #888;
		font-size: 0.9rem;
	}

	.see-all {
		display: inline-block;
		margin-top: 0.75rem;
		font-weight: 600;
	}
</style>
