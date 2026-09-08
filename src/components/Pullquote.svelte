<script lang="ts">
	import type { PullquoteBlock } from '$lib/types';
	import type { CustomBlockComponentProps } from '@portabletext/svelte';

	interface Props {
		portableText: CustomBlockComponentProps<{ value?: PullquoteBlock }>;
	}
	const { portableText }: Props = $props();
	const { value } = portableText;
</script>

{#if value}
	<blockquote class="pullquote">
		<p class="contents">“{value.contents}”</p>
		{#if value.quotee}
			<footer>
				— {value.quotee}{#if value.quoteeDesc}, <span>{value.quoteeDesc}</span>{/if}
			</footer>
		{/if}
	</blockquote>
{/if}

<style>
	.pullquote {
		border-left: 4px solid #444;
		padding-left: 1rem;
		margin: 2rem 0;
		font-style: italic;
	}
	.contents {
		font-size: 1.2rem;
		margin-bottom: 0.5rem;
	}
	footer {
		font-size: 0.9rem;
		color: #666;
	}
</style>
