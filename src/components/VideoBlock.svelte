<script lang="ts">
	import type { Video } from '$lib/types';

	interface Props {
		video: Video;
	}
	const { video }: Props = $props();
	console.log({ video });
</script>

<div class="video-block">
	{#if video.title}
		<p class="caption">{video.title}</p>
	{/if}
	<video controls poster={video.image?.asset?.url} src={video.videoUrl}>
		Sorry, your browser does not support embedded videos.
	</video>
</div>

<style>
	.video-block {
		margin: 2rem 0;
	}
	.video-block video {
		width: 100%;
		border-radius: 6px;
	}
	.caption {
		font-size: 1.85rem;
		margin-top: 0.5rem;
	}
</style>
