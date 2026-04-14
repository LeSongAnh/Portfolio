import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/data/posts';

interface Props {
  params: {
    slug: string[];
  };
}

export default function CatchAllBlog({ params }: Props) {
  // Nếu slug có nhiều phần, ta try lấy bài viết từ phần đầu
  const firstSlug = params.slug[0];
  const post = getPostBySlug(firstSlug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white">{post.title}</h1>
            <p className="text-lg mt-2 text-blue-100">{post.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Warning */}
      <section className="py-12 bg-yellow-50 border-b-2 border-yellow-300">
        <div className="container-custom max-w-3xl">
          <div className="bg-yellow-100 border border-yellow-400 p-4 rounded">
            <h3 className="font-bold text-yellow-800">⚠️ URL không chính xác</h3>
            <p className="text-yellow-700 mt-2">
              URL này được truy cập qua catch-all route. 
              Hãy sử dụng URL chính xác: <code className="bg-yellow-200 px-2 py-1">/blog/{post.slug}</code>
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              📅 Ngày: {new Date(post.date).toLocaleDateString('vi-VN')} | 
              ✍️ Tác giả: {post.author} | 
              ⏱️ Đọc: ~{post.readTime} phút
            </p>

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
              return (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex gap-4">
            <Link href="/blog" className="btn-secondary">
              ← Quay lại Blog
            </Link>
            <Link href={`/blog/${post.slug}`} className="btn-primary">
              Xem bài viết chính thức →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
