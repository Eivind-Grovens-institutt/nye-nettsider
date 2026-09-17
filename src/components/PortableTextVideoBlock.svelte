<!-- VideoReferenceBlock.svelte -->
<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
	import VideoBlock from './VideoBlock.svelte';
	import type { Video } from '../lib/types';

	interface Props {
		portableText: CustomBlockComponentProps<Video>;
	}

	const { portableText }: Props = $props();
	const value = $derived(portableText.value);
</script>

{#if value}
	<VideoBlock video={value} />
{/if}
