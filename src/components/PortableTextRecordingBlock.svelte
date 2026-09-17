<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
	import RecordingBlock from './RecordingBlock.svelte';
	import type { Recording } from '../lib/types';

	interface Props {
		portableText: CustomBlockComponentProps<Recording>;
	}

	const { portableText }: Props = $props();
	const value = $derived(portableText.value);
</script>

{#if value}
	<RecordingBlock recording={value} />
{/if}
