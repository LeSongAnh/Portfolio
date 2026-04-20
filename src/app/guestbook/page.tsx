'use client';

import { useEffect, useState } from 'react';
import type { GuestbookEntry } from '@/data/guestbook';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch danh sách entries
  const fetchEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/guestbook');
      if (!res.ok) {
        throw new Error('Failed to fetch entries');
      }
      const data: GuestbookEntry[] = await res.json();
      setEntries(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit');
      }

      // Clear form
      setName('');
      setMessage('');

      // Refresh entries
      await fetchEntries();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete entry
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    try {
      const res = await fetch(`/api/guestbook/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete entry');
      }

      // Refresh entries
      await fetchEntries();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
        <div className="container-custom">
          <h1 className="text-5xl font-bold text-white">Guestbook</h1>
          <p className="text-lg mt-2">Leave a message and share your thoughts!</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container-custom max-w-3xl">
          {/* Form */}
          <Card className="mb-12 border-t-4 border-t-green-600">
            <h2 className="text-2xl font-bold mb-6">Leave a Message</h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 mb-2 block">
                  Name *
                </Label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  disabled={isSubmitting}
                  minLength={2}
                  maxLength={50}
                  required
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-700 dark:text-gray-300 mb-2 block">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message..."
                  rows={4}
                  disabled={isSubmitting}
                  maxLength={500}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </Card>

          {/* Entries List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Messages</h2>
              <Badge variant="default">{entries.length}</Badge>
            </div>

            {loading ? (
              <Card className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">Loading entries...</p>
              </Card>
            ) : entries.length === 0 ? (
              <Card className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No entries yet. Be the first to leave a message!
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {entries.map(entry => (
                  <Card key={entry.id} className="hover:shadow-md transition">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{entry.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(entry.createdAt).toLocaleString('vi-VN')}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleDelete(entry.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-700 dark:hover:bg-red-950"
                      >
                        Delete
                      </Button>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{entry.message}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
