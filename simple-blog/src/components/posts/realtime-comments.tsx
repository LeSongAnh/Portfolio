"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { CommentList } from "./comment-list"
import { CommentForm } from "./comment-form"

type CommentType = {
  id: string
  content: string
  created_at: string
  profiles?: {
    username: string
  }
}

export function RealtimeComments({ postId, initialComments }: { postId: string, initialComments: CommentType[] }) {
  const [comments, setComments] = useState<CommentType[]>(initialComments)
  
  // Dùng browser client (do hook là client component)
  const supabase = createClient()

  useEffect(() => {
    // 🔥 Sức mạnh của Supabase Realtime - Đăng kí lắng nghe tự động mọi thay đổi INSERT trên bảng comments của Post này
    const channel = supabase
      .channel(`realtime-comments-${postId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments', filter: `post_id=eq.${postId}` },
        async (payload) => {
          const newComment = payload.new as any;
          
          // Khi hook postgres_changes bắt được, nó chỉ trả về raw data, ta gọi 1 hàm nhẹ lấy thêm profiles
          const { data: profileData } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', newComment.user_id)
            .single()

          // Cập nhật State trực tiếp mà ko cần refresh trình duyệt
          setComments((prev) => [
            {
              ...newComment,
              profiles: profileData || { username: 'Khách' }
            },
            ...prev
          ])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [postId, supabase])

  return (
    <div className="mt-16 border-t border-slate-200 pt-10">
      <h3 className="text-2xl font-black mb-6 text-gray-900">💬 Thảo luận ({comments.length})</h3>
      <CommentForm postId={postId} />
      <div className="mt-8">
        <CommentList comments={comments} />
      </div>
    </div>
  )
}
