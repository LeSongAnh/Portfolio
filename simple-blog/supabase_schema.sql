-- ====================================================================
-- SUPABASE POSTGRES SCHEMA & RLS POLICIES FOR AI PORTFOLIO & DEVELOPER CMS
-- ====================================================================
-- Hướng dẫn: Copy toàn bộ nội dung file này dán vào Supabase SQL Editor và chạy (Run).

-- 1. XÓA BẢNG CŨ NẾU CÓ (Để tránh xung đột khi làm mới)
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop table if exists public.ai_logs cascade;
drop table if exists public.likes cascade;
drop table if exists public.comments cascade;
drop table if exists public.projects cascade;
drop table if exists public.posts cascade;
drop table if exists public.profiles cascade;

-- 2. TẠO BẢNG PROFILES (Đồng bộ từ Auth Users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  avatar_url text,
  role text default 'user' check (role in ('user', 'admin')),
  title text,
  bio text,
  github_url text,
  linkedin_url text,
  website_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. TẠO BẢNG POSTS (Bài viết Blog)
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content text not null,
  image_url text,
  published boolean default false,
  author_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. TẠO BẢNG PROJECTS (Dự án Portfolio)
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  description text,
  content text not null,
  image_url text,
  live_url text,
  github_url text,
  tech_stack text[] default '{}',
  is_featured boolean default false,
  published boolean default false,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. TẠO BẢNG COMMENTS (Bình luận bài viết)
create table public.comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.posts(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  is_draft boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. TẠO BẢNG LIKES (Lượt thích bài viết)
create table public.likes (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.posts(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (post_id, user_id)
);

-- 7. TẠO BẢNG AI_LOGS (Minh chứng lịch sử sử dụng AI tool cho giảng viên)
create table public.ai_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  prompt text not null,
  response text not null,
  feature_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ====================================================================
-- RLS (ROW LEVEL SECURITY) POLICIES
-- ====================================================================

-- Kích hoạt RLS trên tất cả các bảng
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.projects enable row level security;
alter table public.comments enable row level security;
alter table public.likes enable row level security;
alter table public.ai_logs enable row level security;

-- A. CHÍNH SÁCH BẢNG PROFILES
create policy "Anyone can select profiles" on public.profiles 
  for select using (true);
create policy "Users can update their own profile" on public.profiles 
  for update using (auth.uid() = id);

-- B. CHÍNH SÁCH BẢNG POSTS
create policy "Anyone can view published posts" on public.posts 
  for select using (published = true);
create policy "Owner/Admin can view own posts" on public.posts 
  for select using (auth.uid() = author_id);
create policy "Admins can insert posts" on public.posts 
  for insert with check (auth.uid() = author_id and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can update own posts" on public.posts 
  for update using (auth.uid() = author_id and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can delete own posts" on public.posts 
  for delete using (auth.uid() = author_id and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- C. CHÍNH SÁCH BẢNG PROJECTS
create policy "Anyone can view published projects" on public.projects 
  for select using (published = true);
create policy "Owner/Admin can view own projects" on public.projects 
  for select using (auth.uid() = user_id);
create policy "Admins can insert projects" on public.projects 
  for insert with check (auth.uid() = user_id and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can update own projects" on public.projects 
  for update using (auth.uid() = user_id and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can delete own projects" on public.projects 
  for delete using (auth.uid() = user_id and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- D. CHÍNH SÁCH BẢNG COMMENTS
create policy "Anyone can view comments" on public.comments 
  for select using (true);
create policy "Authenticated users can insert comments" on public.comments 
  for insert with check (auth.uid() = user_id);
create policy "Users can update own comments" on public.comments 
  for update using (auth.uid() = user_id);
create policy "Users and Admins can delete comments" on public.comments 
  for delete using (auth.uid() = user_id or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- E. CHÍNH SÁCH BẢNG LIKES
create policy "Anyone can view likes" on public.likes 
  for select using (true);
create policy "Authenticated users can toggle likes" on public.likes 
  for insert with check (auth.uid() = user_id);
create policy "Users can delete own likes" on public.likes 
  for delete using (auth.uid() = user_id);

-- F. CHÍNH SÁCH BẢNG AI_LOGS
create policy "Users can view own AI logs" on public.ai_logs 
  for select using (auth.uid() = user_id or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Authenticated users can insert AI logs" on public.ai_logs 
  for insert with check (auth.uid() = user_id);

-- ====================================================================
-- TRIGGERS & FUNCTIONS (Tự động đồng bộ User và phân quyền Admin đầu tiên)
-- ====================================================================

-- Function tạo Profile khi có User đăng ký mới
create or replace function public.handle_new_user()
returns trigger as $$
declare
  is_first_user boolean;
begin
  -- Kiểm tra xem đây có phải user đăng ký đầu tiên không
  select not exists (select 1 from public.profiles limit 1) into is_first_user;
  
  insert into public.profiles (id, username, avatar_url, role, title, bio)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', 'developer_' || substr(new.id::text, 1, 8)),
    new.raw_user_meta_data->>'avatar_url',
    case when is_first_user then 'admin' else 'user' end,
    case when is_first_user then 'Senior Full-Stack Engineer & AI Developer' else 'Developer' end,
    case when is_first_user then 'Chuyên gia thiết kế và lập trình ứng dụng web chất lượng cao tích hợp công nghệ trí tuệ nhân tạo.' else 'Thành viên cộng đồng.' end
  );
  return new;
end;
$$ language plpgsql security definer;

-- Đăng ký trigger sau khi insert vào auth.users
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ====================================================================
-- INITIAL SEED DATA (Dành cho demo)
-- ====================================================================
-- Lưu ý: Seed data cho posts và projects cần có author_id hợp lệ từ auth.users.
-- Các bài viết mẫu có thể được thêm trực tiếp qua giao diện Admin sau khi tạo tài khoản.

-- ====================================================================
-- STORAGE SETUP & POLICIES (Tạo bucket và phân quyền)
-- ====================================================================

-- Tạo bucket 'images' để lưu ảnh upload
insert into storage.buckets (id, name, public) 
values ('images', 'images', true) 
on conflict (id) do nothing;

-- 1. Cho phép mọi người xem ảnh công khai
create policy "Public Access to Images" on storage.objects 
  for select using (bucket_id = 'images');

-- 2. Cho phép người dùng đã xác thực upload ảnh
create policy "Authenticated Upload to Images" on storage.objects 
  for insert with check (bucket_id = 'images' and auth.role() = 'authenticated');

-- 3. Cho phép chủ nhân cập nhật hoặc xóa ảnh trong thư mục của chính mình
create policy "Owner Update and Delete Images" on storage.objects 
  for all using (bucket_id = 'images' and auth.uid()::text = (storage.foldername(name))[1]);
