"use client"

import { useActionState } from "react"
import { registerAction } from "@/app/actions/auth"
import Link from "next/link"

const initialState = { error: "" }

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState)

  return (
    <form action={formAction} className="flex flex-col space-y-4 max-w-sm w-full mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200 text-slate-800">
      <h2 className="text-2xl font-bold mb-4 text-center">Tạo tài khoản</h2>
      
      {state?.error && (
        <div className="p-3 text-sm text-red-600 bg-red-100 border border-red-200 rounded-md">
          {state.error}
        </div>
      )}

      <div className="flex flex-col space-y-1">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          required 
          className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="email@example.com"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="password" className="text-sm font-medium">Mật khẩu</label>
        <input 
          id="password" 
          name="password" 
          type="password" 
          required 
          minLength={6}
          className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Tối thiểu 6 ký tự"
        />
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium mt-2"
      >
        {isPending ? "Đang xử lý..." : "Đăng ký bảo mật"}
      </button>

      <div className="text-sm text-center mt-4 space-x-1">
        <span className="text-gray-500">Đã có tài khoản?</span>
        <Link href="/login" className="text-green-600 hover:underline font-medium">
          Đăng nhập ngay
        </Link>
      </div>
    </form>
  )
}
