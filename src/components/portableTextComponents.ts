import EgiImage from './EgiImage.svelte';
import VideoBlock from './VideoBlock.svelte';
import Pullquote from './Pullquote.svelte';
import HeaderComponent from './HeaderComponent.svelte';
import Table from './Table.svelte';
import Endnote from './Endnote.svelte';
import ArticleListing from './ArticleListing.svelte';
import RecordingBlock from './RecordingBlock.svelte';
import SoundPlayerBlock from './SoundPlayerBlock.svelte';
import SheetMusicBlock from './SheetMusicBlock.svelte';
import BookBlock from './BookBlock.svelte';

export const portableTextComponents = {
	types: {
		'egi-image': EgiImage,
		video: VideoBlock,
		pullquote: Pullquote,
		'header-component': HeaderComponent,
		table: Table,
		'article-list': ArticleListing,
		recording: RecordingBlock,
		sound: SoundPlayerBlock,
		sheetmusic: SheetMusicBlock,
		book: BookBlock
		// listing modules for more of the above types?
	},
	marks: {
		endnote: Endnote
	}
};
