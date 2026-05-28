"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { logoutAction } from "@/app/actions/auth"
import { LayoutDashboard, Code, BookOpen, User, Globe, LogOut } from "lucide-react"

export function Sidebar({ 
  username, 
  avatarUrl, 
  role 
}: { 
  username: string
  avatarUrl?: string
  role: string 
}) {
  const pathname = usePathname()

  const links = [
    { href: "/dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { href: "/dashboard/projects", label: "Quản lý Dự án", icon: Code },
    { href: "/dashboard/posts", label: "Quản lý Bài viết", icon: BookOpen },
    { href: "/dashboard/profile", label: "Hồ sơ cá nhân", icon: User },
  ]

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col min-h-screen border-r border-slate-800">
      {/* Tiêu đề & Thông tin User */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/" className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          DevCMS<span className="text-indigo-400 font-bold text-[10px] px-1.5 py-0.5 bg-indigo-500/10 rounded uppercase">Admin</span>
        </Link>
        
        <div className="flex items-center gap-3 mt-6">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt={username} className="h-10 w-10 rounded-full border border-slate-700 object-cover" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-base border border-indigo-500/30">
              {username.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1 text-left">
            <h4 className="text-sm font-bold text-white truncate">{username}</h4>
            <span className="text-[10px] text-indigo-405 font-bold uppercase tracking-wider bg-indigo-500/10 px-1.5 py-0.5 rounded">{role}</span>
          </div>
        </div>
      </div>

      {/* Danh sách Links */}
      <nav className="flex-grow px-4 py-6 space-y-1">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
                isActive 
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-650/10" 
                  : "hover:bg-slate-800 hover:text-slate-100"
              }`}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer Sidebar */}
      <div className="p-4 border-t border-slate-850 space-y-1">
        <Link 
          href="/" 
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 hover:text-white transition text-slate-400"
        >
          <Globe className="h-4 w-4" />
          Xem trang chủ
        </Link>
        
        <form action={logoutAction} className="m-0">
          <button 
            type="submit" 
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-red-950/20 hover:text-red-400 transition text-slate-400 text-left cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </button>
        </form>
      </div>
    </aside>
  )
}
