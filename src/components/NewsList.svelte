<script lang="ts">
	import { resolve } from '$app/paths';
	import type { NewsPost } from '../lib/types';

	interface Props {
		posts: NewsPost[];
		total: number;
		page: number;
		pageSize: number;
		language: string;
	}

	const { posts, total, page, pageSize, language }: Props = $props();

	const totalPages = $derived(Math.max(1, Math.ceil(total / pageSize)));

	const formatDate = (date?: string) => {
		if (!date) return '';
		return new Date(date).toLocaleDateString('no-NO', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};
</script>

<section class="news-list">
	<h1>Nyheter</h1>

	{#if posts.length > 0}
		<ul>
			{#each posts as post (post.slug?.current)}
				<li>
					<a href={resolve(`/${language}/nyhet/${post.slug?.current}`)}>
						<h2>{post.title}</h2>
						{#if post.date}<time datetime={post.date}>{formatDate(post.date)}</time>{/if}
						{#if post.lead}<p>{post.lead}</p>{/if}
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="empty">Ingen nyheter ennå.</p>
	{/if}

	{#if totalPages > 1}
		<nav class="pagination" aria-label="Sidenavigasjon">
			{#if page > 1}
				{#if page - 1 > 1}
					<a href={resolve(`/${language}/nyheter?side=${page - 1}`)}>← Nyere</a>
				{:else}
					<a href={resolve(`/${language}/nyheter`)}>← Nyere</a>
				{/if}
			{/if}
			<span>Side {page} av {totalPages}</span>
			{#if page < totalPages}
				<a href={resolve(`/${language}/nyheter?side=${page + 1}`)}>Eldre →</a>
			{/if}
		</nav>
	{/if}
</section>

<style>
	.news-list {
		max-width: 720px;
		margin: 0 auto;
		padding: 1.5rem;
		font-family: Georgia, serif;
	}

	ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	h2 {
		margin: 0 0 0.25rem;
	}

	time {
		display: block;
		font-size: 0.85rem;
		color: #777;
		margin-bottom: 0.25rem;
	}

	.empty {
		color: #666;
	}

	.pagination {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 2rem;
		font-size: 0.95rem;
	}

	.pagination span {
		color: #666;
	}
</style>
