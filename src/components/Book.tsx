import { PortableText, PortableTextBlock } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityAsset, SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
const { projectId, dataset } = client.config();

export type BookProps = {
    title: string;
    authors: string[];
    editors: string[];
    text: PortableTextBlock[];
    image: SanityImageSource;
    year: number;
    url: string;
    file: SanityAsset;
    _type: "book";
}
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).width(250).image(source)
    : null;

export function Book({title, authors, editors, text, image, year, url, file}: BookProps) {
return <div>
    <h1>{title}</h1>
    <img src={urlFor(image)?.url()} alt={title}></img>
    {authors ?
    <dl>
        <dt><b>Forfattere</b></dt>
        { authors.map(author => <dd key={author}>{author}</dd>) }
    </dl>

    : null}
   {
    editors ? <dl>
        <dt><b>Redaktører</b></dt>
        { editors.map(editor => <dd key={editor}>{editor}</dd>) }
    </dl> : null
   }

{text ? <PortableText value={text} /> : null }
    <p><small>Publisert: {year}</small></p>
    {
        url ? <p><a href={url}>{url}</a></p> : null
    }
    {
        file ? <p><a href={file.url}>{file.url}</a></p> : null
    }
</div>

}
