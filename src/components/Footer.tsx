export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">Về tôi</h3>
            <p className="text-gray-400">
              Lập trình viên NextJS đam mê xây dựng những ứng dụng web hiện đại và hiệu quả.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition">Trang chủ</a></li>
              <li><a href="/about" className="hover:text-white transition">Giới thiệu</a></li>
              <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
              <li><a href="/projects" className="hover:text-white transition">Dự án</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: hello@portfolio.com</li>
              <li>Phone: +84 123 456 789</li>
              <li>
                <a href="#" className="hover:text-white transition">GitHub</a>
                {' | '}
                <a href="#" className="hover:text-white transition">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} My Portfolio. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
