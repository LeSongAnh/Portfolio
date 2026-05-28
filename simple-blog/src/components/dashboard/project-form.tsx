"use client"

import { useState, useActionState } from "react"
import { createProjectAction, updateProjectAction } from "@/app/actions/projects"
import { ImageUpload } from "@/components/dashboard/image-upload"
import { generateProjectDescriptionAction } from "@/app/actions/ai"
import { Sparkles, Code, Globe, Layers, ArrowLeft, Loader2 } from "lucide-react"
import { Github } from "@/components/icons"
import Link from "next/link"

interface Project {
  id: string
  title: string
  slug: string
  description: string
  content: string
  image_url: string
  live_url: string
  github_url: string
  tech_stack: string[]
  is_featured: boolean
  published: boolean
}

export function ProjectForm({ project }: { project?: Project }) {
  const [imageUrl, setImageUrl] = useState(project?.image_url || "")
  const [title, setTitle] = useState(project?.title || "")
  const [slug, setSlug] = useState(project?.slug || "")
  
  // Trạng thái AI Helper
  const [showAiModal, setShowAiModal] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState("")

  // Thiết lập Server Action dựa trên chế độ tạo hay cập nhật
  const formAction = project 
    ? updateProjectAction.bind(null, project.id) 
    : createProjectAction

  const [state, action, isPending] = useActionState(formAction, null)

  // Hàm chuyển đổi Title sang Slug tự động
  const generateSlug = () => {
    const generated = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/([^a-z0-9\s-])/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
    setSlug(generated)
  }

  // Gọi API tạo mô tả dự án từ AI
  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return
    setAiLoading(true)
    setAiError("")
    try {
      const res = await generateProjectDescriptionAction(aiPrompt)
      if (res.error) {
        setAiError(res.error)
      } else if (res.content) {
        const textarea = document.getElementById("content") as HTMLTextAreaElement
        if (textarea) {
          textarea.value = res.content
        }
        setShowAiModal(false)
        setAiPrompt("")
      }
    } catch (err: any) {
      setAiError("Lỗi hệ thống: " + err.message)
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Nút quay lại */}
      <Link href="/dashboard/projects" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-indigo-650 mb-6 transition">
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách dự án
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 sm:p-8">
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Code className="h-6 w-6 text-indigo-600" />
            {project ? "Cập nhật dự án" : "Thêm dự án mới"}
          </h2>
          <button
            type="button"
            onClick={() => setShowAiModal(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-650 to-indigo-650 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-md cursor-pointer transition duration-200"
          >
            <Sparkles className="h-4 w-4" /> Soạn thảo bằng AI
          </button>
        </div>

        <form action={action} className="space-y-6">
          {/* Thông báo lỗi */}
          {state?.error && (
            <div className="p-4 text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl">
              {state.error}
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Tên dự án */}
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-bold text-slate-700">Tên dự án *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Cổng thông tin học tập AI"
                className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm font-medium"
                required
              />
            </div>

            {/* Slug */}
            <div className="flex flex-col gap-2">
              <label htmlFor="slug" className="text-sm font-bold text-slate-700">Đường dẫn tĩnh (Slug) *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="cong-thong-tin-hoc-tap-ai"
                  className="flex-grow px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={generateSlug}
                  className="px-3.5 bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-205 transition cursor-pointer"
                >
                  Tạo Slug
                </button>
              </div>
            </div>
          </div>

          {/* Mô tả ngắn */}
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-bold text-slate-700">Mô tả ngắn</label>
            <textarea
              id="description"
              name="description"
              defaultValue={project?.description || ""}
              placeholder="Tóm tắt ngắn gọn dự án của bạn (hiển thị trên trang chủ & danh sách)..."
              rows={2}
              className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm font-medium"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Github Link */}
            <div className="flex flex-col gap-2">
              <label htmlFor="github_url" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                <Github className="h-4 w-4" /> Source Code (GitHub URL)
              </label>
              <input
                type="url"
                id="github_url"
                name="github_url"
                defaultValue={project?.github_url || ""}
                placeholder="https://github.com/username/project"
                className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm font-medium"
              />
            </div>

            {/* Live Link */}
            <div className="flex flex-col gap-2">
              <label htmlFor="live_url" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                <Globe className="h-4 w-4" /> Live Demo (Website URL)
              </label>
              <input
                type="url"
                id="live_url"
                name="live_url"
                defaultValue={project?.live_url || ""}
                placeholder="https://my-app.com"
                className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm font-medium"
              />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-col gap-2">
            <label htmlFor="tech_stack" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
              <Layers className="h-4 w-4" /> Thẻ công nghệ (ngăn cách bằng dấu phẩy)
            </label>
            <input
              type="text"
              id="tech_stack"
              name="tech_stack"
              defaultValue={project?.tech_stack?.join(", ") || ""}
              placeholder="Next.js, TypeScript, Supabase, Tailwind, Docker"
              className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm font-medium"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">Ảnh bìa dự án</label>
            <ImageUpload 
              value={imageUrl} 
              onChange={(url) => setImageUrl(url)} 
            />
            <input type="hidden" name="image_url" value={imageUrl} />
          </div>

          {/* Content Markdown */}
          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="text-sm font-bold text-slate-700">Chi tiết dự án (Hỗ trợ Markdown) *</label>
            <textarea
              id="content"
              name="content"
              defaultValue={project?.content || ""}
              placeholder="Viết bài phân tích chi tiết, kiến trúc, cách cài đặt dự án..."
              rows={8}
              className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm font-mono"
              required
            />
          </div>

          {/* Trạng thái */}
          <div className="flex flex-wrap gap-6 items-center">
            <label className="flex items-center gap-2 font-semibold text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                name="is_featured"
                defaultChecked={project?.is_featured || false}
                className="h-4.5 w-4.5 rounded border-slate-350 text-indigo-650 focus:ring-indigo-500"
              />
              Đánh dấu là dự án nổi bật (Featured)
            </label>

            <label className="flex items-center gap-2 font-semibold text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                defaultChecked={project?.published || false}
                className="h-4.5 w-4.5 rounded border-slate-350 text-indigo-650 focus:ring-indigo-500"
              />
              Công khai dự án lên Portfolio
            </label>
          </div>

          {/* Nút Submit */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <Link 
              href="/dashboard/projects" 
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition"
            >
              Hủy bỏ
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {project ? "Cập nhật dự án" : "Tạo dự án mới"}
            </button>
          </div>
        </form>
      </div>

      {/* Modal soạn thảo bằng AI */}
      {showAiModal && (
        <div className="fixed inset-0 z-55 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col gap-6 text-left">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-1.5">
                <Sparkles className="h-5 w-5 text-purple-650" /> Trợ lý viết mô tả dự án AI
              </h3>
              <p className="text-xs text-slate-500 mt-1">Nhập một vài ý chính (tính năng, công nghệ) để AI tự động soạn thảo bản mô tả chi tiết bằng Markdown.</p>
            </div>

            {aiError && (
              <div className="p-3 text-xs font-semibold text-red-650 bg-red-50 border border-red-100 rounded-xl">
                {aiError}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="aiPromptInput" className="text-xs font-bold text-slate-700">Ý tưởng / Gạch đầu dòng:</label>
              <textarea
                id="aiPromptInput"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ví dụ:&#10;- Xây dựng app chat thời gian thực&#10;- Dùng Next.js 16 và Supabase Realtime&#10;- Đăng nhập Google, Facebook&#10;- UI đẹp với Tailwind CSS dark mode"
                rows={5}
                className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium transition"
              />
            </div>

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setShowAiModal(false)
                  setAiError("")
                }}
                className="px-4 py-2.5 text-xs font-bold border border-slate-205 text-slate-705 rounded-xl hover:bg-slate-50 transition cursor-pointer"
                disabled={aiLoading}
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleAiGenerate}
                disabled={aiLoading || !aiPrompt.trim()}
                className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-indigo-400 disabled:to-indigo-400 text-white font-bold text-xs px-4.5 py-2.5 rounded-xl shadow-md transition cursor-pointer"
              >
                {aiLoading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Đang soạn thảo...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" /> Tạo & Áp dụng
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
