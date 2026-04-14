import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center max-w-md">
        <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
        <h1 className="text-4xl font-bold mb-4">Trang không tìm thấy</h1>
        <p className="text-gray-600 mb-8">
          Trang bạn đang tìm không tồn tại. Hãy quay lại trang chủ hoặc khám phá các trang khác.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="btn-primary">
            🏠 Trang chủ
          </Link>
          <Link href="/blog" className="btn-secondary">
            📚 Blog
          </Link>
          <Link href="/projects" className="btn-secondary">
            💼 Dự án
          </Link>
        </div>
      </div>
    </div>
  );
}
