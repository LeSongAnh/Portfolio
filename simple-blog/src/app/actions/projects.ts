"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createProjectAction(prevState: any, formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string
  const content = formData.get("content") as string
  const image_url = formData.get("image_url") as string
  const live_url = formData.get("live_url") as string
  const github_url = formData.get("github_url") as string
  const tech_stack_str = formData.get("tech_stack") as string
  const published = formData.get("published") === "on"
  const is_featured = formData.get("is_featured") === "on"

  if (!title || !slug || !content) {
    return { error: "Vui lòng điền đầy đủ thông tin bắt buộc (Tiêu đề, Slug, Nội dung)" }
  }

  const tech_stack = tech_stack_str
    ? tech_stack_str.split(",").map(t => t.trim()).filter(Boolean)
    : []

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Bạn chưa đăng nhập hoặc phiên làm việc đã hết hạn" }
  }

  // Kiểm tra vai trò Admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return { error: "Chỉ quản trị viên mới có quyền tạo dự án!" }
  }

  const { error } = await supabase.from("projects").insert({
    title,
    slug,
    description,
    content,
    image_url,
    live_url,
    github_url,
    tech_stack,
    is_featured,
    published,
    user_id: user.id
  })

  if (error?.code === "23505") {
    return { error: "Đường dẫn tĩnh (Slug) này đã tồn tại, vui lòng chọn tên khác." }
  }

  if (error) return { error: error.message }

  revalidatePath("/dashboard/projects")
  revalidatePath("/projects")
  revalidatePath("/")
  redirect("/dashboard/projects")
}

export async function updateProjectAction(id: string, prevState: any, formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string
  const content = formData.get("content") as string
  const image_url = formData.get("image_url") as string
  const live_url = formData.get("live_url") as string
  const github_url = formData.get("github_url") as string
  const tech_stack_str = formData.get("tech_stack") as string
  const published = formData.get("published") === "on"
  const is_featured = formData.get("is_featured") === "on"

  if (!title || !slug || !content) {
    return { error: "Vui lòng điền đầy đủ thông tin bắt buộc" }
  }

  const tech_stack = tech_stack_str
    ? tech_stack_str.split(",").map(t => t.trim()).filter(Boolean)
    : []

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Bạn chưa đăng nhập" }
  }

  // Kiểm tra vai trò Admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return { error: "Chỉ quản trị viên mới có quyền cập nhật dự án!" }
  }

  const { error } = await supabase
    .from("projects")
    .update({
      title,
      slug,
      description,
      content,
      image_url,
      live_url,
      github_url,
      tech_stack,
      is_featured,
      published,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)

  if (error?.code === "23505") {
    return { error: "Đường dẫn tĩnh (Slug) này đã tồn tại, vui lòng chọn tên khác." }
  }

  if (error) return { error: error.message }

  revalidatePath("/dashboard/projects")
  revalidatePath(`/projects/${slug}`)
  revalidatePath("/projects")
  revalidatePath("/")
  redirect("/dashboard/projects")
}

export async function deleteProjectAction(formData: FormData) {
  const id = formData.get("id") as string
  if (!id) return { error: "Không tìm thấy ID dự án" }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: "Bạn chưa đăng nhập" }

  // Kiểm tra vai trò Admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return { error: "Chỉ quản trị viên mới có quyền xóa dự án!" }
  }

  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error) {
    console.error("Lỗi khi xóa dự án:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/projects")
  revalidatePath("/projects")
  revalidatePath("/")
}
