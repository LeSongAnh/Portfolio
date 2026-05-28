"use client"

import { useActionState, useEffect, useRef } from "react"
import { addCommentAction } from "@/app/actions/comments"

export function CommentForm({ postId }: { postId: string }) {
  const [state, formAction, isPending] = useActionState(addCommentAction.bind(null, postId), { error: "", success: false })
  const formRef = useRef<HTMLFormElement>(null)

  // Tự động clear form khi gửi bình luận thành công
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-6 shadow-sm">
      <label htmlFor="content" className="sr-only">Nhập bình luận của bạn</label>
      <textarea 
        id="content" 
        name="content"
        rows={3}
        required
        disabled={isPending}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white resize-none"
        placeholder="Tuyệt quá! Bài viết này hữu ích ghê..."
      />
      {state.error && <p className="text-red-600 text-sm mt-2 font-medium">⚠️ {state.error}</p>}
      <div className="mt-3 flex justify-end">
        <button 
          type="submit" 
          disabled={isPending}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition font-bold shadow-md disabled:opacity-50"
        >
          {isPending ? "Đang gửi đi..." : "Gửi Bình Luận"}
        </button>
      </div>
    </form>
  )
}
