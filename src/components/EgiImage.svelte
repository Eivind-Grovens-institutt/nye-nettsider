<script lang="ts">
	import imageUrlBuilder from '@sanity/image-url';

	export let value: {
		asset: any;
		title?: string;
		photographer?: string;
		persons?: string[];
		tags?: string[];
	};

	import { client } from '../lib/sanity-client';
	const builder = imageUrlBuilder(client);
	const urlFor = (source) => builder.image(source).url();
</script>

<figure class="egi-image">
	<img src={urlFor(value)} alt={value.title || ''} />
	{#if value.title || value.photographer || value.persons?.length}
		<figcaption>
			{#if value.title}<div>{value.title}</div>{/if}
			{#if value.photographer}<div>Foto: {value.photographer}</div>{/if}
			{#if value.persons?.length}<div>Personer: {value.persons.join(', ')}</div>{/if}
		</figcaption>
	{/if}
</figure>

<style>
	.egi-image {
		margin: 1.5rem 0;
	}
	.egi-image img {
		width: 100%;
		border-radius: 6px;
	}
	.egi-image figcaption {
		font-size: 0.85rem;
		color: #555;
		margin-top: 0.5rem;
	}
</style>
