import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectById, getAllProjects } from '@/data/projects';

interface Props {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return getAllProjects().map(project => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const project = getProjectById(params.id);
  
  if (!project) {
    return {
      title: 'Dự án không tìm thấy',
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectDetail({ params }: Props) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-12">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex gap-3 items-center mb-4">
              <span className="badge bg-white text-indigo-600">
                {project.status}
              </span>
            </div>
            <h1 className="text-5xl font-bold text-white">{project.title}</h1>
            <p className="text-lg mt-2 text-indigo-100">{project.description}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-2 prose max-w-none">
              <h2>Tổng quan dự án</h2>
              <div className="whitespace-pre-wrap text-gray-700">
                {project.longDescription}
              </div>

              <h2>Tính năng chính</h2>
              <ul>
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <h2>Links</h2>
              <div className="flex gap-4 flex-wrap">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    🔗 Visit Live
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    🐙 GitHub Repository
                  </a>
                )}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Tech Stack */}
              <div className="card mb-6 sticky top-20">
                <h3 className="font-bold mb-4">⚙️ Công nghệ sử dụng</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="card">
                <h3 className="font-bold mb-4">📊 Thông tin</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>
                    <strong>Trạng thái:</strong>
                    <br />
                    <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold ${
                      project.status === 'Completed' ? 'bg-green-600' :
                      project.status === 'In Progress' ? 'bg-yellow-600' :
                      'bg-blue-600'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div>
                    <strong>Số công nghệ:</strong>
                    <br />
                    {project.tech.length} công nghệ
                  </div>
                  <div>
                    <strong>Số tính năng:</strong>
                    <br />
                    {project.features.length} tính năng chính
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-gray-50 border-t">
        <div className="container-custom max-w-3xl flex justify-between">
          <Link href="/projects" className="btn-secondary">
            ← Quay lại Projects
          </Link>
          <Link href="/" className="btn-primary">
            Trang chủ →
          </Link>
        </div>
      </section>
    </div>
  );
}
