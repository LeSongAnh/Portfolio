import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { logoutAction } from "@/app/actions/auth"
import { LayoutDashboard, LogIn, LogOut, Code, BookOpen } from "lucide-react"

export async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle()
    profile = data
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
              DevCMS.
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition">
              Trang chủ
            </Link>
            <Link href="/projects" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition flex items-center gap-1">
              <Code className="h-4 w-4" />
              Dự án
            </Link>
            <Link href="/blog" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              Bài viết
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard" 
                className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-full transition"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <div className="flex items-center gap-2">
                {profile?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.avatar_url} alt={profile.username} className="h-8 w-8 rounded-full border border-indigo-200 object-cover" />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 text-sm">
                    {profile?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <span className="hidden md:inline-block text-sm font-semibold text-slate-700">{profile?.username || "Developer"}</span>
              </div>
              <form action={logoutAction} className="m-0">
                <button type="submit" className="text-xs font-semibold text-slate-500 hover:text-red-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition flex items-center gap-1">
                  <LogOut className="h-3.5 w-3.5" />
                  Đăng xuất
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition px-3 py-2 flex items-center gap-1">
                <LogIn className="h-4 w-4" />
                Đăng nhập
              </Link>
              <Link href="/register" className="text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-full shadow-sm transition">
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile nav indicator/bar */}
      <div className="md:hidden flex justify-around border-t border-slate-100 bg-white py-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-indigo-600 transition">Trang chủ</Link>
        <Link href="/projects" className="hover:text-indigo-600 transition">Dự án</Link>
        <Link href="/blog" className="hover:text-indigo-600 transition">Bài viết</Link>
      </div>
    </header>
  )
}
