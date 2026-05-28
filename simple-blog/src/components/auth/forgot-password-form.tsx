"use client"

import { useActionState } from "react"
import { forgotPasswordAction } from "@/app/actions/forgot-password"
import Link from "next/link"

const initialState = { error: "" }

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, initialState)

  return (
    <form action={formAction} className="flex flex-col space-y-4 max-w-sm w-full mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200 text-slate-800">
      <h2 className="text-2xl font-bold mb-2 text-center text-blue-900">Quên Mật Khẩu</h2>
      <p className="text-sm text-gray-500 text-center mb-4">Nhập email của bạn để nhận link khôi phục an toàn.</p>
      
      {state?.error && (
        <div className="p-3 text-sm text-red-600 bg-red-100 border border-red-200 rounded-md">
          {state.error}
        </div>
      )}

      <div className="flex flex-col space-y-1">
        <label htmlFor="email" className="text-sm font-medium">Email của bạn</label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          required 
          className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="your.email@example.com"
        />
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium mt-2 shadow-sm"
      >
        {isPending ? "Đang gửi link..." : "Gửi Email Khôi Phục"}
      </button>

      <div className="text-sm text-center mt-4">
        <Link href="/login" className="text-gray-500 hover:text-blue-600 hover:underline transition">
          ← Quay lại đăng nhập
        </Link>
      </div>
    </form>
  )
}
