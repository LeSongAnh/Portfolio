export default function About() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
        <div className="container-custom">
          <h1 className="text-5xl font-bold text-white">Giới thiệu</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="prose">
            <h2>Xin chào, tôi là một lập trình viên Full-stack</h2>
            <p>
              Tôi có kinh nghiệm trong phát triển web với React, Next.js và các công nghệ hiện đại khác. 
              Tôi đam mê tạo ra những ứng dụng web mang lại giá trị thực tế cho người dùng.
            </p>

            <h2>Hành trình của tôi</h2>
            <p>
              Bắt đầu từ năm 2020, tôi đã khám phá thế giới phát triển web. Từ HTML/CSS cơ bản đến React hiện đại, 
              tôi luôn chuẩn bị sẵn sàng để học hỏi và cải thiện kỹ năng của mình.
            </p>

            <h2>Kỹ năng chính</h2>
            <ul>
              <li>JavaScript / TypeScript</li>
              <li>React & Next.js App Router</li>
              <li>Tailwind CSS & CSS3</li>
              <li>Node.js & API Development</li>
              <li>Database (PostgreSQL, MongoDB)</li>
              <li>Git & Version Control</li>
            </ul>

            <h2>Công cụ và công nghệ</h2>
            <ul>
              <li>VS Code, GitHub</li>
              <li>Vercel, Netlify</li>
              <li>Docker, Git</li>
              <li>Webpack, Vite</li>
            </ul>

            <h2>Khi nào tôi không lập trình</h2>
            <p>
              Khi không làm việc, tôi thích đọc sách về công nghệ, tham gia các cộng đồng lập trình, 
              và chia sẻ kinh nghiệm của mình thông qua blog.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-center mb-12">Bằng cấp & Chứng chỉ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="font-semibold">Dự án hoàn thành</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
              <p className="font-semibold">Khách hàng hài lòng</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">5+</div>
              <p className="font-semibold">Năm kinh nghiệm</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
