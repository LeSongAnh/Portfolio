import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ProfileForm } from "@/components/dashboard/profile-form"

export default async function ProfileSettingsPage() {
  const supabase = await createClient()

  // Lấy thông tin user hiện tại
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    notFound()
  }

  // Lấy thông tin profile tương ứng
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle()

  if (!profile) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Hồ sơ & Cài đặt</h1>
        <p className="text-slate-500 mt-1">Cấu hình thông tin tiểu sử cá nhân và các liên kết xã hội hiển thị trên trang chủ Portfolio.</p>
      </div>

      <ProfileForm profile={profile} />
    </div>
  )
}
