<script lang="ts">
	import { type MarkComponentProps } from '@portabletext/svelte';
	import { type PortableTextBlock } from '@portabletext/types';

	import { type Snippet } from 'svelte';

	interface EndnoteProps {
		_key: string;
		note: PortableTextBlock[];
	}

	interface Props {
		portableText: MarkComponentProps<
			EndnoteProps,
			// Use the second argument to specify your context's type
			{ endnotes: EndnoteProps[] }
		>;
		children: Snippet;
	}

	let { portableText, children }: Props = $props();
	let { endnotes } = $derived(portableText.global.context);

	// From the context, let's figure out what's the position of this footnote
	let number = $derived(endnotes.findIndex((note) => note._key === portableText.value._key) + 1);
</script>

<span id="src-{portableText.value._key}">
	{@render children()}
	<sup><a href={`#note-${portableText.value._key}`}>{number}</a></sup>
</span>
