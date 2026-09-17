<script lang="ts">
	import type { Article as ArticleType } from '../lib/types';

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
	const value = $derived(props.value);
</script>

<article class="cta" style="--bg: {props.bgColor}; --color: {props.textColor}">
	{#if value.text}
		<a
			class="cta-text"
			href={value.link
				? value.link
				: `/${value.article.language}/artikkel/${value.article.slug?.current}`}>{value.text}</a
		>
	{/if}
</article>

<style>
	.cta-text {
		display: inline-block;
		padding: 1rem;
		border-radius: 6px;
		border: 1px solid #ccc;
		font-size: 1.1rem;
		border: none;
		color: var(--color);
		background: var(--bg);
		font-variant: small-caps;
		font-family: sans-serif;
	}
</style>
