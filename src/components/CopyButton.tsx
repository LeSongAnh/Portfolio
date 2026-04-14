'use client';

import { useState } from 'react';

interface CopyButtonProps {
  text: string;
  children?: React.ReactNode;
}

export default function CopyButton({ text, children }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1 rounded text-sm font-medium transition ${
        copied
          ? 'bg-green-100 text-green-700'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
      title={copied ? 'Đã copy!' : 'Copy'}
    >
      {children || (copied ? '✓ Đã copy!' : '📋 Copy')}
    </button>
  );
}
