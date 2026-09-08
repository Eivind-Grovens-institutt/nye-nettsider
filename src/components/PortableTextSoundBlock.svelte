<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
	import SoundPlayerBlock from './SoundPlayerBlock.svelte';
	import type { Sound } from '../lib/types';

	interface Props {
		portableText: CustomBlockComponentProps<{ value?: Sound }>;
	}

	const { portableText }: Props = $props();
	const value = $derived(portableText.value);
</script>

{#if value}
	<SoundPlayerBlock sound={value} />
{/if}
