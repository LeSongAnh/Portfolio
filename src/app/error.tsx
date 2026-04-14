'use client';

import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center">
          <div className="container-custom text-center max-w-2xl mx-auto">
            <div className="text-7xl mb-6">💥</div>
            <h1 className="text-4xl font-bold mb-4 text-red-600">Ứng dụng gặp lỗi</h1>
            <p className="text-gray-600 mb-8 text-lg">
              Rất xin lỗi! Một điều gì đó không ổn. Vui lòng thử lạihoặc quay lại trang chủ.
            </p>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8 text-left max-h-32 overflow-auto">
              <p className="text-sm text-red-700 font-mono break-words">
                {error.message || 'Lỗi không xác định'}
              </p>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => reset()}
                className="btn-primary bg-red-600 hover:bg-red-700"
              >
                🔄 Thử lại
              </button>
              <Link href="/" className="btn-secondary">
                🏠 Quay lại trang chủ
              </Link>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              {error.digest && (
                <p>Error ID: {error.digest}</p>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
