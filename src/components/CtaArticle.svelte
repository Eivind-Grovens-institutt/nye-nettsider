<script lang="ts">
	import type { Article as ArticleType } from '../lib/types';
	import Article from './Article.svelte';
	import EgiImage from './EgiImage.svelte';
	import Modal from './Modal.svelte';

	let props: {
		textColor?: string;
		bgColor?: string;
		value: {
			open: boolean;
			image?: any;
			text?: string;
			// either article or link must be set, both is also allowed
			article?: ArticleType;
			link?: string;
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

<article class="cta" style="--bg: {props.bgColor}; --color: {props.textColor}">
	{#if value.image && value.image.asset}
		<EgiImage value={value.image} />
	{/if}

	{#if value.text}
		<button class="cta-text" type="button" onclick={toggle}>{value.text}</button>
	{/if}

	{#if open && value.article}
		<Modal
			linkHref={value.link
				? value.link
				: `/${value.article.language}/artikkel/${value.article.slug?.current}`}
			linkText="Les mer"
			onClose={toggle}
		>
			<Article article={value.article} />
		</Modal>
	{/if}
</article>

<style>
	.cta-text {
		padding: 1rem;
		border-radius: 6px;
		border: 1px solid #ccc;
		font-size: 1.1rem;
		border: none;
		color: var(--color);
		background: var(--bg);
	}
</style>
