import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-12">
        <div className="container-custom">
          <h1 className="text-5xl font-bold">Không tìm thấy</h1>
        </div>
      </section>

      {/* 404 Content */}
      <section className="py-12 bg-white min-h-[50vh] flex items-center">
        <div className="container-custom max-w-2xl text-center mx-auto">
          <div className="text-9xl font-bold text-yellow-600 mb-4">404</div>
          <h2 className="text-3xl font-bold mb-4">Trang không tìm thấy</h2>
          <p className="text-gray-600 mb-8">
            Rất xin lỗi, bài viết bạn đang tìm không tồn tại hoặc đã bị xóa.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/blog" className="btn-primary">
              Quay lại Blog
            </Link>
            <Link href="/" className="btn-secondary">
              Trang chủ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
