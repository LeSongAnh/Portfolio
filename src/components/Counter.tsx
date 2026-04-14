'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <span className="text-lg font-semibold">Counter: {count}</span>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Tăng +1
      </button>
      <button
        onClick={() => setCount(count - 1)}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Giảm -1
      </button>
      <button
        onClick={() => setCount(0)}
        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
      >
        Reset
      </button>
    </div>
  );
}
