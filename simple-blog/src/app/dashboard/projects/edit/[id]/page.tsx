import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ProjectForm } from "@/components/dashboard/project-form"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Lấy thông tin dự án cần chỉnh sửa
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (!project) {
    notFound()
  }

  return <ProjectForm project={project} />
}
