"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function ImageUpload({ 
  value, 
  onChange 
}: { 
  value?: string, 
  onChange: (url: string) => void 
}) {
  const [isUploading, setIsUploading] = useState(false)
  const supabase = createClient()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert("Chỉ hỗ trợ file ảnh!")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Ảnh quá lớn! Tối đa 5MB.")
      return
    }

    setIsUploading(true)

    // Lấy thông tin user để lưu vào folder riêng (bảo mật)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert("Vui lòng đăng nhập!")
      setIsUploading(false)
      return
    }

    // Tên file ngẫu nhiên để không trùng lặp
    const fileName = `${user.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-]/g, '')}`

    const { error } = await supabase.storage
      .from('images')
      .upload(fileName, file)

    if (error) {
      alert("Lỗi upload: " + error.message)
      setIsUploading(false)
      return
    }

    // Lấy Public URL của ảnh vừa đưa lên
    const { data: publicUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(fileName)

    onChange(publicUrlData.publicUrl)
    setIsUploading(false)
  }

  return (
    <div className="mb-2">
      <label className="block text-sm font-medium mb-2">Ảnh bìa bài viết (Cover Image)</label>
      {value ? (
        <div className="relative inline-block mt-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Cover" className="h-40 rounded-xl object-cover border border-gray-200 shadow-sm" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shadow-md hover:bg-red-600 transition"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="relative bg-white border-2 border-dashed border-indigo-200 rounded-xl p-6 text-center hover:bg-indigo-50 transition">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">📸</span>
            <p className="text-sm font-medium text-indigo-700">
              {isUploading ? "Đang tải ảnh lên..." : "Click hoặc kéo thả ảnh vào đây"}
            </p>
            <p className="text-xs text-gray-500 mt-1">Hỗ trợ PNG, JPG, GIF (Max 5MB)</p>
          </div>
        </div>
      )}
      {/* Ẩn giá trị ảnh vào input name="image_url" để gửi server action */}
      <input type="hidden" name="image_url" value={value || ""} />
    </div>
  )
}
