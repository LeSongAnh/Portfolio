'use client';

import { useActionState } from 'react';
import { submitContactForm } from './actions';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';

export default function Contact() {
  const [state, formAction, isPending] = useActionState(submitContactForm, {});

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-12">
        <div className="container-custom">
          <h1 className="text-5xl font-bold text-white">Contact Me</h1>
          <p className="text-lg mt-2">I'd love to hear from you!</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container-custom max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">hello@portfolio.com</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="font-bold mb-2">Phone</h3>
              <p className="text-gray-600 dark:text-gray-400">+84 123 456 789</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="font-bold mb-2">Address</h3>
              <p className="text-gray-600 dark:text-gray-400">Hanoi, Vietnam</p>
            </Card>
          </div>

          {/* Form */}
          <Card className="border-t-4 border-t-purple-600">
            <h2 className="text-2xl font-bold mb-6">Send me a message</h2>
            
            {state.message && (
              <div className={`mb-6 p-4 rounded-lg border ${
                state.errors 
                  ? 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-700 dark:text-red-200'
                  : 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-700 dark:text-green-200'
              }`}>
                {state.message}
              </div>
            )}

            <form action={formAction} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 mb-2 block">
                  Name *
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  disabled={isPending}
                  placeholder="Your name"
                />
                {state.errors?.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{state.errors.name[0]}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 mb-2 block">
                  Email *
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  disabled={isPending}
                  placeholder="your@email.com"
                />
                {state.errors?.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{state.errors.email[0]}</p>
                )}
              </div>

              <div>
                <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300 mb-2 block">
                  Subject *
                </Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  disabled={isPending}
                  placeholder="Message subject"
                />
                {state.errors?.subject && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{state.errors.subject[0]}</p>
                )}
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-700 dark:text-gray-300 mb-2 block">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  disabled={isPending}
                  rows={6}
                  placeholder="Your message..."
                />
                {state.errors?.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{state.errors.message[0]}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full"
              >
                {isPending ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}
