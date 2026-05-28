<script lang="ts">
	export interface SanityTableRow {
		_key?: string;
		_type?: string;
		cells: string[];
	}

	export interface SanityTableData {
		_type?: string;
		rows: SanityTableRow[];
	}
	import type { CustomBlockComponentProps } from '@portabletext/svelte';

	interface Props {
		portableText: CustomBlockComponentProps<{
			value?: SanityTableData;
			firstRowIsHeader: boolean;
			firstColumnIsHeader: boolean;
		}>;
	}

	const { portableText, firstRowIsHeader, firstColumnIsHeader } = $props();
	const value = $derived(portableText.value);

	const rows = $derived(value?.rows ?? []);
	const hasRows = $derived(rows.length > 0);
	const headerRow = $derived(firstRowIsHeader && hasRows ? rows[0] : null);
	const bodyRows = $derived(firstRowIsHeader && hasRows ? rows.slice(1) : rows);

	// Detect bi-directional table: first row header, first cell of header is empty
	const isBiDirectional = $derived(
		firstRowIsHeader && firstColumnIsHeader && headerRow != null && headerRow.cells[0] === ''
	);
	console.log(value);
</script>

{#if hasRows}
	<div class="sanity-table-wrapper">
		<table class="sanity-table">
			{#if headerRow}
				<thead>
					<tr>
						{#each headerRow.cells as cell, i (cell._key)}
							<th scope={isBiDirectional && i === 0 ? undefined : 'col'} class:empty={cell === ''}
								>{cell}</th
							>
						{/each}
					</tr>
				</thead>
			{/if}

			<tbody>
				{#each bodyRows as row (row._key ?? row)}
					<tr>
						{#each row.cells as cell, i}
							{#if isBiDirectional && i === 0}
								<th scope="row">{cell}</th>
							{:else}
								<td>{cell}</td>
							{/if}
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<p class="sanity-table-empty">No table data available.</p>
{/if}

<style>
	.sanity-table-wrapper {
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}

	.sanity-table {
		border-collapse: collapse;
		width: 100%;
		min-width: 320px;
		font-size: 0.9rem;
		line-height: 1.5;
	}

	/* ── Header ─────────────────────────────── */
	.sanity-table thead tr {
		background-color: #1a1a2e;
		color: #e2e8f0;
	}

	.sanity-table thead th {
		padding: 0.75rem 1rem;
		text-align: left;
		font-weight: 600;
		letter-spacing: 0.03em;
		white-space: nowrap;
		border-bottom: 2px solid #4a5568;
	}

	.sanity-table thead th.empty {
		background-color: transparent;
	}

	/* ── Body rows ───────────────────────────── */
	.sanity-table tbody tr {
		transition: background-color 0.15s ease;
	}

	.sanity-table tbody tr:nth-child(even) {
		background-color: #f7fafc;
	}

	.sanity-table tbody tr:hover {
		background-color: #ebf4ff;
	}

	.sanity-table tbody td,
	.sanity-table tbody th[scope='row'] {
		padding: 0.65rem 1rem;
		border-bottom: 1px solid #e2e8f0;
		color: #2d3748;
		text-align: left;
	}

	.sanity-table tbody th[scope='row'] {
		font-weight: 600;
		color: #1a202c;
		background-color: #edf2f7;
		white-space: nowrap;
		border-right: 2px solid #cbd5e0;
	}

	/* Last row — no bottom border */
	.sanity-table tbody tr:last-child td,
	.sanity-table tbody tr:last-child th[scope='row'] {
		border-bottom: none;
	}

	/* ── Empty state ─────────────────────────── */
	.sanity-table-empty {
		color: #718096;
		font-style: italic;
		font-size: 0.9rem;
	}
</style>
