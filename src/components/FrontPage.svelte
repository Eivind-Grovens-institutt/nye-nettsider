<script lang="ts">
	import EgiImage from './EgiImage.svelte';
	import CtaArticle from './CtaArticle.svelte';
	import Textbox from './Textbox.svelte';
	import HeaderComponent from './HeaderComponent.svelte';

	export let settings: {
		title: string;
		frontPageBlocks?: any[];
	};

	// We want CTAs that are in order without any other components inbetween to be grouped
	const blocks = [];
	settings.frontPageBlocks?.forEach((block) => {
		if (['egi-image', 'textbox'].includes(block._type)) {
			blocks.push(block);
		} else if (block._type === 'cta-article') {
			const lastBlock = blocks[blocks.length - 1];
			if (lastBlock && lastBlock.type === 'cta-group') {
				lastBlock.items.push(block);
			} else {
				blocks.push({ type: 'cta-group', items: [block] });
			}
		} else if (block._type === 'header-component') {
			blocks.push(block);
		}
	});
</script>

<svelte:head>
	<title>eivindgroven.org</title>
</svelte:head>
<main class="frontpage">
	<section class="blocks">
		{#each blocks || [] as block}
			{#if block._type === 'egi-image'}
				<EgiImage value={block} />
			{:else if block.type === 'cta-group'}
				<section class="ctas ctas-{block.items.length}">
					{#each block.items as item}
						<CtaArticle value={item} />
					{/each}
				</section>
			{:else if block._type === 'textbox'}
				<Textbox value={block} />
			{:else if block._type === 'header-component'}
				<HeaderComponent {...block} />
			{/if}
		{/each}
	</section>
</main>

<style>
	.frontpage {
		margin: 0 auto;
		padding: 0;
		font-family: Georgia, serif;
	}

	.site-title {
		margin-bottom: 2rem;
		text-align: center;
	}

	.blocks {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.ctas {
		border: none;
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;
		gap: 1em;
	}

	.ctas-3 {
		flex-basis: 30%;
	}
</style>
