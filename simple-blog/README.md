# 🚀 AI Portfolio & Developer CMS
*Đồ án tốt nghiệp môn học Phát triển Web nâng cao & Ứng dụng AI*

Hệ thống **AI Portfolio & Developer CMS** là ứng dụng full-stack hiện đại được xây dựng bằng **Next.js 16 (App Router)**, **React 19**, và **Tailwind CSS v4**. Dự án tích hợp sâu rộng các dịch vụ serverless của **Supabase** (Xác thực, Cơ sở dữ liệu PostgreSQL, Lưu trữ Storage) kết hợp với chính sách bảo mật **Row Level Security (RLS)** nghiêm ngặt, cơ chế cập nhật thời gian thực (**Realtime Comments**) và tính năng tạo nội dung thông minh bằng **Google Gemini 2.5 Flash API**.

---

## ⚡ Các Tính Năng Chính
1. **Developer Portfolio (Trang chủ)**: Hiển thị thông tin cá nhân chuyên nghiệp, chức danh lập trình viên, gạch đầu dòng kỹ năng chính, dự án tiêu biểu (Featured Projects) và bài viết mới nhất.
2. **Blog & Comments (Thời gian thực)**: Cho phép đọc bài viết, thích (Like), và bình luận thời gian thực (Realtime Postgres Changes) không cần tải lại trang.
3. **Projects Gallery (Công nghệ & Thẻ)**: Trang trưng bày các dự án thực tế kèm thẻ công nghệ, liên kết mã nguồn GitHub và đường dẫn Live Demo.
4. **Admin Dashboard (Quản trị CMS)**: 
   * Thống kê tổng số lượng bài viết, dự án, bình luận, và cuộc gọi AI.
   * Quản lý CRUD (Thêm, Sửa, Xóa) bài viết và dự án một cách an toàn thông qua **Next.js Server Actions**.
   * Quản lý Hồ sơ cá nhân (avatar, biography, mạng xã hội).
5. **AI Content Helper (Trợ lý AI)**:
   * **Gợi ý tiêu đề bài viết**: Phân tích nội dung bản nháp để đưa ra 5 tùy chọn tiêu đề tối ưu SEO.
   * **Tự động viết mô tả**: Chuyển các ý chính thô sơ thành bài viết mô tả dự án Markdown chi tiết.
   * **Nhật ký AI (ai_logs)**: Tự động ghi lại lịch sử gọi AI vào DB làm minh chứng đồ án.
6. **Dockerized & Cloud Ready**: Đóng gói hoàn chỉnh bằng Dockerfile và Docker Compose, dễ dàng deploy lên VPS độc lập kèm SSL bảo mật.

---

## 🛠️ Công Nghệ Sử Dụng
* **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4, Lucide Icons.
* **Backend & Auth**: Supabase Auth (Cookie-based Server Auth Flow), Server Actions.
* **Database**: PostgreSQL (Supabase) + RLS Policies.
* **Storage**: Supabase Storage Buckets (lưu trữ ảnh đại diện, ảnh bìa).
* **AI Engine**: Google Gemini 2.5 Flash API (qua REST/Fetch).
* **DevOps**: Docker, Docker Compose, Nginx.

---

## 🚀 Hướng Dẫn Cài Đặt (Local Development)

