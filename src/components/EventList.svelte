<script lang="ts">
	import { fetchEvents } from '../lib/sanity-queries';
	import type { Event } from '../lib/types';
	import { resolve } from '$app/paths';
	interface Props {
		language: string;
	}

	const { language }: Props = $props();

	const formatDate = (starttime?: string) => {
		if (!starttime) return '';
		return new Date(starttime).toLocaleDateString('no-NO', { day: 'numeric', month: 'short' });
	};

	let events = $state<Event[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);

	$effect(() => {
		loading = true;
		error = null;
		fetchEvents(language)
			.then((result) => (events = result))
			.catch((e) => (error = e instanceof Error ? e.message : String(e)))
			.finally(() => (loading = false));
	});
</script>

{#if loading}
	<p class="events-status">Laster arrangementer …</p>
{:else if error}
	<p class="events-status error">Feil ved lasting av arrangementer: {error}</p>
{:else if events?.length}
	<section class="events">
		<h3 class="events-title">Kommende arrangementer</h3>
		<ol class="events-list">
			{#each events as event (event._id)}
				<li class="event">
					♫ <a class="events-row" tabindex="0" href={resolve(`/${language}/event/${event._id}`)}>
						<span class="title-cell">
							<span class="title">{event.title}</span>
						</span>
					</a>
					◆
					<span class="date-cell">{formatDate(event.dates?.[0]?.starttime)}</span>
					{#if event.ticketlink}
						◆ <a href={event.ticketlink}>billetter</a>{/if} ♫
				</li>
			{/each}
		</ol>
	</section>
{/if}

<style>
	.events {
		margin: 1.5rem 0;
		background: rgba(200, 200, 200, 0.8);
		width: 60%;
		margin: 1em auto;
	}

	.events-list {
		list-style-type: none;
		text-align: center;
	}

	.events-title {
		font-size: 0.95rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: #000;
		margin-bottom: 0.5rem;
		padding-bottom: 0.25rem;
		text-align: center;
	}
	a:link,
	a:visited {
		color: #000;
	}

	.event {
		cursor: pointer;
		display: block;
	}
	.title {
		font-weight: 600;
	}
	.date-cell {
		width: 70px;
		text-align: right;
		color: #333;
		font-size: 0.9rem;
	}
	.events-status.error {
		color: #a33;
	}
</style>
