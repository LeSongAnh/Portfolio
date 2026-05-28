import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { deleteProjectAction } from "@/app/actions/projects"
import { Plus, Pencil, Trash, FileCode } from "lucide-react"

export default async function DashboardProjectsPage() {
  const supabase = await createClient()

  // Lấy toàn bộ dự án
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*, profiles(username)")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      {/* Tiêu đề & Nút thêm mới */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Quản lý Dự án</h1>
          <p className="text-slate-500 mt-1">Quản lý danh sách các sản phẩm và dự án trưng bày trên trang cá nhân.</p>
        </div>
        <Link 
          href="/dashboard/projects/new" 
          className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-sm transition w-fit"
        >
          <Plus className="h-4 w-4" /> Thêm dự án mới
        </Link>
      </div>

      {error && (
        <div className="p-4 text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl">
          Lỗi truy xuất cơ sở dữ liệu: {error.message}
        </div>
      )}

      {/* Bảng danh sách dự án */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden text-left">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead>
              <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
                <th className="py-4 px-6">Dự án</th>
                <th className="py-4 px-6">Công nghệ</th>
                <th className="py-4 px-6">Trạng thái</th>
                <th className="py-4 px-6">Ngày tạo</th>
                <th className="py-4 px-6 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6 font-bold text-slate-900 max-w-[250px] truncate">
                      <Link href={`/projects/${project.slug}`} className="hover:text-indigo-600 transition">
                        {project.title}
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1 max-w-[280px]">
                        {project.tech_stack?.slice(0, 3).map((tech: string, idx: number) => (
                          <span key={idx} className="text-[10px] font-bold bg-indigo-50 text-indigo-705 px-1.5 py-0.5 rounded border border-indigo-100/50">
                            {tech}
                          </span>
                        ))}
                        {project.tech_stack && project.tech_stack.length > 3 && (
                          <span className="text-[10px] font-semibold text-slate-400 px-1 py-0.5">
                            +{project.tech_stack.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-2">
                        {project.published ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700 border border-green-150">
                            Đã công khai
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-500 border border-slate-200">
                            Bản nháp
                          </span>
                        )}
                        {project.is_featured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 border border-amber-150">
                            Nổi bật
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400">
                      {new Date(project.created_at).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/dashboard/projects/edit/${project.id}`} 
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-105 rounded-xl transition"
                          title="Sửa dự án"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <form 
                          action={async (formData) => {
                            "use server"
                            await deleteProjectAction(formData)
                          }} 
                          className="m-0 inline"
                        >
                          <input type="hidden" name="id" value={project.id} />
                          <button 
                            type="submit" 
                            className="p-2 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-xl transition cursor-pointer"
                            title="Xóa dự án"
                            onClick={(e) => {
                              if (!confirm("Bạn có chắc chắn muốn xóa dự án này?")) {
                                e.preventDefault()
                              }
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                    <div className="flex flex-col items-center justify-center">
                      <FileCode className="h-10 w-10 text-slate-300 mb-3" />
                      <p>Chưa có dự án nào trong hệ thống.</p>
                      <Link href="/dashboard/projects/new" className="text-indigo-600 font-bold hover:underline mt-1">Tạo dự án đầu tiên ngay</Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
