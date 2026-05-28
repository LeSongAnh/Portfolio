import ReactMarkdown from "react-markdown"

export function CommentList({ comments }: { comments: any[] }) {
  if (comments.length === 0) return <p className="text-gray-500 italic p-4 text-center bg-gray-50 rounded-lg">Chưa có bình luận nào. Đừng ngại chia sẻ cảm nghĩ của bạn nhé!</p>

  return (
    <div className="space-y-4">
      {comments.map(c => {
        const username = c.profiles?.username || "Ẩn Danh Tự Động"
        const avatarLetter = typeof username === 'string' ? username.charAt(0).toUpperCase() : "A"
        
        return (
          <div key={c.id} className="flex space-x-4 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center font-bold text-indigo-700 flex-shrink-0 text-xl border border-indigo-50 shadow-sm">
              {avatarLetter}
            </div>
            <div className="flex-1 w-full overflow-hidden">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-bold text-sm text-gray-900">{username}</span>
                <span className="text-xs font-mono text-gray-400">• {new Date(c.created_at).toLocaleString("vi-VN")}</span>
              </div>
              <div className="prose prose-sm md:prose-base prose-slate max-w-none text-gray-800">
                {/* Hỗ trợ markdown cả trong bình luận */}
                <ReactMarkdown>{c.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
