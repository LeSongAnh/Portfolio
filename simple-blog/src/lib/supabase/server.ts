import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach((cookie: any) =>
              cookieStore.set(cookie.name, cookie.value, cookie.options)
            )
          } catch {
            // Lỗi xảy ra nếu gọi set cookie từ bên trong Server Component
            // Có thể bỏ qua an toàn vì Middleware hoặc Server Action sẽ chịu trách nhiệm set cookie
          }
        },
      },
    }
  )
}
