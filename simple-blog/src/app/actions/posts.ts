"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createPostAction(prevState: any, formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const content = formData.get("content") as string
  const image_url = formData.get("image_url") as string
  const published = formData.get("published") === "on"

  if (!title || !slug || !content) {
    return { error: "Vui lòng điền đầy đủ các thông tin bắt buộc" }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Bạn chưa đăng nhập hoặc phiên đã hết hạn" }
  }

  const { error } = await supabase.from("posts").insert({
    title,
    slug,
    content,
    image_url,
    published,
    author_id: user.id
  })

  // Nếu slug bị trùng (do cột slug khai báo UNIQUE trong Postgres)
  if (error?.code === "23505") {
    return { error: "Đường dẫn tĩnh (Slug) này đã tồn tại, vui lòng chọn tên khác." }
  }
  
  if (error) return { error: error.message }

  revalidatePath("/dashboard")
  redirect("/dashboard")
}

export async function updatePostAction(id: string, prevState: any, formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const content = formData.get("content") as string
  const image_url = formData.get("image_url") as string
  const published = formData.get("published") === "on"

  if (!title || !slug || !content) {
    return { error: "Vui lòng điền đầy đủ thông tin" }
  }

  const supabase = await createClient()

  const { error } = await supabase.from("posts").update({
    title,
    slug,
    content,
    image_url,
    published,
    updated_at: new Date().toISOString()
  }).eq("id", id)

  if (error?.code === "23505") {
    return { error: "Đường dẫn tĩnh (Slug) này đã tồn tại, vui lòng chọn tên khác." }
  }

  if (error) return { error: error.message }

  revalidatePath("/dashboard")
  redirect("/dashboard")
}

export async function deletePostAction(formData: FormData) {
  const id = formData.get("id") as string
  if (!id) return { error: "Không tìm thấy post" }

  const supabase = await createClient()
  const { error } = await supabase.from("posts").delete().eq("id", id)

  if (error) {
    console.error("Lỗi khi xóa bài:", error)
  }
  
  revalidatePath("/dashboard")
}
