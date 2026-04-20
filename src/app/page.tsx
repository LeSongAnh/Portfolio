import Link from 'next/link';
import Image from 'next/image';
import Counter from '@/components/Counter';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-6 text-white">Xin chào! Mình tên là Lê Song Anh.</h1>
              <p className="text-xl mb-8 max-w-2xl">
                Mình là một sinh viên IT năm cuối với niềm đam mê sâu sắc dành cho Web Development. Việc học hỏi và áp dụng những công nghệ mới như React, WordPress, NodeJS để giải quyết các bài toán hằng ngày luôn là mục tiêu lớn nhất của mình.
              </p>
              <p className="text-xl mb-8 max-w-2xl">
                Xây dựng kiến trúc phần mềm sạch (Clean Code), tối ưu tốc độ và đem lại trải nghiệm thân thiện (UX/UI) cho người dùng là thước đo cho mọi sản phẩm mình làm ra.
              </p>
              <div className="flex gap-4 justify-center md:justify-start flex-wrap">
                <Link href="/about" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                  Xem thêm
                </Link>
                <Link href="/projects" className="btn-primary">
                  Xem dự án
                </Link>
                <Link href="/blog" className="btn-primary">
                  Đọc blog
                </Link>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-64 h-64">
                <Image
                  src="/me.jpg"
                  alt="Ảnh cá nhân"
                  fill
                  className="rounded-full shadow-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-center mb-12">Những kỹ năng chính của tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚛️',
                title: 'React & Next.js',
                description: 'Xây dựng ứng dụng fullstack hiện đại với App Router'
              },
              {
                icon: '🎨',
                title: 'Tailwind CSS',
                description: 'Thiết kế responsive UI với Tailwind CSS'
              },
              {
                icon: '📱',
                title: 'Responsive Design',
                description: 'Ứng dụng hoạt động tốt trên mọi thiết bị'
              },
            ].map((skill, index) => (
              <div key={index} className="card text-center">
                <div className="text-5xl mb-4">{skill.icon}</div>
                <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                <p className="text-gray-600">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counter Demo */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="mb-8">Thử tương tác</h2>
          <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl">
            <p className="text-gray-600 mb-6">
              Đây là một ví dụ về Client Component trong Next.js. Component này sử dụng React hooks để quản lý state.
            </p>
            <Counter />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="container-custom text-center">
          <h2 className="mb-6">Hãy liên hệ với tôi</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Bạn có một dự án hay ý tưởng? Tôi rất vui được hợp tác với bạn.
          </p>
          <Link href="/contact" className="btn-primary">
            Gửi tin nhắn
          </Link>
        </div>
      </section>
    </div>
  );
}
