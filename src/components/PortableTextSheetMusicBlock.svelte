<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
	import SheetMusicBlock from './SheetMusicBlock.svelte';
	import type { Sheetmusic } from '../lib/types';

	interface Props {
		portableText: CustomBlockComponentProps<Sheetmusic>;
	}

	const { portableText }: Props = $props();
	const value = $derived(portableText.value);
</script>

{#if value}
	<SheetMusicBlock sheetmusic={value} />
{/if}
