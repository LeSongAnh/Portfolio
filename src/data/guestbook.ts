export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export let guestbookEntries: GuestbookEntry[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    message: 'Trang web rất đẹp và chuyên nghiệp!',
    createdAt: new Date('2026-04-15').toISOString(),
  },
  {
    id: '2',
    name: 'Trần Thị B',
    message: 'Bài viết về Next.js rất hay, cảm ơn bạn!',
    createdAt: new Date('2026-04-16').toISOString(),
  },
  {
    id: '3',
    name: 'Lê Minh C',
    message: 'Keep up the great work! 🚀',
    createdAt: new Date('2026-04-17').toISOString(),
  },
];
