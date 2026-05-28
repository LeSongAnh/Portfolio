import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { Navbar } from "@/components/navbar"
import { Globe, ArrowLeft, Calendar, Layers } from "lucide-react"
import { Github } from "@/components/icons"

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  // Truy xuất chi tiết dự án kèm thông tin tác giả
  const { data: project } = await supabase
    .from("projects")
    .select("*, profiles(username)")
    .eq("slug", slug)
    .maybeSingle()

  if (!project || !project.published) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow mx-auto max-w-4xl w-full px-4 py-12 sm:px-6 lg:px-8">
        {/* Nút quay lại */}
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-indigo-600 mb-8 transition">
          <ArrowLeft className="h-4 w-4" /> Trở lại danh sách dự án
        </Link>

        <article className="bg-white p-6 sm:p-12 rounded-3xl border border-slate-200/65 shadow-sm text-left">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">{project.title}</h1>
            <div className="flex flex-wrap items-center text-xs text-slate-400 font-semibold gap-x-4 gap-y-2 border-b border-slate-100 pb-6">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Đăng ngày: {new Date(project.created_at).toLocaleDateString("vi-VN")}
              </span>
              <span>•</span>
              <span>Người thực hiện: <strong className="text-indigo-650 font-bold">{project.profiles?.username || "Ẩn danh"}</strong></span>
            </div>
          </header>

          {/* Ảnh bìa */}
          {project.image_url && (
            <div className="mb-10 rounded-2xl overflow-hidden shadow-sm border border-slate-150 max-h-[450px] bg-slate-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Links Demo & Source Code */}
          <div className="flex flex-wrap gap-4 mb-8">
            {project.live_url && (
              <a 
                href={project.live_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
              >
                <Globe className="h-4 w-4" /> Live Demo
              </a>
            )}
            {project.github_url && (
              <a 
                href={project.github_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
              >
                <Github className="h-4 w-4" /> Source Code
              </a>
            )}
          </div>

          {/* Công nghệ */}
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="mb-10 bg-slate-50 border border-slate-200/60 p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-indigo-500" /> Công nghệ sử dụng:
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech: string, i: number) => (
                  <span key={i} className="text-xs font-bold bg-white text-indigo-700 px-3 py-1 rounded-lg border border-indigo-100 shadow-sm">{tech}</span>
                ))}
              </div>
            </div>
          )}

          {/* Nội dung chi tiết */}
          <div className="prose prose-lg prose-indigo prose-img:rounded-xl mx-auto">
            <ReactMarkdown>
              {project.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-850 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-xs font-semibold">
          <p>© {new Date().getFullYear()} DevCMS. Xây dựng giải pháp kỹ thuật chất lượng cao.</p>
        </div>
      </footer>
    </div>
  )
}
