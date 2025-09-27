<script lang="ts">
	export let value: {
		title?: string;
		url: string;
		poster?: any;
	};
</script>

<div class="video-block">
	<video controls {poster} src={value.url}>
		Sorry, your browser does not support embedded videos.
	</video>
	{#if value.title}
		<p class="caption">{value.title}</p>
	{/if}
</div>

<style>
	.video-block {
		margin: 2rem 0;
	}
	.video-block video {
		width: 100%;
		height: auto;
		border-radius: 6px;
	}
	.caption {
		font-size: 0.85rem;
		color: #555;
		margin-top: 0.5rem;
	}
</style>
