import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Sidebar } from "@/components/dashboard/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // 1. Kiểm tra xác thực người dùng
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/login?message=${encodeURIComponent("Vui lòng đăng nhập để truy cập dashboard quản trị.")}`)
  }

  // 2. Lấy thông tin chi tiết profile người dùng
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle()

  return (
    <div className="flex bg-slate-100 min-h-screen text-slate-900">
      {/* Cột trái: Sidebar điều hướng */}
      <Sidebar 
        username={profile?.username || "Developer"} 
        avatarUrl={profile?.avatar_url} 
        role={profile?.role || "user"} 
      />

      {/* Cột phải: Nội dung động */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-screen text-left">
        {children}
      </main>
    </div>
  )
}
