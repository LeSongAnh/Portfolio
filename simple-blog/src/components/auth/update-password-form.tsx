"use client"

import { useActionState } from "react"
import { updatePasswordAction } from "@/app/actions/forgot-password"

const initialState = { error: "" }

export function UpdatePasswordForm() {
  const [state, formAction, isPending] = useActionState(updatePasswordAction, initialState)

  return (
    <form action={formAction} className="flex flex-col space-y-4 max-w-sm w-full mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200 text-slate-800">
      <h2 className="text-2xl font-bold mb-4 text-center text-teal-800">Đặt Lại Mật Khẩu</h2>
      
      {state?.error && (
        <div className="p-3 text-sm text-red-600 bg-red-100 border border-red-200 rounded-md">
          {state.error}
        </div>
      )}

      <div className="flex flex-col space-y-1">
        <label htmlFor="password" className="text-sm font-medium">Mật khẩu mới</label>
        <input 
          id="password" 
          name="password" 
          type="password" 
          required 
          minLength={6}
          className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Tối thiểu 6 ký tự..."
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="confirmPassword" className="text-sm font-medium">Xác nhận mật khẩu</label>
        <input 
          id="confirmPassword" 
          name="confirmPassword" 
          type="password" 
          required 
          minLength={6}
          className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Nhập lại y hệt mật khẩu trên..."
        />
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm mt-4"
      >
        {isPending ? "Đang cập nhật..." : "Lưu mật khẩu mới"}
      </button>
    </form>
  )
}
