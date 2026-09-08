<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
	import BookBlock from './BookBlock.svelte';
	import type { Book } from '../lib/types';

	interface Props {
		portableText: CustomBlockComponentProps<{ value?: Book }>;
	}

	const { portableText }: Props = $props();
	const value = $derived(portableText.value);
</script>

{#if value}
	<BookBlock book={value} />
{/if}
