'use client';

import { useState } from 'react';

interface LikeButtonProps {
  initialLikes?: number;
  postTitle?: string;
}

export default function LikeButton({ initialLikes = 0, postTitle }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
          isLiked
            ? 'bg-red-100 text-red-600'
            : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
        }`}
      >
        <span className="text-xl">
          {isLiked ? '❤️' : '🤍'}
        </span>
        <span className="font-semibold">{likes}</span>
      </button>
      {postTitle && (
        <span className="text-sm text-gray-500">
          Bạn yêu thích "{postTitle}"
        </span>
      )}
    </div>
  );
}
