<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import EgiImage from './EgiImage.svelte';
	import type { Book } from '$lib/types';

	interface Props {
		book: Book;
	}

	const { book }: Props = $props();
</script>

<div class="recording-block">
	{#if book?.title}
		<p class="caption">{book.title}</p>
	{/if}
	{#if book?.image?.asset}
		<EgiImage
			portableText={{
				value: { ...book.image, size: 'half' }
			}}
		></EgiImage>
	{/if}
	{#if book?.text}
		<PortableText value={book.text} />
	{/if}
	{#if book?.assetUrl}<p>
			<a href={book.assetUrl}>Full tekst</a>
		</p>{/if}
</div>
<br />

<style>
	.recording-block {
		margin: 2rem 0;
	}
	.caption {
		font-size: 1.85rem;
		margin-top: 0.5rem;
	}
	br {
		clear: both;
	}
</style>
