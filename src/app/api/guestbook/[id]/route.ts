import { NextResponse } from 'next/server';
import { guestbookEntries } from '@/data/guestbook';

interface Params {
  id: string;
}

// DELETE: Xóa entry theo id
export async function DELETE(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const index = guestbookEntries.findIndex(entry => entry.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: 'Entry not found' },
      { status: 404 }
    );
  }

  const deletedEntry = guestbookEntries.splice(index, 1)[0];

  return NextResponse.json(deletedEntry, { status: 200 });
}
