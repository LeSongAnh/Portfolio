import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Post, User } from '@/types/post';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface Params {
  id: string;
}

interface Props {
  params: Promise<Params>;
}

async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      next: { revalidate: 3600 }, // Revalidate sau 1 giờ
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

async function getUser(userId: number): Promise<User | null> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.id);

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  return {
    title: post.title,
    description: post.body.substring(0, 160),
  };
}

export default async function BlogDetail({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.id);

  if (!post) {
    notFound();
  }

  const user = await getUser(post.userId);

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="mb-4">
              <Badge className="bg-blue-500 border-blue-600 text-white">
                Blog Post #{post.id}
              </Badge>
            </div>
            <h1 className="text-5xl font-bold text-white leading-tight">{post.title}</h1>
            {user && (
              <p className="text-blue-100 mt-4">
                By <strong>{user.name}</strong>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Article */}
            <article className="lg:col-span-2">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {post.body}
                </p>
              </div>

              {/* Author Info */}
              {user && (
                <Card className="mt-12 border-t-4 border-t-blue-600">
                  <h3 className="text-2xl font-bold mb-4">About the Author</h3>
                  <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span className="font-semibold">Name:</span>
                      <span>{user.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Username:</span>
                      <span>@{user.username}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Email:</span>
                      <span>{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="flex justify-between">
                        <span className="font-semibold">Phone:</span>
                        <span>{user.phone}</span>
                      </div>
                    )}
                    {user.company && (
                      <div className="flex justify-between">
                        <span className="font-semibold">Company:</span>
                        <span>{user.company.name}</span>
                      </div>
                    )}
                    {user.website && (
                      <div className="flex justify-between">
                        <span className="font-semibold">Website:</span>
                        <a
                          href={`https://${user.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                        >
                          {user.website}
                        </a>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Back Link */}
              <div className="mt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition"
                >
                  ← Back to Blog
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-20 border-l-4 border-l-blue-600">
                <h3 className="text-xl font-bold mb-4">Post Details</h3>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">Post ID</p>
                    <p>{post.id}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">Author ID</p>
                    <p>{post.userId}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">Total Posts</p>
                    <p>100 posts available</p>
                  </div>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
