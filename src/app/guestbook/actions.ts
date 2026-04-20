'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const guestbookSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be at most 50 characters'),
  message: z.string().min(1, 'Message is required').max(500, 'Message must be at most 500 characters'),
});

type GuestbookFormState = {
  errors?: {
    name?: string[];
    message?: string[];
  };
  message?: string;
};

export async function createGuestbookEntry(
  formData: FormData
): Promise<GuestbookFormState> {
  const name = formData.get('name');
  const message = formData.get('message');

  // Validate using Zod
  const validationResult = guestbookSchema.safeParse({
    name,
    message,
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    // Gọi API để tạo entry
    const response = await fetch('http://localhost:3000/api/guestbook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: validationResult.data.name,
        message: validationResult.data.message,
      }),
    });

    if (!response.ok) {
      return {
        message: 'Failed to create entry',
      };
    }

    revalidatePath('/guestbook');
    return {
      message: 'Entry created successfully',
    };
  } catch (error) {
    return {
      message: 'An error occurred while creating the entry',
    };
  }
}
