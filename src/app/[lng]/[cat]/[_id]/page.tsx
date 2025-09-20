import { /* PortableText,*/ type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Link from "next/link";
import { Book, BookProps } from "@/components/Book";
import { Disc, DiscProps } from "@/components/Disc";
import { Article, ArticleProps } from "@/components/Article";
import { Event, EventProps } from "@/components/Event";
import { Sheetmusic, SheetmusicProps } from "@/components/Sheetmusic";

const POST_QUERY = `*[_type == $cat && language == $lng && _id == $_id][0] { ..., "author": author->name }`;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string, lng: string, }>;
}) {
  const post : BookProps | DiscProps | ArticleProps | EventProps | SheetmusicProps = await client.fetch<SanityDocument & BookProps | SanityDocument & DiscProps | SanityDocument & ArticleProps | SanityDocument & EventProps | SanityDocument & SheetmusicProps>(POST_QUERY, await params, options);
console.log(JSON.stringify(post, null, 2))
  let content;
  switch(post._type) {
    case 'book':
      content = <Book {...post} />;
      break;
    case 'recording':
      content = <Disc {...post} />;
      break;
    case 'article':
      content = <Article {...post} />;
      break;
    case 'event':
      content = <Event {...post} />;
      break;
    case 'sheetmusic':
      content = <Sheetmusic {...post} />;
      break;
  }

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href={`/${post._type}`} className="hover:underline">
        ←
      </Link>
      <div className="prose">
        {content}
      </div>
    </main>
  );
}
