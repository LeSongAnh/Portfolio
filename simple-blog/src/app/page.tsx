import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { ArrowRight, Code, BookOpen, Globe, Cpu, Palette, Terminal, Shield } from "lucide-react"
import { Github, Linkedin } from "@/components/icons"

export default async function HomePage() {
  const supabase = await createClient()

  // 1. Lấy thông tin tài khoản admin chính làm profile của Portfolio
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "admin")
    .limit(1)
    .maybeSingle()

  // 2. Lấy 3 dự án nổi bật đã public
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(3)

  // 3. Lấy 3 bài viết mới nhất đã public
  const { data: posts } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3)

  // Cấu hình dữ liệu mặc định (fallback) khi database chưa được setup tài khoản admin
  const devProfile = profile || {
    username: "Song Anh",
    title: "Senior Full-Stack Engineer & AI Developer",
    bio: "Tôi đam mê thiết kế & xây dựng các sản phẩm web chất lượng cao, tối ưu hóa hiệu năng hệ thống và tích hợp các giải pháp trí tuệ nhân tạo (AI) giúp tự động hóa và nâng cao trải nghiệm người dùng.",
    github_url: "https://github.com",
    linkedin_url: "https://linkedin.com",
    website_url: "https://example.com",
    avatar_url: ""
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-28 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1.5 text-sm font-bold text-indigo-700 mb-6 w-fit">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
                Sẵn sàng cho các cơ hội hợp tác mới
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6 leading-tight">
                Xin chào, tôi là <br/>
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {devProfile.username}
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-700 mb-4">
                {devProfile.title}
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mb-8 leading-relaxed">
                {devProfile.bio}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/projects" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition duration-200 flex items-center gap-2">
                  Xem các dự án <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/blog" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold px-6 py-3 rounded-xl shadow-sm transition duration-200 flex items-center gap-2">
                  Đọc bài viết Blog
                </Link>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-5 mt-10 text-slate-400">
                {devProfile.github_url && (
                  <a href={devProfile.github_url} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition">
                    <Github className="h-6 w-6" />
                  </a>
                )}
                {devProfile.linkedin_url && (
                  <a href={devProfile.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition">
                    <Linkedin className="h-6 w-6" />
                  </a>
                )}
                {devProfile.website_url && (
                  <a href={devProfile.website_url} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition">
                    <Globe className="h-6 w-6" />
                  </a>
                )}
              </div>
            </div>
            
            {/* Hero image / avatar */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative h-72 w-72 sm:h-96 sm:w-96 rounded-3xl overflow-hidden bg-gradient-to-tr from-indigo-100 to-purple-100 border border-indigo-50 shadow-xl flex items-center justify-center">
                {devProfile.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={devProfile.avatar_url} alt={devProfile.username} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-9xl">👨‍💻</span>
                )}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-slate-100 rounded-2xl p-4 shadow-md flex items-center gap-3">
                  <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    AI
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">Developer CMS</h4>
                    <p className="text-[10px] text-slate-500 font-semibold">Tích hợp Google Gemini</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">Kỹ Năng Chuyên Môn</h2>
            <p className="mt-4 text-lg text-slate-500">Tôi làm việc với bộ công cụ lập trình hiện đại nhất nhằm cung cấp giải pháp bền vững.</p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Palette className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Frontend</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Xây dựng giao diện thích ứng mọi thiết bị, tương tác mượt mà bằng React 19, Next.js 16 và Tailwind CSS v4.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Backend</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Phát triển Server Actions, API routes và cơ sở dữ liệu Supabase kết hợp RLS bảo mật chặt chẽ.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Terminal className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">AI Integration</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Sử dụng Google Gemini API để tạo mô tả dự án từ phác thảo ý tưởng và tối ưu SEO tiêu đề.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">DevOps & Cloud</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Cấu hình Docker, Docker Compose chạy local, hỗ trợ sẵn sàng deploy VPS riêng với domain và SSL.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">Dự Án Nổi Bật</h2>
              <p className="mt-2 text-lg text-slate-500">Các sản phẩm tiêu biểu được thực hiện và công bố gần đây.</p>
            </div>
            <Link href="/projects" className="text-indigo-600 hover:text-indigo-800 font-bold transition flex items-center gap-1 mt-4 sm:mt-0 text-sm">
              Tất cả dự án <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition duration-300 flex flex-col h-full">
                  {project.image_url ? (
                    <div className="h-48 overflow-hidden bg-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={project.image_url} alt={project.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-4xl">
                      🚀
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                      {project.tech_stack?.slice(0, 4).map((tech: string, i: number) => (
                        <span key={i} className="text-[10px] font-bold bg-white text-indigo-700 px-2 py-0.5 rounded border border-indigo-100 shadow-sm">{tech}</span>
                      ))}
                    </div>
                    <Link href={`/projects/${project.slug}`} className="text-indigo-600 hover:text-indigo-800 font-bold text-sm flex items-center gap-1">
                      Chi tiết dự án <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center">
                <span className="text-4xl mb-3">🛠️</span>
                <p className="text-slate-500 font-semibold">Chưa có dự án nổi bật nào được đăng tải.</p>
                <p className="text-xs text-slate-400 mt-1">Truy cập Dashboard để thêm dự án mới.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">Bài Viết Mới Nhất</h2>
              <p className="mt-2 text-lg text-slate-500">Chia sẻ kiến thức lập trình, kinh nghiệm làm việc và xu hướng công nghệ.</p>
            </div>
            <Link href="/blog" className="text-indigo-600 hover:text-indigo-800 font-bold transition flex items-center gap-1 mt-4 sm:mt-0 text-sm">
              Tất cả bài viết <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition duration-300 flex flex-col h-full">
                  {post.image_url ? (
                    <div className="h-44 overflow-hidden bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                    </div>
                  ) : (
                    <div className="h-44 bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center text-4xl">
                      📝
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow text-left">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{post.title}</h3>
                    <div className="flex items-center text-xs text-slate-400 font-semibold mb-4">
                      <span>{post.profiles?.username || "Ẩn danh"}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(post.created_at).toLocaleDateString("vi-VN")}</span>
                    </div>
                    <Link href={`/posts/${post.slug}`} className="text-indigo-600 hover:text-indigo-800 font-bold text-sm flex items-center gap-1 mt-auto">
                      Đọc tiếp <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 bg-white rounded-2xl border border-slate-200/50 flex flex-col items-center">
                <span className="text-4xl mb-3">📭</span>
                <p className="text-slate-500 font-semibold">Chưa có bài viết nào được xuất bản công khai.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm font-semibold">© {new Date().getFullYear()} {devProfile.username}. Bảo lưu mọi quyền.</p>
          <div className="flex items-center gap-4 text-xs font-bold">
            <Link href="/dashboard" className="hover:text-white transition">Admin Dashboard</Link>
            <span>•</span>
            <span className="text-indigo-400">Đồ án tốt nghiệp môn học AI Web Development</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
