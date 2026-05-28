# 💡 PHỤ LỤC: MINH CHỨNG TÍCH HỢP TÍNH NĂNG AI TRONG PHÁT TRIỂN
*(Phục vụ cho việc báo cáo đồ án môn học và chấm điểm của Giảng viên)*

Dự án này tích hợp các tính năng trí tuệ nhân tạo (AI) thực tế nhằm nâng cao năng suất quản lý nội dung (CMS) cho lập trình viên. Dưới đây là mô tả chi tiết các mô hình, kỹ thuật thiết kế Prompt (Prompt Engineering) và vết cơ sở dữ liệu để làm bằng chứng bảo vệ đồ án.

---

## 1. Mô hình AI lựa chọn
* **Tên mô hình**: `Google Gemini 2.5 Flash` (gọi trực tiếp qua Google AI API).
* **Lý do lựa chọn**:
  * Tốc độ xử lý cực nhanh (chuyên dụng cho các tác vụ thời gian thực).
  * Hỗ trợ xử lý văn bản tiếng Việt xuất sắc, tự nhiên.
  * Có chính sách Free Tier hào phóng cho mục đích học tập/đồ án.

---

## 2. Tính năng AI 1: Tự động viết mô tả dự án (Project Description Generator)
* **Mục đích**: Người quản trị chỉ cần nhập một vài ý chính (ví dụ: gạch đầu dòng về tính năng, công nghệ), AI sẽ tự động định dạng và soạn thảo thành một mô tả chi tiết bằng Markdown.
* **Tệp mã nguồn**: `src/app/actions/ai.ts` -> hàm `generateProjectDescriptionAction`

### Prompt Thiết kế (Prompt Template)
```text
Bạn là một trợ lý AI viết nội dung chuyên nghiệp cho lập trình viên. 
Hãy viết một bài giới thiệu dự án chi tiết và hấp dẫn bằng định dạng Markdown từ các ý chính sau đây:
"${bulletPoints}"

Yêu cầu:
1. Có tiêu đề lớn giới thiệu dự án.
2. Mô tả ngắn gọn mục đích và bối cảnh dự án.
3. Liệt kê các tính năng nổi bật.
4. Đưa ra kiến trúc công nghệ và lý do lựa chọn.
5. Định dạng Markdown chuẩn, rõ ràng, dễ nhìn.
6. Trả về kết quả bằng tiếng Việt, viết chuyên nghiệp, tràn đầy năng lượng.
```

### Kết quả đầu ra mẫu (Markdown Output)
```markdown
# 🚀 Dự án: Cổng thông tin học tập AI

## 🌟 Tổng quan dự án
Một hệ thống ứng dụng hiện đại được phát triển nhằm tối ưu hóa trải nghiệm người dùng và cung cấp giải pháp giáo dục trực tuyến chất lượng cao...

## ⚡ Các tính năng nổi bật
* **Đồng bộ hóa thời gian thực**: Trải nghiệm mượt mà không cần reload trang.
* **Đăng nhập Google**: Tích hợp OAuth bảo mật.

## 🛠️ Công nghệ sử dụng
* **Frontend**: Next.js 16, React 19, Tailwind v4
* **Backend**: Supabase Serverless & PostgreSQL
```

---

## 3. Tính năng AI 2: Gợi ý tiêu đề bài viết tối ưu SEO (Blog Title Suggester)
* **Mục đích**: Khi soạn thảo blog, người dùng viết nội dung nháp, AI sẽ phân tích và gợi ý 5 tiêu đề (headline) hấp dẫn, kích thích người đọc và tối ưu SEO.
* **Tệp mã nguồn**: `src/app/actions/ai.ts` -> hàm `suggestBlogTitleAction`

### Prompt Thiết kế (Prompt Template)
```text
Dựa trên nội dung bản nháp bài viết sau, hãy gợi ý 5 tiêu đề (Headline) thật hấp dẫn, thu hút người đọc và tối ưu SEO:
"${draftContent}"

Chỉ trả về danh sách 5 dòng tiêu đề ngắn gọn bằng tiếng Việt.
```

### Kết quả đầu ra mẫu (5 gợi ý tiêu đề)
```text
1. 🚀 Bí quyết làm chủ Next.js 16 và React 19 chỉ trong vài ngày
2. 💡 Xây dựng hệ thống CRUD cực nhanh với Supabase cho dự án lớn
3. 🌟 Tại sao lập trình viên hiện đại cần có một AI Portfolio & Developer CMS?
4. 🛠️ Tối ưu hóa hiệu năng ứng dụng Next.js của bạn với Docker & Docker Compose
5. ⚡ Nâng tầm website cá nhân bằng cách tích hợp trí tuệ nhân tạo Google Gemini
```

---

## 4. Cơ chế lưu trữ minh chứng (AI Audit Trail Log)
Mỗi cuộc gọi API thành công hay sử dụng tính năng Mock đều được hệ thống tự động ghi lại vào bảng `ai_logs` trong cơ sở dữ liệu Supabase nhằm phục vụ cho kiểm tra của Giảng viên.

* **Cấu trúc bảng `ai_logs`**:
  * `id`: Khóa chính định danh duy nhất (UUID).
  * `user_id`: ID người dùng thực hiện (Liên kết bảng `auth.users`).
  * `feature_name`: Tên tính năng (`project_description_generator` hoặc `blog_title_suggester`).
  * `prompt`: Nội dung ý chính hoặc bản nháp ban đầu của người dùng.
  * `response`: Kết quả trả về thực tế từ AI.
  * `created_at`: Thời gian thực hiện cuộc gọi.

* **Cách kiểm tra dữ liệu**:
  1. Đăng nhập Supabase Dashboard.
  2. Truy cập vào phần **Table Editor** hoặc **SQL Editor**.
  3. Chạy lệnh: `SELECT * FROM ai_logs ORDER BY created_at DESC;`
  4. Giảng viên sẽ thấy toàn bộ lịch sử tương tác AI được ghi nhận cùng dấu mốc thời gian thực tế.
