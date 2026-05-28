import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const { message } = await searchParams

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      {message && (
        <div className="mb-4 p-4 text-sm text-blue-800 bg-blue-100 border border-blue-200 rounded-md max-w-sm w-full text-center shadow-sm">
          {message}
        </div>
      )}
      <ForgotPasswordForm />
    </div>
  )
}
