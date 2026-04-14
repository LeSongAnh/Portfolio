export default function Projects() {
  const projects = [
    {
      id: '1',
      title: 'Portfolio Website',
      description: 'Website portfolio cá nhân được xây dựng với Next.js, Tailwind CSS với đầy đủ Blog và Projects showcase.',
      tech: ['Next.js', 'Tailwind CSS', 'TypeScript'],
      status: 'Completed',
    },
    {
      id: '2',
      title: 'E-Commerce Platform',
      description: 'Nền tảng thương mại điện tử hoàn chỉnh với giỏ hàng, thanh toán, và quản lý sản phẩm.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'In Progress',
    },
    {
      id: '3',
      title: 'Task Management App',
      description: 'Ứng dụng quản lý công việc với tính năng real-time collaboration và notifications.',
      tech: ['Next.js', 'Firebase', 'Tailwind CSS'],
      status: 'Completed',
    },
    {
      id: '4',
      title: 'Weather Dashboard',
      description: 'Dashboard thời tiết với dự báo theo giờ, theo tuần và các widget thông tin chi tiết.',
      tech: ['React', 'OpenWeather API', 'Chart.js'],
      status: 'Completed',
    },
    {
      id: '5',
      title: 'Social Media App',
      description: 'Ứng dụng mạng xã hội với tính năng đăng bài, bình luận, like và theo dõi người dùng.',
      tech: ['Next.js', 'PostgreSQL', 'WebSocket'],
      status: 'In Progress',
    },
    {
      id: '6',
      title: 'AI Chat Bot',
      description: 'Chatbot thông minh được cấp quyền bởi OpenAI với các tính năng hội thoại tự nhiên.',
      tech: ['Next.js', 'OpenAI API', 'Tailwind CSS'],
      status: 'Completed',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'badge-green';
      case 'In Progress':
        return 'badge-blue';
      default:
        return 'badge-purple';
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-12">
        <div className="container-custom">
          <h1 className="text-5xl font-bold text-white">Dự án của tôi</h1>
          <p className="text-lg mt-2">Những dự án mà tôi đã thực hiện</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map(project => (
              <div key={project.id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span className={`badge ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={`/projects/${project.id}`}
                  className="inline-block text-blue-600 hover:text-blue-700 font-semibold transition"
                >
                  Xem chi tiết →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-center mb-12">Thống kê dự án</h2>
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
            <div className="card text-center">
              <div className="text-3xl font-bold text-blue-600">6</div>
              <p className="text-gray-600">Tổng dự án</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-green-600">4</div>
              <p className="text-gray-600">Hoàn thành</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-yellow-600">2</div>
              <p className="text-gray-600">Đang làm</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
