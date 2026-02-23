import EgiImage from './EgiImage.svelte';
import VideoBlock from './VideoBlock.svelte';
import Pullquote from './Pullquote.svelte';
import HeaderComponent from './HeaderComponent.svelte';
import Table from './Table.svelte';
import Endnote from './Endnote.svelte';

export const portableTextComponents = {
	types: {
		'egi-image': EgiImage,
		video: VideoBlock,
		pullquote: Pullquote,
		'header-component': HeaderComponent,
		table: Table
	},
	marks: {
		endnote: Endnote
	}
};
