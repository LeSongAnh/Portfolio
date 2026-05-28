"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function toggleLikeAction(postId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Vui lòng đăng nhập trước khi thích bài viết!" }
  }

  // Kiểm tra xem user đã thích bài này chưa
  const { data: existingLike, error: fetchError } = await supabase
    .from("likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle()

  if (existingLike) {
    // Đã thích -> Bỏ thích
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("id", existingLike.id)

    if (error) return { error: error.message }
  } else {
    // Chưa thích -> Thêm lượt thích
    const { error } = await supabase
      .from("likes")
      .insert({
        post_id: postId,
        user_id: user.id
      })

    if (error) return { error: error.message }
  }

  revalidatePath("/", "layout")
  return { success: true }
}
