import { PortableText, PortableTextBlock } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type {  SanityAsset, SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
const { projectId, dataset } = client.config();

export type SheetmusicProps = {
    title: string;
    instruments: string[];
    poster: SanityImageSource;
    text: PortableTextBlock[];
    year: number;
    file: SanityAsset;
    language: string;
    _id: string;
    _type: "sheetmusic";
}
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).width(250).image(source)
    : null;

export function Sheetmusic({title, instruments, text, poster, year, file}: SheetmusicProps) {
return <div>
    <h1>{title}</h1>
    {poster ? <img src={urlFor(poster)?.url()} alt={title}></img> : null}

    {instruments ?
    <dl>
        <dt><b>Instrumenter</b></dt>
        { instruments.map(instrument => <dd key={instrument}>{instrument}</dd>) }
    </dl>

    : null}

{text ? <PortableText value={text} /> : null }
    <p><small>Publisert: {year}</small></p>
    {
        file ? <p><a href={file.url}>{file.url}</a></p> : null
    }
</div>

}
