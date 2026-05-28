import { LoginForm } from "@/components/auth/login-form"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const { message } = await searchParams

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      {message && (
        <div className="mb-4 p-4 text-sm text-green-800 bg-green-100 border border-green-200 rounded-md max-w-sm w-full text-center shadow-sm">
          {message}
        </div>
      )}
      <LoginForm />
    </div>
  )
}
