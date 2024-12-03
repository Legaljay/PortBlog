import { getAllPosts } from '@/lib/source';
import Link from 'next/link';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="border-b pb-8">
            <Link href={`/blog/${post.id}`} className="block group">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600">
                {post.title}
              </h2>
              {post.description && (
                <p className="text-gray-600 mb-2">{post.description}</p>
              )}
              {post.date && (
                <time className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </time>
              )}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
