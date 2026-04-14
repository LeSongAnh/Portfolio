import Link from 'next/link';
import { getAllPosts } from '@/data/posts';

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map(p => p.category)));

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-12">
        <div className="container-custom">
          <h1 className="text-5xl font-bold text-white">Blog</h1>
          <p className="text-lg mt-2">Những bài viết về Next.js, React và web development</p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Posts List */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {posts.map(post => (
                  <article key={post.slug} className="card">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
                        >
                          {post.title}
                        </Link>
                      </div>
                      <span className="badge badge-blue ml-2 flex-shrink-0">
                        {post.category}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{post.excerpt}</p>

                    <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 gap-2">
                      <div className="flex gap-4">
                        <span>📅 {new Date(post.date).toLocaleDateString('vi-VN')}</span>
                        <span>✍️ {post.author}</span>
                        <span>⏱️ {post.readTime}p đọc</span>
                      </div>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-blue-600 hover:text-blue-700 font-semibold transition"
                      >
                        Đọc thêm →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Search */}
              <div className="card mb-6">
                <h3 className="font-bold mb-4">🔍 Tìm kiếm</h3>
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Categories */}
              <div className="card sticky top-20">
                <h3 className="font-bold mb-4">📂 Chuyên mục</h3>
                <div className="space-y-2">
                  <Link 
                    href="/blog"
                    className="block px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Tất cả ({posts.length})
                  </Link>
                  {categories.map(category => {
                    const count = posts.filter(p => p.category === category).length;
                    return (
                      <Link
                        key={category}
                        href="#"
                        className="block px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                      >
                        {category} ({count})
                      </Link>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
