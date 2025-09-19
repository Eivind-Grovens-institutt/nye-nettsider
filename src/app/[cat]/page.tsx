import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Link from "next/link";

const POST_QUERY = `*[_type == $cat]`;

const options = { next: { revalidate: 30 } };

export default async function PostListPage({
  params,
}: {
  params: Promise<{ cat: string }>;
}) {
  const props = await params;
  const posts = await client.fetch<SanityDocument[]>(POST_QUERY, props, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <h1 className="text-4xl font-bold mb-8">Innhold</h1>
      <ul>
        {
            posts.map(post => <li key={post._id}><Link href={`/${post._type}/${post._id}/${post.language}`}>{post.title} ({post.language})</Link></li>)
        }
      </ul>
      <div className="prose">
      </div>
    </main>
  );
}
