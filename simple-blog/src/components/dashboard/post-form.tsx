"use client"

import { useActionState, useState } from "react"
import { createPostAction, updatePostAction } from "@/app/actions/posts"
import Link from "next/link"
import { ImageUpload } from "./image-upload"
import { suggestBlogTitleAction } from "@/app/actions/ai"
import { Sparkles, Loader2, BookOpen, ArrowLeft } from "lucide-react"

type Post = {
  id?: string
  title: string
  slug: string
  content: string
  image_url?: string
  published: boolean
}

export function PostForm({ initialData }: { initialData?: Post }) {
  const isEditing = !!initialData?.id
  const [imageUrl, setImageUrl] = useState<string>(initialData?.image_url || "")
  const [title, setTitle] = useState<string>(initialData?.title || "")
  const [slug, setSlug] = useState<string>(initialData?.slug || "")

  // Trạng thái AI suggestions
  const [showAiModal, setShowAiModal] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState("")

  const actionToRun = isEditing 
    ? updatePostAction.bind(null, initialData.id!) 
    : createPostAction

  const [state, formAction, isPending] = useActionState(actionToRun, { error: "" })

  // Hàm tạo slug tự động
  const generateSlugFromTitle = (titleVal: string) => {
    const generated = titleVal
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

  // Xử lý gọi AI gợi ý tiêu đề
  const handleAiSuggestTitle = async () => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement
    const contentVal = textarea?.value || ""
    
    if (!contentVal.trim() || contentVal.trim().length < 10) {
      alert("Vui lòng nhập bản nháp nội dung bài viết trước để AI phân tích nội dung.")
      return
    }

    setAiLoading(true)
    setAiError("")
    setShowAiModal(true)
    setAiSuggestions("")

    try {
      const res = await suggestBlogTitleAction(contentVal)
      if (res.error) {
        setAiError(res.error)
      } else if (res.suggestions) {
        setAiSuggestions(res.suggestions)
      }
    } catch (err: any) {
      setAiError("Lỗi hệ thống: " + err.message)
    } finally {
      setAiLoading(false)
    }
  }

  // Tách các tiêu đề gợi ý
  const parsedSuggestions = aiSuggestions
    .split("\n")
    .map(line => line.replace(/^\d+[\.\)]\s*/, "").replace(/^-\s*/, "").trim())
    .filter(Boolean)

  return (
    <div className="max-w-3xl w-full mx-auto">
      {/* Nút quay lại */}
      <Link href="/dashboard/posts" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-indigo-650 mb-6 transition">
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách bài viết
      </Link>

      <form action={formAction} className="flex flex-col space-y-5 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm text-slate-800 text-left">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-indigo-600" />
            {isEditing ? "Chỉnh sửa bài viết" : "Viết bài mới"}
          </h2>
          <button
            type="button"
            onClick={handleAiSuggestTitle}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-650 to-indigo-650 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-md cursor-pointer transition duration-200"
          >
            <Sparkles className="h-4 w-4" /> Gợi ý tiêu đề AI
          </button>
        </div>

        {state?.error && (
          <div className="p-4 text-sm font-semibold text-red-650 bg-red-50 border border-red-100 rounded-xl">
            {state.error}
          </div>
        )}

        {/* Tích hợp Upload Ảnh Bìa */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-bold text-slate-700">Ảnh bài viết</label>
          <ImageUpload value={imageUrl} onChange={setImageUrl} />
          <input type="hidden" name="image_url" value={imageUrl} />
        </div>

        {/* Tiêu đề */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="title" className="text-sm font-bold text-slate-700">Tiêu đề *</label>
          <input 
            id="title" 
            name="title" 
            type="text" 
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              generateSlugFromTitle(e.target.value)
            }}
            required 
            className="border border-slate-250 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold"
            placeholder="Nhập tiêu đề hấp dẫn..."
          />
        </div>

        {/* Slug */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="slug" className="text-sm font-bold text-slate-700">Đường dẫn tĩnh (Slug) *</label>
          <input 
            id="slug" 
            name="slug" 
            type="text" 
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required 
            pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
            title="Slug chỉ được chứa chữ thường không dấu, số, và dấu gạch ngang"
            className="border border-slate-250 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 font-medium"
            placeholder="duong-dan-bai-viet"
          />
        </div>

        {/* Nội dung */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="content" className="text-sm font-bold text-slate-700">Nội dung (Định dạng Markdown) *</label>
          <textarea 
            id="content" 
            name="content" 
            defaultValue={initialData?.content}
            required 
            rows={12}
            className="border border-slate-250 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono text-[14px] leading-relaxed text-gray-800 bg-slate-50 resize-y"
            placeholder="# Tiêu đề chương&#10;&#10;Nội dung viết ở đây..."
          />
        </div>

        {/* Xuất bản */}
        <div className="flex items-center space-x-3 bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
          <input 
            id="published" 
            name="published" 
            type="checkbox" 
            defaultChecked={initialData?.published}
            className="w-5 h-5 rounded border-indigo-300 text-indigo-650 focus:ring-indigo-500 cursor-pointer"
          />
          <label htmlFor="published" className="text-sm font-bold text-indigo-900 cursor-pointer select-none">
            🌍 Công khai bài viết trực tiếp lên Blog
          </label>
        </div>

        {/* Nút hành động */}
        <div className="flex space-x-3 pt-6 border-t mt-2">
          <Link href="/dashboard/posts" className="px-6 py-2.5 border border-slate-200 rounded-xl text-slate-700 font-bold transition text-sm flex items-center justify-center hover:bg-slate-50">
            Hủy
          </Link>
          <button 
            type="submit" 
            disabled={isPending}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl disabled:bg-indigo-400 font-bold shadow-md transition text-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? "Đang lưu..." : isEditing ? "Lưu thay đổi bài viết" : "Công bố bài viết"}
          </button>
        </div>
      </form>

      {/* Modal gợi ý tiêu đề AI */}
      {showAiModal && (
        <div className="fixed inset-0 z-55 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col gap-6 text-left">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-1.5">
                <Sparkles className="h-5 w-5 text-purple-650" /> Trợ lý gợi ý tiêu đề AI
              </h3>
              <p className="text-xs text-slate-500 mt-1">Dựa trên nội dung bản nháp, AI gợi ý 5 tiêu đề tối ưu hóa. Bấm vào tiêu đề bên dưới để chọn:</p>
            </div>

            {aiLoading && (
              <div className="py-8 flex flex-col items-center justify-center text-slate-450 gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                <span className="text-sm font-semibold">AI đang phân tích và soạn thảo...</span>
              </div>
            )}

            {aiError && (
              <div className="p-3 text-xs font-semibold text-red-650 bg-red-50 border border-red-100 rounded-xl">
                {aiError}
              </div>
            )}

            {!aiLoading && parsedSuggestions.length > 0 && (
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {parsedSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setTitle(suggestion)
                      generateSlugFromTitle(suggestion)
                      setShowAiModal(false)
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition font-semibold text-sm text-slate-800 cursor-pointer"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowAiModal(false)
                  setAiError("")
                }}
                className="px-4 py-2.5 text-xs font-bold border border-slate-205 text-slate-705 rounded-xl hover:bg-slate-50 transition cursor-pointer"
                disabled={aiLoading}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
