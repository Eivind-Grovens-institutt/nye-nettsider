<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		onClose: () => void;
		linkHref?: string;
		linkText?: string;
	}
	let { children, onClose, linkHref, linkText }: Props = $props();

	const handleClose = () => {
		if (onClose) onClose();
	};
	const stopPropagation = function (event) {
		event.stopPropagation();
	};
</script>

<div class="modal-backdrop" onclick={handleClose} onkeydown={handleClose} role="none">
	<div
		class="modal-content"
		onclick={stopPropagation}
		onkeydown={stopPropagation}
		tabindex="-1"
		aria-modal="true"
		role="dialog"
	>
		<button class="close-btn" onclick={handleClose} aria-label="Close">&times;</button>
		{@render children()}
		{#if linkText}<a class="modal-link" href={linkHref}>{linkText}</a>{/if}
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		top: 1%;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal-content {
		background-color: #fff;
		padding: 2rem;
		max-width: 600px;
		max-height: 95vh;
		overflow-y: scroll;
		width: 90%;
		border-radius: 8px;
		position: relative;
		box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
	}

	.close-btn {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		background: transparent;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
	}

	.modal-link {
		display: inline-block;
		margin-top: 1rem;
		color: #0077cc;
		text-decoration: none;
	}

	.modal-link:hover {
		text-decoration: underline;
	}
</style>
