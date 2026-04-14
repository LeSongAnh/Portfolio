export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 95 },
        { name: 'TypeScript', level: 85 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'JavaScript', level: 95 },
      ],
    },
    {
      title: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 80 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'MongoDB', level: 75 },
        { name: 'RESTful API', level: 85 },
      ],
    },
    {
      title: 'Tools & Others',
      icon: '🛠️',
      skills: [
        { name: 'Git & GitHub', level: 90 },
        { name: 'Docker', level: 70 },
        { name: 'Vercel', level: 85 },
        { name: 'Firebase', level: 75 },
        { name: 'Jest Testing', level: 75 },
      ],
    },
    {
      title: 'Soft Skills',
      icon: '💡',
      skills: [
        { name: 'Problem Solving', level: 90 },
        { name: 'Communication', level: 85 },
        { name: 'Team Work', level: 90 },
        { name: 'Project Management', level: 80 },
        { name: 'Learning', level: 95 },
      ],
    },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-12">
        <div className="container-custom">
          <h1 className="text-5xl font-bold text-white">Kỹ năng của tôi</h1>
          <p className="text-lg mt-2">Danh sách các công nghệ và kỹ năng mà tôi sử dụng</p>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="card">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">{category.icon}</span>
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-700">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            skill.level >= 90
                              ? 'bg-green-500'
                              : skill.level >= 80
                              ? 'bg-blue-500'
                              : skill.level >= 70
                              ? 'bg-yellow-500'
                              : 'bg-orange-500'
                          }`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-center mb-12 text-3xl font-bold">Tóm tắt kỹ năng</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="card text-center">
              <div className="text-4xl font-bold text-blue-600">20+</div>
              <p className="text-gray-600 mt-2">Công nghệ</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl font-bold text-green-600">5+</div>
              <p className="text-gray-600 mt-2">Năm kinh nghiệm</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl font-bold text-purple-600">50+</div>
              <p className="text-gray-600 mt-2">Dự án</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl font-bold text-orange-600">100%</div>
              <p className="text-gray-600 mt-2">Cam kết</p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-12 bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">🚀 Con đường học tập</h2>
          <div className="space-y-4">
            <div className="card">
              <h3 className="font-bold text-lg mb-2">2020: Khởi đầu</h3>
              <p className="text-gray-600">Bắt đầu học HTML, CSS, JavaScript cơ bản</p>
            </div>
            <div className="card">
              <h3 className="font-bold text-lg mb-2">2021: Nâng cao</h3>
              <p className="text-gray-600">Học React, Node.js, và tạo dự án fullstack đầu tiên</p>
            </div>
            <div className="card">
              <h3 className="font-bold text-lg mb-2">2022: Chuyên sâu</h3>
              <p className="text-gray-600">Nắm vững TypeScript, Next.js, và tối ưu performance</p>
            </div>
            <div className="card">
              <h3 className="font-bold text-lg mb-2">2023-2026: Hiện tại</h3>
              <p className="text-gray-600">Specialist trong Next.js, Cloud deployment, và team lead</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
