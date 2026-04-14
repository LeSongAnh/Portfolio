export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  status: 'Completed' | 'In Progress' | 'Planning';
  link: string;
  github?: string;
  image?: string;
  features: string[];
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Portfolio Website',
    description: 'Website portfolio cá nhân được xây dựng với Next.js, Tailwind CSS với đầy đủ Blog và Projects showcase.',
    longDescription: `Portfolio Website là một ứng dụng web hoàn chỉnh giới thiệu các dự án và blog cá nhân.

## Tính năng chính:
- Showcase projects đẹp mắt
- Blog với dynamic routes
- Contact form tương tác
- Responsive design
- Dark mode support

## Công nghệ:
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- TypeScript
- GitHub Pages hoặc Vercel deploy`,
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    status: 'Completed',
    link: 'https://portfolio.example.com',
    github: 'https://github.com/user/portfolio',
    features: ['Blog with dynamic routes', 'Projects showcase', 'Contact form', 'Responsive design', 'Dark mode'],
  },
  {
    id: '2',
    title: 'E-Commerce Platform',
    description: 'Nền tảng thương mại điện tử hoàn chỉnh với giỏ hàng, thanh toán, và quản lý sản phẩm.',
    longDescription: `E-Commerce Platform cung cấp một giải pháp bán hàng trực tuyến đầy đủ.

## Tính năng:
- Product catalog
- Shopping cart
- Stripe payment integration
- Order management
- Admin dashboard
- User authentication

## Stack:
- Frontend: React, Next.js
- Backend: Node.js, Express
- Database: MongoDB
- Payment: Stripe API`,
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    status: 'In Progress',
    link: 'https://ecommerce.example.com',
    github: 'https://github.com/user/ecommerce',
    features: ['Product catalog', 'Shopping cart', 'Stripe payments', 'Admin dashboard', 'Order tracking'],
  },
  {
    id: '3',
    title: 'Task Management App',
    description: 'Ứng dụng quản lý công việc với tính năng real-time collaboration và notifications.',
    longDescription: `Task Management App giúp bạn tổ chức công việc hiệu quả với team collaboration.

## Tính năng:
- Create/edit/delete tasks
- Real-time updates
- Team collaboration
- Email notifications
- Task categorization
- Progress tracking`,
    tech: ['Next.js', 'Firebase', 'Tailwind CSS'],
    status: 'Completed',
    link: 'https://tasks.example.com',
    github: 'https://github.com/user/tasks',
    features: ['Real-time updates', 'Team collaboration', 'Email notifications', 'Task filtering', 'Calendar view'],
  },
  {
    id: '4',
    title: 'Weather Dashboard',
    description: 'Dashboard thời tiết với dự báo theo giờ, theo tuần và các widget thông tin chi tiết.',
    longDescription: `Weather Dashboard cung cấp thông tin thời tiết chi tiết với UI đẹp và responsive.

## Tính năng:
- Real-time weather data
- Hourly forecast
- Weekly forecast
- Weather alerts
- Location search
- Multiple locations`,
    tech: ['React', 'OpenWeather API', 'Chart.js'],
    status: 'Completed',
    link: 'https://weather.example.com',
    features: ['Real-time data', 'Hourly forecast', 'Location search', 'Weather alerts', 'Charts & graphs'],
  },
  {
    id: '5',
    title: 'Social Media App',
    description: 'Ứng dụng mạng xã hội với tính năng đăng bài, bình luận, like và theo dõi người dùng.',
    longDescription: `Social Media App là một platform để chia sẻ nội dung với bạn bè và cộng đồng.

## Tính năng:
- User authentication
- Create posts
- Like & comments
- Follow users
- Direct messaging
- Activity feed`,
    tech: ['Next.js', 'PostgreSQL', 'WebSocket'],
    status: 'In Progress',
    link: 'https://social.example.com',
    features: ['User profiles', 'Post creation', 'Real-time chat', 'Notifications', 'Feed timeline'],
  },
  {
    id: '6',
    title: 'AI Chat Bot',
    description: 'Chatbot thông minh được cấp quyền bởi OpenAI với các tính năng hội thoại tự nhiên.',
    longDescription: `AI Chat Bot sử dụng OpenAI API để cung cấp trợ lý AI thông minh.

## Tính năng:
- Natural language processing
- Context awareness
- Multiple conversation threads
- Code highlighting
- Export conversations
- API integration examples`,
    tech: ['Next.js', 'OpenAI API', 'Tailwind CSS'],
    status: 'Completed',
    link: 'https://chatbot.example.com',
    github: 'https://github.com/user/chatbot',
    features: ['AI responses', 'Conversation history', 'Code formatting', 'Copy to clipboard', 'Dark mode'],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export function getAllProjects(): Project[] {
  return projects;
}
