import { PortableText, PortableTextBlock } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type {  SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
const { projectId, dataset } = client.config();

export type EventProps = {
    title: string;
    dates: {starttime: string; endtime: string; _key: string;}[];
    illustration: SanityImageSource;
    prose: PortableTextBlock[];
    _type: "event";
}
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).width(250).image(source)
    : null;

export function Event({title, dates, prose, illustration}: EventProps) {
return <div>
    <h1>{title}</h1>
    {illustration ? <img src={urlFor(illustration)?.url()} alt={title}></img> : null}

    {dates ?
    <dl>
        <dt><b>Datoer</b></dt>
        { dates.map(date => <dd key={date._key}>{date.starttime} - {date.endtime}</dd>) }
    </dl>

    : null}

    {prose ? <PortableText value={prose} /> : null }
</div>

}
