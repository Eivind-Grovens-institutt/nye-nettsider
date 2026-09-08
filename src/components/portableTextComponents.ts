import ArticleListing from './ArticleListing.svelte';
import PortableTextBookBlock from './PortableTextBookBlock.svelte';
import ContentList from './ContentList.svelte';
import EgiImage from './EgiImage.svelte';
import Endnote from './Endnote.svelte';
import HeaderComponent from './HeaderComponent.svelte';
import Pullquote from './Pullquote.svelte';
import PortableTextRecordingBlock from './PortableTextRecordingBlock.svelte';
import PortableTextSheetMusicBlock from './PortableTextSheetMusicBlock.svelte';
import PortableTextSoundBlock from './PortableTextSoundBlock.svelte';
import Table from './Table.svelte';
import PortableTextVideoBlock from './PortableTextVideoBlock.svelte';

export const portableTextComponents = {
	types: {
		'egi-image': EgiImage,
		video: PortableTextVideoBlock,
		pullquote: Pullquote,
		'header-component': HeaderComponent,
		table: Table,
		'article-list': ArticleListing,
		recording: PortableTextRecordingBlock,
		sound: PortableTextSoundBlock,
		sheetmusic: PortableTextSheetMusicBlock,
		book: PortableTextBookBlock,
		'content-list': ContentList
		// listing modules for more of the above types?
	},
	marks: {
		endnote: Endnote
	}
};
