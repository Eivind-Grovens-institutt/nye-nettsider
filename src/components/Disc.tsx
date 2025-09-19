import { PortableText, PortableTextBlock } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityAsset, SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
const { projectId, dataset } = client.config();

export type DiscProps = {
    title: string;
    musicians: string[];
    poster: SanityImageSource;
    text: PortableTextBlock[];
    year: number;
    url: string;
    recording: SanityAsset;
    _type: "recording";
}
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).width(250).image(source)
    : null;

export function Disc({title, musicians, text, poster, year, url, recording}: DiscProps) {
return <div>
    <h1>{title}</h1>
    {poster ? <img src={urlFor(poster)?.url()} alt={title}></img> : null}

    {musicians ?
    <dl>
        <dt><b>Forfattere</b></dt>
        { musicians.map(musician => <dd key={musician}>{musician}</dd>) }
    </dl>

    : null}

    {text ? <PortableText value={text} /> : null }
    <p><small>Utgitt: {year}</small></p>
    {
        url ? <p><a href={url}>{url}</a></p> : null
    }
    {
        recording ? <p><a href={recording.url}>{recording.url}</a></p> : null
    }
</div>

}
