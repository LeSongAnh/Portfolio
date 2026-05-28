"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateProfileAction(prevState: any, formData: FormData) {
  const username = formData.get("username") as string
  const avatar_url = formData.get("avatar_url") as string
  const title = formData.get("title") as string
  const bio = formData.get("bio") as string
  const github_url = formData.get("github_url") as string
  const linkedin_url = formData.get("linkedin_url") as string
  const website_url = formData.get("website_url") as string

  if (!username) {
    return { error: "Tên người dùng (username) là bắt buộc" }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Bạn chưa đăng nhập" }
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      username,
      avatar_url,
      title,
      bio,
      github_url,
      linkedin_url,
      website_url,
      updated_at: new Date().toISOString()
    })
    .eq("id", user.id)

  if (error?.code === "23505") {
    return { error: "Tên người dùng này đã được sử dụng, vui lòng chọn tên khác." }
  }

  if (error) return { error: error.message }

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/profile")
  revalidatePath("/")
  return { success: true }
}
