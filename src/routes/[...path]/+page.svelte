<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { fetchSettings } from '$lib/sanity-queries';
	import { onMount } from 'svelte';
	import type { Settings } from '$lib/types';
	import Router from '../../components/Router.svelte';
	import { resolve } from '$app/paths';
	export let params;

	let settings: Settings | null = null;
	onMount(async () => {
		const pathParts = (params.path ?? '').split(/\//g);
		const language = pathParts[0] || 'no';
		settings = await fetchSettings(language);
	});
</script>

<nav>
	<div class="nav-inner">
		<ul>
			{#if settings}
				{#each settings.menu as entry (entry._key)}
					<li>
						<!-- Icon slot: replace span with your icon component -->
						<a
							href={resolve(
								(entry.url ??
									`/${entry.article.language}/artikkel/${entry.article.slug}`) as `/${string}`
							)}
						>
							<span class="icon" aria-hidden="true"></span>
							{entry.text}
						</a>
					</li>
				{/each}
			{/if}
			<li>
				<form action="/søk">
					<span class="icon" aria-hidden="true"></span>
					<input type="search" name="q" placeholder="Søk" />
				</form>
			</li>
		</ul>
	</div>
</nav>

{#key params}
	<Router {params} {settings} />
{/key}

<style>
	/* Nav background spans full screen width */
	nav {
		width: 100%;
		background: #185fa5;
		font-variant: small-caps;
		font-family: sans-serif;
	}

	/* Inner wrapper: centered, 75% wide on desktop, full width on mobile/tablet */
	.nav-inner {
		width: 100%;
		margin: 0 auto;
	}

	ul {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		width: 100%;
	}

	/* Equal-size items, no gaps */
	li {
		flex: 1;
		display: flex;
	}

	a,
	form {
		display: flex;
		flex-direction: column; /* icon stacks above label */
		align-items: center;
		justify-content: center;
		gap: 0.25em;
		width: 100%;
		color: #fff;
		padding: 0.75em 0.5em;
		font-size: 1.1em;
		background: #185fa5;
		border-right: 1px solid rgba(255, 255, 255, 0.2);
		text-decoration: none;
		transition: background 0.15s ease;
	}

	li:last-child a,
	li:last-child form {
		border-right: none;
	}

	a:hover,
	a:focus-visible {
		background: #0c447c;
		outline: none;
	}

	/* Icon placeholder — swap for actual icon elements */
	.icon {
		display: block;
		width: 1.25em;
		height: 1.25em;
		/* Icons will size naturally once added */
	}

	/* Search item fills its flex cell like the others */
	form {
		border: none;
	}

	input[type='search'] {
		background: rgba(255, 255, 255, 0.15);
		color: #fff;
		padding: 0.2em 0.6em;
		font-size: 0.85rem;
		border: 1px solid rgba(255, 255, 255, 0.4);
		border-radius: 0;
		width: 100%;
		max-width: 9em;
	}

	input[type='search']::placeholder {
		color: rgba(255, 255, 255, 0.6);
	}

	/* Desktop: center the menu content at 75% */
	@media (min-width: 1024px) {
		.nav-inner {
			width: 75%;
		}

		a,
		form {
			font-size: 1.3em;
		}
	}
</style>
