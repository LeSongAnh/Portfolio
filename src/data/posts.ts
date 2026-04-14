export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
  readTime: number;
}

export const posts: Post[] = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js App Router',
    excerpt: 'Tìm hiểu cách sử dụng Next.js App Router để xây dựng ứng dụng web hiện đại.',
    content: `Next.js App Router là cách mới để định tuyến trong Next.js 13+. Nó cung cấp:

- File-based routing tự động
- Nested layouts
- Server Components mặc định
- Dynamic routes với [slug]
- Loading, error, và not-found UI

App Router giúp bạn xây dựng ứng dụng nhanh hơn với ít code hơn.

## Tại sao chọn Next.js?

Next.js là framework React fullstack với:
- Rendering tối ưu (SSR, SSG, ISR)
- API routes tích hợp
- Image optimization
- Font optimization
- CSS modules và Tailwind hỗ trợ

## Bắt đầu

Tạo project mới:
\`\`\`bash
npx create-next-app@latest my-app
\`\`\``,
    date: '2026-04-10',
    category: 'Tutorial',
    author: 'Lê Văn A',
    readTime: 8
  },
  {
    slug: 'tailwind-css-best-practices',
    title: 'Tailwind CSS Best Practices',
    excerpt: 'Những cách tốt nhất để sử dụng Tailwind CSS trong dự án Next.js.',
    content: `Tailwind CSS là utility-first CSS framework giúp bạn xây dựng UI nhanh chóng.

## Những điểm cần nhớ:

1. **Responsive-first approach**: Luôn bắt đầu từ mobile
2. **Component extraction**: Tạo components cho các UI patterns lặp lại
3. **Custom configuration**: Customize tailwind.config.ts cho brand của bạn
4. **Performance**: Tailwind tự động purge unused CSS

## Ví dụ thực tế

Tạo một responsive grid:
\`\`\`tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Items */}
</div>
\`\`\`

Điều này tạo layout:
- 1 cột trên mobile
- 2 cột trên tablet (md)
- 3 cột trên desktop (lg)`,
    date: '2026-04-08',
    category: 'CSS',
    author: 'Trần Minh B',
    readTime: 6
  },
  {
    slug: 'react-server-components-explained',
    title: 'React Server Components Explained',
    excerpt: 'Hiểu sâu về React Server Components và cách chúng thay đổi cách viết code.',
    content: `React Server Components (RSC) là paradigm mới trong React cho phép chạy component trên server.

## Lợi ích của Server Components

- Giảm JS bundle size
- Truy cập trực tiếp database
- Bảo mật (API keys ở server)
- Render một lần rồi gửi HTML

## Khi nào dùng Server vs Client?

**Server Components (mặc định)**:
- Fetch data từ API/database
- Giữ secrets an toàn
- Render nội dung động

**Client Components ("use client")**:
- Xử lý user interactions (click, input)
- React hooks (useState, useEffect)
- Event listeners

## Ví dụ

Server Component:
\`\`\`tsx
export default async function Page() {
  const posts = await fetch('/api/posts');
  return <div>{/* posts list */}</div>;
}
\`\`\`

Client Component:
\`\`\`tsx
'use client';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\``,
    date: '2026-04-05',
    category: 'React',
    author: 'Phạm Thị C',
    readTime: 10
  },
  {
    slug: 'typescript-tips-and-tricks',
    title: 'TypeScript Tips and Tricks for React Devs',
    excerpt: 'Những mẹo TypeScript hữu ích để viết code React an toàn hơn.',
    content: `TypeScript giúp bạn viết code React an toàn hơn với type checking.

## Những điểm cần biết:

1. **Generic Types**: Tạo components linh hoạt
2. **Utility Types**: Pick, Omit, Record
3. **Type Guards**: typeof, instanceof
4. **Union Types**: A | B

## Interface vs Type

Interface:
\`\`\`tsx
interface User {
  id: number;
  name: string;
}
\`\`\`

Type:
\`\`\`tsx
type User = {
  id: number;
  name: string;
};
\`\`\`

Cả hai đều hữu ích, chọn dựa trên context`,
    date: '2026-04-02',
    category: 'TypeScript',
    author: 'Nguyễn Văn D',
    readTime: 7
  },
  {
    slug: 'api-integration-with-nextjs',
    title: 'APIs Integration with Next.js',
    excerpt: 'Hướng dẫn tích hợp APIs vào Next.js một cách hiệu quả.',
    content: `Integrasi API di Next.js rất mudah dengan App Router.

## Fetch Data

Server Component:
\`\`\`tsx
export default async function Page() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  return <div>{posts.map(p => <p>{p.title}</p>)}</div>;
}
\`\`\`

Client Component + useEffect:
\`\`\`tsx
'use client';
import { useState, useEffect } from 'react';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch('/api/posts').then(r => r.json()).then(setPosts);
  }, []);
  
  return <div>{posts.map(p => <p>{p.title}</p>)}</div>;
}
\`\`\``,
    date: '2026-03-30',
    category: 'Tutorial',
    author: 'Hoàng Anh E',
    readTime: 5
  },
  {
    slug: 'nextjs-performance-optimization',
    title: 'Next.js Performance Optimization',
    excerpt: 'Tối ưu performance cho ứng dụng Next.js bằng các best practices.',
    content: `Performance là yếu tố quan trọng cho UX.

## Image Optimization

Sử dụng next/image:
\`\`\`tsx
import Image from 'next/image';

<Image src="/hero.jpg" alt="Hero" width={800} height={600} />
\`\`\`

## Code Splitting

Dynamic imports:
\`\`\`tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <p>Loading...</p>
});
\`\`\`

## Caching

- Static: Cache cho static content
- Dynamic: Fetch realtime
- Revalidate: ISR (Incremental Static Regeneration)`,
    date: '2026-03-25',
    category: 'Performance',
    author: 'Vũ Thị F',
    readTime: 9
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug);
}

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(post => post.category === category);
}
