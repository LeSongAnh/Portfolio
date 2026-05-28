"use client"

import { useState, useActionState } from "react"
import { updateProfileAction } from "@/app/actions/profile"
import { ImageUpload } from "@/components/dashboard/image-upload"
import { User, Shield, Globe, Loader2, Check } from "lucide-react"
import { Github, Linkedin } from "@/components/icons"

interface Profile {
  id: string
  username: string
  avatar_url?: string
  title?: string
  bio?: string
  github_url?: string
  linkedin_url?: string
  website_url?: string
  role?: string
}

export function ProfileForm({ profile }: { profile: Profile }) {
  const [imageUrl, setImageUrl] = useState(profile.avatar_url || "")
  const [success, setSuccess] = useState(false)

  // Sử dụng useActionState để xử lý Server Action
  const [state, action, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const res = await updateProfileAction(prevState, formData)
      if (res.success) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 4000)
      }
      return res
    },
    null
  )

  return (
    <div className="max-w-3xl bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 sm:p-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <User className="h-5 w-5 text-indigo-600" />
          Hồ sơ lập trình viên
        </h2>
        <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
          <Shield className="h-3.5 w-3.5" /> Vai trò: {profile.role}
        </span>
      </div>

      {success && (
        <div className="mb-6 p-4 text-sm font-semibold text-green-700 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
          <Check className="h-4 w-4" /> Cập nhật hồ sơ cá nhân thành công!
        </div>
      )}

      {state?.error && (
        <div className="mb-6 p-4 text-sm font-semibold text-red-650 bg-red-50 border border-red-100 rounded-xl">
          {state.error}
        </div>
      )}

      <form action={action} className="space-y-6">
        {/* Username */}
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-bold text-slate-700">Tên người dùng (username) *</label>
          <input
            type="text"
            id="username"
            name="username"
            defaultValue={profile.username}
            placeholder="Nhập tên hiển thị"
            className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm font-medium"
            required
          />
        </div>

        {/* Chức danh */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-bold text-slate-700">Tiêu đề nghề nghiệp</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={profile.title || ""}
            placeholder="Ví dụ: Senior Full-Stack Engineer & AI Developer"
            className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm font-medium"
          />
        </div>

        {/* Tiểu sử */}
        <div className="flex flex-col gap-2">
          <label htmlFor="bio" className="text-sm font-bold text-slate-700">Tiêu sử / Giới thiệu cá nhân</label>
          <textarea
            id="bio"
            name="bio"
            defaultValue={profile.bio || ""}
            placeholder="Viết một đoạn ngắn giới thiệu về bản thân, kỹ năng và kinh nghiệm..."
            rows={4}
            className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm font-medium"
          />
        </div>

        {/* Các liên kết */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="github_url" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
              <Github className="h-4 w-4 text-slate-500" /> GitHub URL
            </label>
            <input
              type="url"
              id="github_url"
              name="github_url"
              defaultValue={profile.github_url || ""}
              placeholder="https://github.com/..."
              className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm font-medium"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="linkedin_url" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
              <Linkedin className="h-4 w-4 text-slate-500" /> LinkedIn URL
            </label>
            <input
              type="url"
              id="linkedin_url"
              name="linkedin_url"
              defaultValue={profile.linkedin_url || ""}
              placeholder="https://linkedin.com/in/..."
              className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm font-medium"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="website_url" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-slate-500" /> Website URL
            </label>
            <input
              type="url"
              id="website_url"
              name="website_url"
              defaultValue={profile.website_url || ""}
              placeholder="https://example.com"
              className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm font-medium"
            />
          </div>
        </div>

        {/* Upload Avatar */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700">Ảnh đại diện</label>
          <ImageUpload 
            value={imageUrl} 
            onChange={(url) => setImageUrl(url)} 
          />
          <input type="hidden" name="avatar_url" value={imageUrl} />
        </div>

        {/* Nút Submit */}
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={isPending}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  )
}
