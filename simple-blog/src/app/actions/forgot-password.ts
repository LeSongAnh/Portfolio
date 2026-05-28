"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function forgotPasswordAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const supabase = await createClient()

  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/update-password`,
  })

  if (error) {
    return { error: error.message }
  }

  // Redirect to self with success toast message
  redirect(`/forgot-password?message=${encodeURIComponent("Vui lòng kiểm tra hộp thư email để lấy link khôi phục.")}`)
}

export async function updatePasswordAction(prevState: any, formData: FormData) {
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  
  if (password !== confirmPassword) {
    return { error: "Mật khẩu xác nhận không trùng khớp" }
  }

  if (password.length < 6) {
    return { error: "Mật khẩu phải chứa ít nhất 6 ký tự" }
  }

  const supabase = await createClient()

  // Sẽ gọi update user khi user đang ở trong token session từ link khôi phục
  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    return { error: error.message }
  }

  // Nếu thành công thì redirect về đăng nhập
  redirect(`/login?message=${encodeURIComponent("Tuyệt vời! Mật khẩu đã được đổi thành công, bạn có thể đăng nhập ngay.")}`)
}
