import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { deletePostAction } from "@/app/actions/posts"
import { Plus, Pencil, Trash, FileText } from "lucide-react"

export default async function DashboardPostsPage() {
  const supabase = await createClient()

  // Lấy toàn bộ bài viết trong hệ thống
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      {/* Tiêu đề & Nút thêm mới */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Quản lý Bài viết</h1>
          <p className="text-slate-500 mt-1">Danh sách và kiểm soát tất cả bài viết trên hệ thống Blog.</p>
        </div>
        <Link 
          href="/dashboard/new" 
          className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-sm transition w-fit"
        >
          <Plus className="h-4 w-4" /> Viết bài mới
        </Link>
      </div>

      {error && (
        <div className="p-4 text-sm font-semibold text-red-650 bg-red-50 border border-red-100 rounded-xl">
          Lỗi truy xuất cơ sở dữ liệu: {error.message}
        </div>
      )}

      {/* Bảng danh sách bài viết */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden text-left">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead>
              <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
                <th className="py-4 px-6">Tiêu đề bài viết</th>
                <th className="py-4 px-6">Tác giả</th>
                <th className="py-4 px-6">Trạng thái</th>
                <th className="py-4 px-6">Ngày tạo</th>
                <th className="py-4 px-6 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6 font-bold text-slate-900 max-w-[280px] truncate">
                      <Link href={`/posts/${post.slug}`} className="hover:text-indigo-600 transition">
                        {post.title}
                      </Link>
                    </td>
                    <td className="py-4 px-6">{post.profiles?.username || "Ẩn danh"}</td>
                    <td className="py-4 px-6">
                      {post.published ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700 border border-green-150">
                          Đã xuất bản
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-500 border border-slate-200">
                          Bản nháp
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400">
                      {new Date(post.created_at).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/dashboard/edit/${post.id}`} 
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-105 rounded-xl transition"
                          title="Sửa bài viết"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <form 
                          action={async (formData) => {
                            "use server"
                            await deletePostAction(formData)
                          }} 
                          className="m-0 inline"
                        >
                          <input type="hidden" name="id" value={post.id} />
                          <button 
                            type="submit" 
                            className="p-2 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-xl transition cursor-pointer"
                            title="Xóa bài viết"
                            onClick={(e) => {
                              if (!confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
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
                      <FileText className="h-10 w-10 text-slate-300 mb-3" />
                      <p>Chưa có bài viết nào trong cơ sở dữ liệu.</p>
                      <Link href="/dashboard/new" className="text-indigo-600 font-bold hover:underline mt-1">Tạo bài viết đầu tiên ngay</Link>
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
