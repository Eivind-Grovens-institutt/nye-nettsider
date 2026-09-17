<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { portableTextComponents } from './portableTextComponents';
	import imageUrlBuilder from '@sanity/image-url';
	import { client } from '../lib/sanity-client';
	import type { Event } from '../lib/types';

	interface Props {
		event: Event;
	}

	const { event }: Props = $props();

	const builder = imageUrlBuilder(client);
	const urlFor = (source: any) => builder.image(source).width(800).url();

	const formatDate = (starttime?: string) => {
		if (!starttime) return '';
		return new Date(starttime).toLocaleDateString('no-NO', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	const formatTime = (starttime?: string) => {
		if (!starttime) return '';
		return new Date(starttime).toLocaleTimeString('no-NO', {
			hour: '2-digit',
			minute: '2-digit'
		});
	};
</script>

<div class="event-block">
	<h2>{event.title}</h2>

	{#if event.illustration}
		<img
			src={urlFor(event.illustration)}
			alt={event.illustration.asset?.altText || event.title}
			class="illustration"
		/>
	{/if}

	{#if event.ticketlink}
		<div class="link">
			<a href={event.ticketlink}>Kjøp billett!</a>
		</div>
	{/if}

	{#if event.dates?.length}
		<ul class="dates">
			{#each event.dates as date, i (i)}
				<li>
					<span class="date">{formatDate(date.starttime)}</span>
					{#if date.starttime}
						<span class="time"
							>kl. {formatTime(date.starttime)}{date.endtime ? ` – ${date.endtime}` : ''}</span
						>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}

	{#if event.prose}
		<div class="prose">
			<PortableText value={event.prose} components={portableTextComponents} />
		</div>
	{/if}
</div>

<style>
	.event-block {
		margin: 1rem 0;
	}
	.illustration {
		width: 100%;
		height: auto;
		border-radius: 8px;
		margin: 1rem 0;
	}
	.dates {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
	}
	.dates li {
		margin-bottom: 0.25rem;
	}
	.date {
		font-weight: 600;
		text-transform: capitalize;
	}
	.time {
		color: #666;
		margin-left: 0.5rem;
	}
	.link {
		padding: 0;
		margin-top: 1rem;
		font-size: larger;
	}
</style>
