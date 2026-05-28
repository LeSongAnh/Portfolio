import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { PostForm } from "@/components/dashboard/post-form"

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { id } = await params;
  
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single()

  if (!post) {
    return <div className="text-center p-12 text-xl font-medium text-red-600">Bài viết này không tồn tại hoặc bạn không có quyền truy cập.</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <PostForm initialData={post} />
    </div>
  )
}
