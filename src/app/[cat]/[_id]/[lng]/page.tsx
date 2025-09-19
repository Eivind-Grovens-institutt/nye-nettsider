import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Link from "next/link";
import { Book } from "@/components/Book";
import { Disc } from "@/components/Disc";

const POST_QUERY = `*[_type == $cat && language == $lng && _id == $_id][0]`;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string, lng: string; }>;
}) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);

  let content;
  switch(post._type) {
    case 'book':
      content = <Book {...post} />;
      break;
    case 'recording':
      content = <Disc {...post} />;
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
