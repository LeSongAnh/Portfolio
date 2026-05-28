"use server"

import { createClient } from "@/lib/supabase/server"

export async function addCommentAction(postId: string, prevState: any, formData: FormData) {
  const content = formData.get("content") as string
  if (!content) {
    return { error: "Vui lòng nhập nội dung bình luận.", success: false }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Vui lòng đăng nhập trước khi bình luận!", success: false }
  }

  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    user_id: user.id,
    content: content,
    is_draft: false
  })

  if (error) {
    return { error: error.message, success: false }
  }
  
  return { success: true, error: "" }
}
