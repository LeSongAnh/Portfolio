import Link from 'next/link';
import type { Post } from '@/types/post';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      next: { revalidate: 3600 }, // Revalidate sau 1 giờ
    });
    if (!res.ok) return [];
    const posts: Post[] = await res.json();
    return posts.slice(0, 10); // Lấy 10 bài đầu tiên
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-12">
        <div className="container-custom">
          <h1 className="text-5xl font-bold text-white">Blog</h1>
          <p className="text-lg mt-2">Những bài viết về lập trình và công nghệ</p>
          <p className="text-orange-100 mt-2">Showing {posts.length} posts from JSONPlaceholder</p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Posts List */}
            <div className="lg:col-span-2">
              {posts.length === 0 ? (
                <Card className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">No posts available</p>
                </Card>
              ) : (
                <div className="space-y-6">
                  {posts.map(post => (
                    <Card key={post.id} className="hover:shadow-lg transition">
                      <div className="flex justify-between items-start mb-3 gap-4">
                        <div className="flex-1">
                          <Link 
                            href={`/blog/${post.id}`}
                            className="text-2xl font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition block"
                          >
                            {post.title}
                          </Link>
                        </div>
                        <Badge variant="default" className="flex-shrink-0">
                          #{post.id}
                        </Badge>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {post.body.substring(0, 200)}...
                      </p>

                      <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
                        <div className="flex gap-4">
                          <span>👤 User #{post.userId}</span>
                        </div>
                        <Link 
                          href={`/blog/${post.id}`}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition"
                        >
                          Read more →
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Stats */}
              <Card className="mb-6">
                <h3 className="font-bold mb-4">📊 Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Posts shown:</span>
                    <span className="font-semibold">{posts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total available:</span>
                    <span className="font-semibold">100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Data source:</span>
                    <span className="font-semibold">JSONPlaceholder</span>
                  </div>
                </div>
              </Card>

              {/* Info */}
              <Card className="sticky top-20">
                <h3 className="font-bold mb-4">ℹ️ About</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Posts are fetched from JSONPlaceholder API. Click on any post to read the full content and author information.
                </p>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
