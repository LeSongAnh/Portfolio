import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="container-custom">
          <h1 className="text-5xl font-bold text-white">Post Not Found</h1>
          <p className="text-lg mt-2">The blog post you're looking for doesn't exist</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container-custom max-w-2xl text-center">
          <div className="text-6xl mb-6">404</div>
          <h2 className="text-3xl font-bold mb-4">Oops! Post not found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, the blog post you're trying to access doesn't exist. It may have been deleted
            or the ID is incorrect.
          </p>
          <Link
            href="/blog"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            ← Back to Blog
          </Link>
        </div>
      </section>
    </div>
  );
}
