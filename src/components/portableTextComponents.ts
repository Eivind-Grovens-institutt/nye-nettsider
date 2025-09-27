import EgiImage from './EgiImage.svelte';
import VideoBlock from './VideoBlock.svelte';
import Pullquote from './Pullquote.svelte';

export const portableTextComponents = {
	types: {
		'egi-image': EgiImage,
		video: VideoBlock,
		pullquote: Pullquote
	}
};
