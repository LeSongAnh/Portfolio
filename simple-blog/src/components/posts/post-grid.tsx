'use client'

import Link from 'next/link'

interface Post {
  id: string
  slug: string
  title: string
  excerpt: string | null
  image_url: string | null
  created_at: string
  profiles?: {
    full_name: string | null
    email: string
  }
}

interface PostGridProps {
  posts: Post[]
}

/**
 * Post grid component
 * Hiển thị danh sách bài viết dưới dạng grid
 */
export function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Chưa có bài viết nào</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.slug}`}
          className="group"
        >
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden h-full flex flex-col">
            {post.image_url && (
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
            )}

            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition">
                {post.title}
              </h3>

              {post.excerpt && (
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{post.profiles?.full_name || post.profiles?.email}</span>
                <span>
                  {new Date(post.created_at).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
