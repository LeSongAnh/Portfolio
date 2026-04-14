'use client';

import Link from 'next/link';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="container-custom">
          <h1 className="text-5xl font-bold">Có lỗi xảy ra</h1>
        </div>
      </section>

      {/* Error Content */}
      <section className="py-12 bg-white">
        <div className="container-custom max-w-2xl text-center">
          <div className="text-6xl mb-6">😕</div>
          <h2 className="text-3xl font-bold mb-4">Rất xin lỗi!</h2>
          <p className="text-gray-600 mb-8">
            Có một lỗi kỹ thuật đã xảy ra khi tải trang này. 
            Vui lòng thử lại hoặc quay lại trang chủ.
          </p>

          <div className="bg-red-50 border border-red-200 rounded p-4 mb-8 text-left">
            <p className="text-sm text-red-700 font-mono">
              {error.message || 'Lỗi không xác định'}
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="btn-primary"
            >
              Thử lại
            </button>
            <Link href="/blog" className="btn-secondary">
              Quay lại Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
