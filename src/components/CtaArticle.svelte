<script lang="ts">
	import type { Article as ArticleType } from '../lib/types';
	import Article from './Article.svelte';
	import EgiImage from './EgiImage.svelte';
	import Modal from './Modal.svelte';

	let props: {
		value: {
			open: boolean;
			image?: any;
			text?: string;
			article: ArticleType;
		};
	} = $props();
	const value = props.value;
	let open = $state(Boolean(value.open));
	function toggle() {
		console.log('toggling ' + open);
		open = !open;
	}
	console.log(value);
</script>

<article class="cta">
	{#if value.image && value.image.asset}
		<EgiImage value={value.image} />
	{/if}

	{#if value.text}
		<button class="cta-text" type="button" onclick={toggle}>{value.text}</button>
	{/if}

	{#if open && value.article}
		<Modal
			linkHref={`/${value.article.language}/articles/${value.article.slug?.current}`}
			linkText="Les mer"
			onClose={toggle}
		>
			<Article article={value.article} />
		</Modal>
	{/if}
</article>

<style>
	.cta {
		border: 1px solid #ccc;
		padding: 1rem;
		border-radius: 6px;
	}

	.cta-text {
		margin: 1rem 0;
		font-size: 1rem;
		border: none;
		background: transparent;
	}
</style>
