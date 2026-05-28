import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { BookOpen, Code, MessageSquare, Sparkles, Plus } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  // Truy vấn số lượng bài viết
  const { count: postsCount } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })

  // Truy vấn số lượng dự án
  const { count: projectsCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })

  // Truy vấn số lượng bình luận
  const { count: commentsCount } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })

  // Truy vấn số lượng request AI
  const { count: aiCount } = await supabase
    .from("ai_logs")
    .select("*", { count: "exact", head: true })

  // Lấy các log AI gần nhất để hiển thị làm minh chứng
  const { data: recentAiLogs } = await supabase
    .from("ai_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3)

  return (
    <div className="space-y-8">
      {/* Tiêu đề trang */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tổng Quan Hệ Thống</h1>
        <p className="text-slate-500 mt-1">Quản lý bài viết blog cá nhân, các dự án trong portfolio và giám sát lịch sử AI.</p>
      </div>

      {/* Grid thống kê (Metrics) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Số lượng Bài viết */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bài viết Blog</span>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-2">{postsCount || 0}</h3>
          </div>
          <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <BookOpen className="h-6 w-6" />
          </div>
        </div>

        {/* Số lượng Dự án */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dự án Portfolio</span>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-2">{projectsCount || 0}</h3>
          </div>
          <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Code className="h-6 w-6" />
          </div>
        </div>

        {/* Số lượng Bình luận */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bình luận</span>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-2">{commentsCount || 0}</h3>
          </div>
          <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <MessageSquare className="h-6 w-6" />
          </div>
        </div>

        {/* Số lượng Request AI */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Yêu cầu AI</span>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-2">{aiCount || 0}</h3>
          </div>
          <div className="h-12 w-12 bg-purple-50 text-purple-650 rounded-xl flex items-center justify-center">
            <Sparkles className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Grid Hành động nhanh */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Đăng bài viết mới</h3>
            <p className="text-sm text-slate-500 mb-6">Chia sẻ ý kiến lập trình, hướng dẫn viết code hoặc các giải pháp kỹ thuật mới của bạn.</p>
          </div>
          <Link href="/dashboard/new" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 w-fit shadow-sm transition">
            <Plus className="h-4 w-4" /> Viết bài mới
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Thêm dự án mới</h3>
            <p className="text-sm text-slate-500 mb-6">Cập nhật danh sách dự án nổi bật trong Portfolio kèm hình ảnh bìa và thẻ công nghệ sử dụng.</p>
          </div>
          <Link href="/dashboard/projects/new" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 w-fit shadow-sm transition">
            <Plus className="h-4 w-4" /> Thêm dự án
          </Link>
        </div>
      </div>

      {/* Bảng Logs AI minh chứng môn học */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/60 shadow-sm text-left">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" /> Nhật ký cuộc gọi AI (ai_logs)
          </h3>
          <span className="text-xs bg-purple-50 text-purple-700 font-bold px-2.5 py-1 rounded-md">Dữ liệu thực tế</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead>
              <tr className="text-xs font-bold text-slate-400 text-left uppercase tracking-wider">
                <th className="py-3 px-4">Tính năng</th>
                <th className="py-3 px-4">Prompt gửi lên</th>
                <th className="py-3 px-4">Thời gian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {recentAiLogs && recentAiLogs.length > 0 ? (
                recentAiLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition">
                    <td className="py-4 px-4 font-bold text-slate-900 max-w-[150px] truncate">{log.feature_name}</td>
                    <td className="py-4 px-4 max-w-[300px] truncate">{log.prompt}</td>
                    <td className="py-4 px-4 text-xs text-slate-400">{new Date(log.created_at).toLocaleString("vi-VN")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-slate-400 font-medium">Chưa có lịch sử gọi AI nào được lưu nhận. Hãy sử dụng các nút AI trong form soạn thảo bài viết/dự án để kích hoạt ghi log.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