### 1. Chuẩn bị Cơ sở dữ liệu Supabase
1. Đăng nhập vào [Supabase Console](https://supabase.com).
2. Tạo dự án mới hoặc sử dụng dự án hiện có.
3. Vào phần **SQL Editor**, tạo một query mới, copy toàn bộ nội dung trong tệp [supabase_schema.sql](supabase_schema.sql) của dự án dán vào và nhấn **Run** (Chạy).
4. SQL Script này sẽ tự động tạo các bảng `profiles`, `posts`, `projects`, `comments`, `likes`, `ai_logs` cùng các trigger đồng bộ hóa người dùng và thiết lập bảo mật Row Level Security (RLS) cho từng bảng.

### 2. Cấu hình Biến môi trường
Tạo tệp `.env.local` tại thư mục gốc của dự án (hoặc chỉnh sửa tệp có sẵn) với nội dung sau:
```env
# Supabase Keys (Lấy trong phần Project Settings -> API của dự án Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Google Gemini API Key (Lấy tại Google AI Studio: https://aistudio.google.com/)
# Nếu không cấu hình hoặc để trống, hệ thống sẽ tự động chạy ở chế độ MOCK AI để demo không bị lỗi.
GEMINI_API_KEY=your-gemini-api-key-here
```

### 3. Cài đặt Thư viện và Chạy ứng dụng
Mở terminal tại thư mục dự án và thực hiện các lệnh sau:
```bash
# 1. Cài đặt các thư viện cần thiết
npm install

# 2. Chạy ứng dụng ở chế độ lập trình (dev mode)
npm run dev
```
Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để kiểm nghiệm giao diện.

---

## 🐳 Khởi Chạy Bằng Docker
Dự án đã được cấu hình đóng gói tối ưu. Bạn có thể xây dựng và chạy ứng dụng trong môi trường container cô lập:

```bash
# Xây dựng container image và khởi chạy (tự động đọc file .env.local)
docker compose up --build -d

# Dừng hệ thống container
docker compose down
```
Sau khi chạy thành công, ứng dụng sẽ phục vụ tại `http://localhost:3000`.

---

## 🌐 Hướng Dẫn Triển Khai Lên VPS (Domain & SSL)

Để deploy ứng dụng lên máy chủ VPS độc lập (Ubuntu) và cấu hình tên miền HTTPS (SSL) miễn phí:

### Bước 1: Trỏ Domain
Trỏ bản ghi **A** của tên miền (ví dụ: `myportfolio.com`) về địa chỉ IP Public của VPS.

### Bước 2: Clone Code và Khởi chạy Docker trên VPS
Cài đặt Docker, Docker Compose trên VPS. Clone mã nguồn dự án, cấu hình `.env.local` tương tự và chạy lệnh:
```bash
docker compose up --build -d
```

### Bước 3: Cài đặt và Cấu hình Nginx làm Reverse Proxy
Cài đặt Nginx trên VPS:
```bash
sudo apt update
sudo apt install nginx -y
```

Tạo tệp cấu hình virtual host cho Nginx:
```bash
sudo nano /etc/nginx/sites-available/devcms
```

Dán cấu hình sau (thay đổi `myportfolio.com` thành tên miền của bạn):
```nginx
server {
    listen 80;
    server_name myportfolio.com www.myportfolio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Kích hoạt cấu hình và restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/devcms /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Bước 4: Setup SSL HTTPS miễn phí bằng Certbot (Let's Encrypt)
Chạy các lệnh cài đặt Certbot để tự động lấy chứng chỉ SSL và cấu hình HTTPS cho Nginx:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d myportfolio.com -d www.myportfolio.com
```
Chọn tùy chọn **Redirect** (tự động chuyển hướng toàn bộ lưu lượng HTTP sang HTTPS). Certbot sẽ tự động làm mới chứng chỉ SSL sau mỗi 90 ngày.

---

## 📚 Tài Liệu Hướng Dẫn Ôn Tập Vấn Đáp (Oral Exam Q&A)
*(Dành cho học viên chuẩn bị bảo vệ đồ án trước hội đồng giảng viên)*

### Câu 1: Em hãy giải thích luồng xác thực (Authentication Flow) của dự án này?
* **Trả lời**: Dự án sử dụng `@supabase/ssr` để cấu hình luồng **Cookie-based Server Auth Flow**. Khi người dùng đăng nhập, thông tin phiên (session) được mã hóa và lưu trữ dưới dạng Cookie trên trình duyệt. Middleware của Next.js (`src/middleware.ts`) sẽ chặn mọi request để kiểm tra, làm mới session cookie này và thực hiện phân quyền truy cập. Điều này giúp ngăn chặn hoàn toàn việc người dùng chưa đăng nhập cố tình truy cập vào `/dashboard`.

### Câu 2: Row Level Security (RLS) trong Supabase là gì và em đã cấu hình nó thế nào?
* **Trả lời**: RLS (Bảo mật cấp độ dòng) là tính năng của PostgreSQL cho phép kiểm soát quyền truy cập đến từng dòng dữ liệu dựa trên thông tin định danh của người thực hiện truy vấn (`auth.uid()`).
  * Trong đồ án, bảng `profiles` cho phép bất kỳ ai đọc (`select`), nhưng chỉ người sở hữu dòng profile đó mới được quyền cập nhật (`update`).
  * Các bảng `posts` và `projects` cho phép đọc công khai các dữ liệu có trạng thái `published = true`. Các hành động thêm, sửa, xóa (`insert`, `update`, `delete`) chỉ được chấp nhận nếu người thực hiện có quyền `admin` trong bảng `profiles` (được xác thực thông qua trigger tự động cấp quyền admin cho tài khoản đăng ký đầu tiên).

### Câu 3: Làm thế nào để chức năng bình luận (Comments) cập nhật ngay lập tức mà không cần reload trang?
* **Trả lời**: Dự án sử dụng tính năng **Supabase Realtime (Postgres Changes)**. Ở phía client (component `RealtimeComments.tsx`), chúng ta đăng ký lắng nghe sự kiện `INSERT` trên bảng `comments` thông qua Supabase Client SDK. Khi có bất kỳ bình luận mới nào được ghi nhận thành công vào database, Supabase sẽ lập tức đẩy sự kiện chứa dữ liệu mới đó về trình duyệt qua kết nối WebSocket, client nhận được và cập nhật state của React để hiển thị bình luận ngay lập tức.

### Câu 4: Server Actions có ưu điểm gì so với API Route truyền thống?
* **Trả lời**: Server Actions cho phép chúng ta viết trực tiếp các hàm chạy phía server và gọi chúng từ các form hoặc component phía client như một hàm JavaScript thông thường. 
  * Ưu điểm: Không cần phải viết các file API Route trung gian riêng biệt, tự động hóa luồng gửi nhận form (FormData), tích hợp sẵn với React 19's `useActionState` và giúp code trở nên tinh gọn, bảo mật cao do logic xử lý database hoàn toàn nằm ở phía server.

### Câu 5: Thiết lập Docker đa giai đoạn (Multi-stage Build) có lợi ích gì?
* **Trả lời**: Dockerfile đa giai đoạn chia quá trình đóng gói thành 2 phần:
  1. Giai đoạn 1 (`builder`): Sử dụng đầy đủ thư viện Node.js để cài đặt các dependency nặng (devDependencies) và biên dịch Next.js sang mã tối ưu.
  2. Giai đoạn 2 (`runner`): Chỉ copy thư mục `.next` đã biên dịch, `node_modules` sản xuất (dependencies) và một phiên bản Node.js rút gọn tối đa (Alpine).
  * Lợi ích: Giảm kích thước file Docker Image từ khoảng 1GB xuống dưới 150MB, giúp quá trình deploy nhanh hơn và loại bỏ các mã nguồn không cần thiết để tăng cường bảo mật.
