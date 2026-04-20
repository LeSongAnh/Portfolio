'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(100, 'Subject must be at most 100 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be at most 1000 characters'),
});

type ContactFormState = {
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
  message?: string;
};

export async function submitContactForm(
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  // Validate using Zod
  const validationResult = contactSchema.safeParse({
    name,
    email,
    subject,
    message,
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    // Ở đây bạn có thể gửi email hoặc lưu vào database
    // Tạm thời chỉ log console
    console.log('Contact form submitted:', validationResult.data);

    return {
      message: 'Message sent successfully! We will contact you soon.',
    };
  } catch (error) {
    return {
      message: 'An error occurred while sending your message',
    };
  }
}
