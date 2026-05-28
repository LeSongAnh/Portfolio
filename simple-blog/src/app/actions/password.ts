'use server'

import { createClient } from '@/lib/supabase/server'

/**
 * Server action: Send password reset email
 */
export async function sendPasswordResetEmail(formData: FormData) {
  const email = formData.get('email') as string

  if (!email) {
    return { error: 'Vui lòng nhập email' }
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`,
    })

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    return { error: 'Lỗi hệ thống' }
  }
}

/**
 * Server action: Update password after reset
 */
export async function updatePassword(formData: FormData) {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  // Validate
  if (!password || !confirmPassword) {
    return { error: 'Vui lòng điền đầy đủ thông tin' }
  }

  if (password !== confirmPassword) {
    return { error: 'Mật khẩu không khớp' }
  }

  if (password.length < 6) {
    return { error: 'Mật khẩu phải có ít nhất 6 ký tự' }
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.updateUser({
      password: password,
    })

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    return { error: 'Lỗi hệ thống' }
  }
}
