import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { ArrowRight } from "lucide-react"

export const revalidate = 60 // Cập nhật cache mỗi 60 giây

export default async function ProjectsIndexPage() {
  const supabase = await createClient()

  // Lấy danh sách dự án đã công khai
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight mb-4">Các Dự Án Thực Tế</h1>
          <p className="text-lg text-slate-500">Tổng hợp các sản phẩm và dự án mã nguồn mở tôi đã thiết kế, lập trình và triển khai.</p>
        </div>

        {error && (
          <div className="p-4 text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl mb-8">
            Lỗi truy xuất dữ liệu: {error.message}
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-md transition flex flex-col h-full">
                {project.image_url ? (
                  <div className="h-52 overflow-hidden bg-slate-100 border-b border-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover hover:scale-102 transition duration-300" />
                  </div>
                ) : (
                  <div className="h-52 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border-b border-slate-100 flex items-center justify-center text-5xl">
                    🚀
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow text-left">
                  <h2 className="text-xl font-bold text-slate-900 mb-2 hover:text-indigo-600 transition line-clamp-1">
                    <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                  </h2>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-3 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                    {project.tech_stack?.map((tech: string, i: number) => (
                      <span key={i} className="text-[10px] font-bold bg-slate-100 text-indigo-700 px-2 py-0.5 rounded border border-indigo-50">{tech}</span>
                    ))}
                  </div>
                  
                  <Link href={`/projects/${project.slug}`} className="text-indigo-600 hover:text-indigo-800 font-bold text-sm flex items-center gap-1">
                    Xem chi tiết <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-16 bg-white rounded-2xl border border-slate-200/50 flex flex-col items-center justify-center">
              <span className="text-4xl mb-4">🛠️</span>
              <p className="text-slate-500 font-semibold">Chưa có dự án nào được xuất bản công khai.</p>
              <p className="text-xs text-slate-400 mt-1">Truy cập trang quản trị để thêm dự án mới đầu tiên.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-850">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-xs font-semibold">
          <p>© {new Date().getFullYear()} DevCMS. Xây dựng giải pháp kỹ thuật chất lượng cao.</p>
        </div>
      </footer>
    </div>
  )
}
