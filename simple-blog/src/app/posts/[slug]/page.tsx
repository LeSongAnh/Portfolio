import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { RealtimeComments } from "@/components/posts/realtime-comments"
import { LikeButton } from "@/components/posts/like-button"

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient()

  // 1. Lấy dữ liệu bài viết
  const { data: post } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .eq("slug", slug)
    .single()

  if (!post || !post.published) {
    notFound()
  }

  // 2. Lấy dữ liệu bình luận
  const { data: comments } = await supabase
    .from("comments")
    .select("*, profiles(username)")
    .eq("post_id", post.id)
    .order("created_at", { ascending: false })

  // 3. Lấy số đếm Like
  const { count: likesCount } = await supabase
    .from("likes")
    .select("id", { count: "exact" })
    .eq("post_id", post.id)

  // 4. Kiểm tra user hiện tại đã Like chưa
  let userLiked = false
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const { data: likeRecord } = await supabase
      .from("likes")
      .select("id")
      .eq("post_id", post.id)
      .eq("user_id", user.id)
      .single()
    if (likeRecord) userLiked = true
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto bg-white p-8 md:p-14 rounded-2xl shadow-sm border border-gray-100">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">{post.title}</h1>
          <div className="flex items-center justify-center text-gray-500 text-sm font-medium">
            <span>Viết bởi <strong className="text-indigo-600">{post.profiles?.username || "Ẩn Danh"}</strong></span>
            <span className="mx-3 text-gray-300">•</span>
            <time>{new Date(post.created_at).toLocaleDateString("vi-VN", {
              day: "2-digit", month: "2-digit", year: "numeric"
            })}</time>
          </div>
        </header>

        {post.image_url && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-sm border border-gray-100 max-h-[500px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Nút Like */}
        <div className="flex justify-center mb-10">
          <LikeButton postId={post.id} initialLiked={userLiked} initialCount={likesCount || 0} />
        </div>
        
        {/* Nội dung bài viết Markdown */}
        <div className="prose prose-lg prose-indigo prose-img:rounded-xl mx-auto mb-6">
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Bình luận */}
        <RealtimeComments postId={post.id} initialComments={comments || []} />
      </article>
    </div>
  )
}
