"use server"

import { createClient } from "@/lib/supabase/server"

// Helper ghi log AI vào database để làm minh chứng thực tế cho giảng viên
async function logAiQuery(userId: string, prompt: string, response: string, featureName: string) {
  try {
    const supabase = await createClient()
    await supabase.from("ai_logs").insert({
      user_id: userId,
      prompt,
      response,
      feature_name: featureName
    })
  } catch (error) {
    console.error("Lỗi ghi log AI:", error)
  }
}

// 1. Tạo mô tả dự án từ vài gạch đầu dòng
export async function generateProjectDescriptionAction(bulletPoints: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Bạn cần đăng nhập để sử dụng tính năng này." }
  }

  if (!bulletPoints || bulletPoints.trim().length < 5) {
    return { error: "Vui lòng nhập thêm chi tiết (tối thiểu 5 ký tự)." }
  }

  const prompt = `Bạn là một trợ lý AI viết nội dung chuyên nghiệp cho lập trình viên. 
Hãy viết một bài giới thiệu dự án chi tiết và hấp dẫn bằng định dạng Markdown từ các ý chính sau đây:
"${bulletPoints}"

Yêu cầu:
1. Có tiêu đề lớn giới thiệu dự án.
2. Mô tả ngắn gọn mục đích và bối cảnh dự án.
3. Liệt kê các tính năng nổi bật.
4. Đưa ra kiến trúc công nghệ và lý do lựa chọn.
5. Định dạng Markdown chuẩn, rõ ràng, dễ nhìn.
6. Trả về kết quả bằng tiếng Việt, viết chuyên nghiệp, tràn đầy năng lượng.`

  const apiKey = process.env.GEMINI_API_KEY
  let aiResponse = ""

  if (!apiKey) {
    console.warn("⚠️ GEMINI_API_KEY is not defined. Falling back to mock generator.")
    // Mock response khi chưa khai báo key để đảm bảo demo không lỗi
    aiResponse = `# 🚀 Dự án: Phát triển ứng dụng Web thông minh

Đây là mô tả dự án được tạo tự động bằng chế độ **Mock AI** (Hãy cấu hình \`GEMINI_API_KEY\` trong file \`.env.local\` để kết nối trí tuệ nhân tạo thực tế).

## 🌟 Tổng quan dự án
Dự án được xây dựng dựa trên định hướng nâng cấp hệ thống và giải quyết các bài toán sau:
* **Mục tiêu**: Tối ưu hóa hiệu năng tải trang và nâng cao trải nghiệm quản trị dữ liệu.
* **Ý chính được nhập**: "${bulletPoints}"

## ⚡ Các tính năng nổi bật
* **Đồng bộ hóa thời gian thực**: Trải nghiệm mượt mà không cần reload trang.
* **Hỗ trợ Markdown**: Dễ dàng soạn thảo nội dung với phong cách lập trình viên.
* **Giao diện đa thiết bị**: Thiết kế thích ứng tối đa (Responsive Web Design).

## 🛠️ Công nghệ sử dụng
* **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4
* **Backend**: Supabase Serverless & PostgreSQL Database
* **AI Engine**: Google Gemini 2.5 Flash Model`
  } else {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`)
      }

      const data = await response.json()
      aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Không thể tạo nội dung từ AI."
    } catch (error: any) {
      console.error("Lỗi gọi API Gemini:", error)
      return { error: "Lỗi kết nối API Gemini: " + error.message }
    }
  }

  // Ghi nhận lịch sử sử dụng AI vào DB
  await logAiQuery(user.id, bulletPoints, aiResponse, "project_description_generator")

  return { content: aiResponse }
}

// 2. Gợi ý tiêu đề bài viết từ bản nháp
export async function suggestBlogTitleAction(draftContent: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Bạn cần đăng nhập để sử dụng tính năng này." }
  }

  if (!draftContent || draftContent.trim().length < 10) {
    return { error: "Vui lòng nhập nội dung bài viết dài hơn (tối thiểu 10 ký tự)." }
  }

  const prompt = `Dựa trên nội dung bản nháp bài viết sau, hãy gợi ý 5 tiêu đề (Headline) thật hấp dẫn, thu hút người đọc và tối ưu SEO:
"${draftContent}"

Chỉ trả về danh sách 5 dòng tiêu đề ngắn gọn bằng tiếng Việt.`

  const apiKey = process.env.GEMINI_API_KEY
  let aiResponse = ""

  if (!apiKey) {
    console.warn("⚠️ GEMINI_API_KEY is not defined. Falling back to mock generator.")
    aiResponse = `1. 🚀 Bí quyết làm chủ Next.js 16 và React 19 chỉ trong vài ngày
2. 💡 Xây dựng hệ thống CRUD cực nhanh với Supabase cho dự án lớn
3. 🌟 Tại sao lập trình viên hiện đại cần có một AI Portfolio & Developer CMS?
4. 🛠️ Tối ưu hóa hiệu năng ứng dụng Next.js của bạn với Docker & Docker Compose
5. ⚡ Nâng tầm website cá nhân bằng cách tích hợp trí tuệ nhân tạo Google Gemini`
  } else {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`)
      }

      const data = await response.json()
      aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Không thể gợi ý tiêu đề."
    } catch (error: any) {
      console.error("Lỗi gọi API Gemini:", error)
      return { error: "Lỗi kết nối API Gemini: " + error.message }
    }
  }

  // Ghi nhận lịch sử sử dụng AI vào DB (lấy 300 ký tự đầu của prompt để lưu)
  await logAiQuery(user.id, draftContent.substring(0, 300), aiResponse, "blog_title_suggester")

  return { suggestions: aiResponse }
}
