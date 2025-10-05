import EgiImage from './EgiImage.svelte';
import VideoBlock from './VideoBlock.svelte';
import Pullquote from './Pullquote.svelte';
import HeaderComponent from './HeaderComponent.svelte';

export const portableTextComponents = {
	types: {
		'egi-image': EgiImage,
		video: VideoBlock,
		pullquote: Pullquote,
		'header-component': HeaderComponent
	}
};
