import { PortableText, PortableTextBlock } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
const { projectId, dataset } = client.config();

export type ArticleProps = {
    title: string;
    lead: string;
    illustration: SanityImageSource;
    author: string;
    category: string;
    prose: PortableTextBlock[];
    slug: string;
    metaDescription: string;
    date: string;
    source: string;
    language: string;
    _type: "article";
}
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).width(250).image(source)
    : null;

export function Article({title, lead, illustration, prose, author, date}: ArticleProps) {
return <div>
    <h1>{title}</h1>
    <img src={urlFor(illustration)?.url()} alt={title}></img>
    {author ?
    <dl>
        <dt><b>Forfatter</b></dt>
        <dd key={author}>{author}</dd>
    </dl>

    : null}
{lead ? <div><b>{lead}</b></div> : null}
{prose ? <PortableText value={prose} /> : null }

    <p><small>Publisert: {date}</small></p>
</div>

}
