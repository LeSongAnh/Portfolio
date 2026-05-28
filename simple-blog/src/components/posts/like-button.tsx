"use client"

import { useTransition, useState } from "react"
import { toggleLikeAction } from "@/app/actions/likes"

export function LikeButton({ postId, initialLiked, initialCount }: { postId: string, initialLiked: boolean, initialCount: number }) {
  const [isPending, startTransition] = useTransition()
  const [liked, setLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)

  const handleToggle = () => {
    // Optimistic Update (Cập nhật giao diện lập tức trước khi server phản hồi)
    const newLiked = !liked;
    setLiked(newLiked);
    setCount(newLiked ? count + 1 : count - 1);
    
    startTransition(async () => {
      const res = await toggleLikeAction(postId)
      if (res.error) {
        // Nếu lỗi xảy ra, hoàn tác lại trạng thái cũ
        setLiked(liked)
        setCount(count)
        alert(res.error)
      }
    })
  }

  return (
    <button 
      onClick={handleToggle}
      disabled={isPending}
      className={`flex items-center space-x-2 px-5 py-2.5 rounded-full border transition active:scale-95 shadow-sm 
        ${liked 
          ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100' 
          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
        }`}
    >
      <span className="text-xl leading-none">{liked ? "❤️" : "🤍"}</span>
      <span className="font-bold text-sm">{count} Lượt thích</span>
    </button>
  )
}
