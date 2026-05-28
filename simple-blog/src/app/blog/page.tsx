import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { ArrowRight, Calendar, User } from "lucide-react"

export const revalidate = 60 // Cập nhật cache mỗi 60 giây

export default async function BlogIndexPage() {
  const supabase = await createClient()

  // Lấy toàn bộ các bài viết đã public
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .eq("published", true)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight mb-4">Bài Viết & Blog</h1>
          <p className="text-lg text-slate-500">Khám phá các bài viết chia sẻ kiến thức, kinh nghiệm phát triển phần mềm và các giải pháp tích hợp AI.</p>
        </div>

        {error && (
          <div className="p-4 text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl mb-8">
            Lỗi truy xuất cơ sở dữ liệu: {error.message}
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-md transition flex flex-col h-full">
                {post.image_url ? (
                  <div className="h-52 overflow-hidden bg-slate-100 border-b border-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover hover:scale-102 transition duration-300" />
                  </div>
                ) : (
                  <div className="h-52 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border-b border-slate-100 flex items-center justify-center text-5xl">
                    📝
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow text-left">
                  <h2 className="text-xl font-bold text-slate-900 mb-3 hover:text-indigo-600 transition line-clamp-2">
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <div className="flex items-center text-xs text-slate-400 font-semibold gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      <span>{post.profiles?.username || "Ẩn danh"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{new Date(post.created_at).toLocaleDateString("vi-VN")}</span>
                    </div>
                  </div>
                  <Link href={`/posts/${post.slug}`} className="text-indigo-600 hover:text-indigo-800 font-bold text-sm flex items-center gap-1 mt-auto">
                    Đọc chi tiết <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-3 text-center py-16 bg-white rounded-2xl border border-slate-200/50 flex flex-col items-center justify-center">
              <span className="text-4xl mb-4">📭</span>
              <p className="text-slate-500 font-semibold">Chưa có bài viết nào được xuất bản.</p>
              <p className="text-xs text-slate-400 mt-1">Hãy đăng nhập vào dashboard để tạo bài viết đầu tiên!</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-850">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-xs font-semibold">
          <p>© {new Date().getFullYear()} DevCMS. Lập trình thông minh & Tự động hóa.</p>
        </div>
      </footer>
    </div>
  )
}
