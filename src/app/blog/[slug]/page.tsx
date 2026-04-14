import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/data/posts';
import LikeButton from '@/components/LikeButton';
import Counter from '@/components/Counter';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return getAllPosts().map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Bài viết không tìm thấy',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getAllPosts()
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex gap-3 items-center mb-4">
              <span className="badge-blue">{post.category}</span>
              <span className="text-sm">📅 {new Date(post.date).toLocaleDateString('vi-VN')}</span>
            </div>
            <h1 className="text-5xl font-bold text-white">{post.title}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Article */}
            <article className="lg:col-span-2 prose max-w-none">
              {/* Render Markdown-like content */}
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('##')) {
                  return (
                    <h2 key={index} className="mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('```')) {
                  const codeContent = paragraph.replace(/```[a-z]*\n?/g, '');
                  return (
                    <pre key={index} className="mb-4">
                      <code>{codeContent}</code>
                    </pre>
                  );
                }
                if (paragraph.startsWith('-')) {
                  return (
                    <ul key={index} className="mb-4 ml-4">
                      {paragraph.split('\n').map((item, i) => (
                        <li key={i}>{item.replace(/^- /, '')}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}

              {/* Like Button */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-bold mb-4">Bạn thích bài viết này?</h3>
                <LikeButton initialLikes={24} postTitle={post.title} />
              </div>

              {/* Interactive Demo */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-bold mb-4">Thử tương tác - Client Component</h3>
                <Counter />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* About Post */}
              <div className="card mb-6 sticky top-20">
                <h3 className="font-bold mb-4">📌 Về bài viết</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>
                    <strong>Tác giả:</strong>
                    <br />
                    <span className="text-blue-600">{post.author}</span>
                  </div>
                  <div>
                    <strong>Chuyên mục:</strong>
                    <br />
                    <span className="badge badge-blue">{post.category}</span>
                  </div>
                  <div>
                    <strong>Ngày đăng:</strong>
                    <br />
                    {new Date(post.date).toLocaleDateString('vi-VN')}
                  </div>
                  <div>
                    <strong>Thời gian đọc:</strong>
                    <br />
                    ~{post.readTime} phút
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="card">
                  <h3 className="font-bold mb-4">🔗 Bài viết liên quan</h3>
                  <div className="space-y-3">
                    {relatedPosts.map(relatedPost => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition text-sm hover:text-blue-600"
                      >
                        {relatedPost.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-gray-50 border-t">
        <div className="container-custom max-w-3xl flex justify-between">
          <Link href="/blog" className="btn-secondary">
            ← Quay lại Blog
          </Link>
          <Link href="/" className="btn-primary">
            Trang chủ →
          </Link>
        </div>
      </section>
    </div>
  );
}
